import React, { useEffect } from 'react';
import { withRouter, useParams } from "react-router-dom";
import ProtectedRoutes from '../routes/ProtectedRoutes'
import PublicRoutes from '../routes/PublicRoutes'
import Routes from "../routes/index.js";
import { connect, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import routes from '../routes/constant';
import { getUserBaseRedirect, clearLocalStorage, userLogout } from '../util/common';
import CacheBuster from './CacheBuster'
import SocketConfig, { isSetSocketQuery } from '../services/socket/config'
import { CURRENT_VERSION } from '../constants/versionControl';
import { PUBLIC_ROUTES_COLLECTIONS } from '../constants/common'
import { setSocket, setToken } from '../appRedux/actions/Auth'
import { decryptData } from '../util/Crypto';
import { Toast } from '../components/common'
import instance from '../services/api/config'
import CommonService, { getApiUrl } from '../services/api/services/common';
import { tokenRefresh } from '../services/api/routes/auth';
import { isPharmacyUser } from '../constants/User'

const MainApp = (props) => {
  const {
    match,
    token,
    location,
    authUser,
    otpVerified,
    defaultPassword,
    socket,
    setSocket,
    setToken
  } = props;

  const socketIns = useSelector(state => state.auth.socket)
  console.log("MainApp -> socketIns", socketIns)

  useEffect(() => {
    versionUpdates()
  }, [])
  // useEffect(() => {
  //   console.log("=============================")
  //   let previousRequest = {};
  //   //request interceptors
  //   instance.interceptors.request.use(
  //     (config) => {

  //       let tenantId
  //       let excludeTenant = JSON.parse(localStorage.getItem('excludeTenant')) || false;
  //       tenantId = excludeTenant ? localStorage.getItem('tenantId') : undefined;
  //       const homeId = excludeTenant ? localStorage.getItem('homeId') : undefined;
  //       const token = JSON.parse(localStorage.getItem('token'));
  //       if (!config.headers.Authorization)
  //         config.headers.Authorization = token ? `JWT ${token}` : '';
  //       if (!config.headers.isCustom) {
  //         const authUser = decryptData(localStorage.getItem('user'));
  //         config.headers.homeIdentifier = tenantId || '';
  //         config.headers.homeId = homeId;
  //         if (authUser)
  //           config.headers.pharmacyId = isPharmacyUser(authUser.type) ? authUser?.pharmacyId?._id : authUser?.homeId?.pharmacyId?._id;
  //       }
  //       delete config.headers.isCustom

  //       if (process.env.PUBLIC_URL === 'production') config.baseURL = '/';
  //       return config;
  //     },
  //     (error) => Promise.reject(error)
  //   );

  //   //response interceptors
  // instance.interceptors.response.use(
  //   (response) => Promise.resolve(response),
  //   (error) => {
  //     console.log("=======5555======================")
  //     if (!error.response)
  //       Toast.error(error.message || 'Network error - something went wrong');
  //     if (error.response && error.response.data) {
  //       if (error.response.data.code !== 'E_INVALID_TOKEN')
  //         Toast.error(error.response.data.message);
  //       if (error.response.data.code === 'E_UNAUTHORIZED') {
  //         userLogout();
  //       } else if (error.response.data.code === 'E_INVALID_TOKEN') {
  //         //refresh token
  //         const { method, url } = tokenRefresh;
  //         const user = decryptData(localStorage.getItem('user'));
  //         let token = localStorage.getItem('refreshToken');
  //         const req = {
  //           refreshToken: 'jwt ' + JSON.parse(token),
  //         };
  //         let canCall = true;
  //         if (previousRequest && previousRequest.url) {
  //           if (previousRequest.url !== error.config.url) {
  //             previousRequest = error.config;
  //           } else {
  //             canCall = false;
  //           }
  //         } else {
  //           previousRequest = error.config;
  //         }
  //         if (canCall) {
  //           let tokenResponse = CommonService({
  //             ...tokenRefresh,
  //             method,
  //             url,
  //             data: req,
  //           }).then(async (data) => {
  //             if (data && data.code === 'OK') {
  //               if (socketIns) {
  //                 socketIns.disconnect()
  //               }
  //               setSocket(null)
  //               localStorage.setItem('token', JSON.stringify(data.data.token));
  //               previousRequest.headers['Authorization'] = 'JWT ' + data.data.token;
  //               setToken(data.data.token)
  //               let res = await instance(previousRequest); // call API which had return expire token error
  //               return Promise.resolve(res);
  //             }
  //           });
  //           if (tokenResponse) return Promise.resolve(tokenResponse);
  //         }
  //       } else {

  //       }
  //     }
  //     return Promise.reject(error);
  //   }
  // );
  // }, [socketIns, token])

  useEffect(() => {

    const excludeOTPVerification = JSON.parse(localStorage.getItem('excludeOTPVerification'))
    if (token && !excludeOTPVerification && !otpVerified) {
      setTimeout(() => {
        clearLocalStorage()
        RedirectTo(routes.login.path)
      }, 600000)
    }
  }, [token])

  useEffect(() => {

    if (!authUser)
      return
    if (socket || !isSetSocketQuery())
      return
    let insatnce = SocketConfig()
    setSocket(insatnce)
    insatnce.on('connect', (e) => {
      console.log("SOCKET CONNECTED", e)
    })
    insatnce.on('disconnect', (e) => {
      console.log("SOCKET DISCONNECTED")
      console.log(authUser, socket)
    })

    insatnce.on('errors', (data) => {
      console.log("SOCKET ERRORS", data)
      if (!data.flag) {
        if (data.message.code === "E_UNAUTHORIZED") {
          // Toast.error(data.message.message)
          // userLogout();
        }
      }
    })

    insatnce.on('error', (data) => {
      console.log("SOCKET ERORR", data)
    })

    // Listen for possible errors
    insatnce.addEventListener('error', function (event) {
      console.log('WebSocket error: ', event);
    })

    insatnce.addEventListener('close', function (event) {
      console.log('The connection has been closed successfully.');
    })
    insatnce.addEventListener('open', function (event) {
      console.log('The connection has been closed successfully.');
    })
    insatnce.addEventListener('message', function (event) {
      console.log('The connection has been closed successfully.');
    })

  }, [token, authUser])

  const versionUpdates = () => {
    if (window.localStorage.length === 0) {
      if (!localStorage.getItem('latestVersion')) {
        localStorage.setItem('latestVersion', CURRENT_VERSION)
      }
    }
    else if (!localStorage.getItem('latestVersion')) {
      localStorage.setItem('latestVersion', CURRENT_VERSION)
    }
  }

  function RedirectTo(path) {
    props.history.push({
      pathname: path
    })
  }

  const canRedirectToOtpPage = () => {
    return (authUser && token && (!authUser.excludeOTPVerification && !otpVerified))
  }

  const getRouteRedirect = () => {
    if (token === null && !authUser) {
      RedirectTo(routes.login.path)
    }
    else if (canRedirectToOtpPage()) {
      RedirectTo(routes.verifyOtp.path)
    }
    else if (authUser && Object.keys(authUser).length > 0) {
      RedirectTo(getUserBaseRedirect(authUser))
    }
    else {
      RedirectTo(routes.pageNotFound.path)
    }
  }


  if (localStorage.getItem('user')) {
    const tempUser = decryptData(localStorage.getItem('user'))
    if (tempUser && tempUser.defaultPassword && location.pathname !== routes.updateDefaultPassword.path) {
      RedirectTo(routes.updateDefaultPassword.path)
    }
  }


  if (location.pathname === '/') {
    getRouteRedirect()
  }
  else if (PUBLIC_ROUTES_COLLECTIONS.indexOf(location.pathname) < 0) {
    if (location.pathname.indexOf('wa/reset-password') < 0) {
      let ispathFound
      Object.keys(routes).some(k => {
        if (routes[k].path === location.pathname || location.pathname.indexOf(routes[k].path)) {
          ispathFound = routes[k].path
          return true
        }
      })

      if (ispathFound === undefined) {
        RedirectTo(routes.pageNotFound.path)
      }
      else if (PUBLIC_ROUTES_COLLECTIONS.indexOf(ispathFound) < 0 && !authUser) {
        getRouteRedirect()
      }
    }
  }

  return <>
    <CacheBuster>
      {
        ({ loading, isLatestVersion, refreshCacheAndReload }) => {
          if (loading) return null
          if (!loading && !isLatestVersion) {
            refreshCacheAndReload()
          }
          return (<>
            <PublicRoutes {...props} />
            {/* {
            token && authUser &&
            (authUser.excludeOTPVerification || (!authUser.excludeOTPVerification) && otpVerified) && <ProtectedRoutes path={match.url} authUser={authUser} component={Routes} match={match}
              {...props} />
          } */}
            <ProtectedRoutes path={match.url} component={Routes} match={match}
              {...props} />
            <ToastContainer />
          </>)
        }
      }
    </CacheBuster>

  </>
};
const mapStateToProps = ({ auth }) => {
  console.log("mapStateToProps -> auth", auth)
  const { preferredLanguage, token, defaultPassword, otpVerified, authUser, socket } = auth;
  return { preferredLanguage, token, defaultPassword, otpVerified, authUser, socket };
};
export default withRouter(connect(mapStateToProps, { setSocket, setToken })(MainApp));
