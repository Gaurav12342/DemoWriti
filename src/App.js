import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import './App.css';
import './styles/scss/style.scss';
import { Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore, { history } from './appRedux/store/index.js';
import { setSocket, setToken } from './appRedux/actions/Auth'
import { decryptData } from './util/Crypto';
import MainApp from './containers/MainApp.js';
import { AppContainer } from 'react-hot-loader';
import reducers from './appRedux/reducers/index'
import instance from './services/api/config'
import { Toast } from './components/common'
import { userLogout } from './util/common'
import CommonService from './services/api/services/common'
import { tokenRefresh } from './services/api/routes/auth';
import { isPharmacyUser } from './constants/User'

export const store = configureStore();
//export const store = reducers && configureStore();

const App = () => (
  <div className="App">
    <AppContainer>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path={'/'} component={MainApp} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    </AppContainer>
  </div>
);

const { dispatch } = store
const socketIns = store.getState().auth.socket

let previousRequest = {};
//response interceptors
instance.interceptors.response.use(
  (response) => Promise.resolve(response),
  (error) => {
    console.log("=======5555======================")
    if (!error.response)
      Toast.error(error.message || 'Network error - something went wrong');
    if (error.response && error.response.data) {
      if (error.response.data.code !== 'E_INVALID_TOKEN')
        Toast.error(error.response.data.message);
      if (error.response.data.code === 'E_UNAUTHORIZED') {
        dispatch(userLogout());
      } else if (error.response.data.code === 'E_INVALID_TOKEN') {
        //refresh token
        const { method, url } = tokenRefresh;
        const user = decryptData(localStorage.getItem('user'));
        let token = localStorage.getItem('refreshToken');
        const req = {
          refreshToken: 'jwt ' + JSON.parse(token),
        };
        let canCall = true;
        if (previousRequest && previousRequest.url) {
          if (previousRequest.url !== error.config.url) {
            previousRequest = error.config;
          } else {
            canCall = false;
          }
        } else {
          previousRequest = error.config;
        }
        if (canCall) {
          let tokenResponse = CommonService({
            ...tokenRefresh,
            method,
            url,
            data: req,
          }).then(async (data) => {
            if (data && data.code === 'OK') {
              if (socketIns) {
                socketIns.disconnect()
              }
              dispatch(setSocket(null))
              localStorage.setItem('token', JSON.stringify(data.data.token));
              previousRequest.headers['Authorization'] = 'JWT ' + data.data.token;
              dispatch(setToken(data.data.token))
              let res = await instance(previousRequest); // call API which had return expire token error
              return Promise.resolve(res);
            }
          });
          if (tokenResponse) return Promise.resolve(tokenResponse);
        }
      } else {

      }
    }
    return Promise.reject(error);
  }
);
export default App;
