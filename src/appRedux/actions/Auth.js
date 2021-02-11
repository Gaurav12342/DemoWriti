import {
  REFRESH_TOKEN,
  SOCKET_SET,
  SET_USER_DATA,
  SIGNOUT_USER_SUCCESS,
  SET_USER_TOKEN
} from '../ActionTypes';
import { logout } from '../../services/api/routes/auth';
import axios from '../../services/api/config';

import { decryptData, encryptData } from '../../../src/util/Crypto';
import { prepareUserData } from '../../../src/services/api/services/Auth';
import { clearLocalStorage } from '../../util/common';

export function userSignIn(action, data) {
  return {
    type: action,
    payload: data,
  };
}

export function setSocket(payload) {
  return (dispatch) => {
    dispatch({
      type: SOCKET_SET,
      payload: payload,
    });
  };
}

export function setToken(token) {
  console.log("setToken -> token", token)
  return {
    type: SET_USER_TOKEN,
    payload: token,
  };
}

export function setUserData(action = SET_USER_DATA, data, callback) {
  return (dispatch) => {
    dispatch({
      type: action,
      payload: data,
    });
    if (callback) {
      callback();
    }
  };
}

export const updateUserData = (data) => {
  return (dispatch) => {
    let user = decryptData(localStorage.getItem('user'));
    user = { ...user, ...data };
    user = prepareUserData(user);
    localStorage.setItem('user', encryptData(user));
    dispatch({ type: SET_USER_DATA, payload: user });
  };
};

export function setReduxHomeId(action, id) {
  return (dispatch) => {
    dispatch({
      type: action,
      payload: id,
    });
  };
}

export function setDefaultPassword(action, data, callback) {
  return (dispatch) => {
    dispatch({
      type: action,
      payload: data,
    });
    if (callback) {
      callback();
    }
  };
}

export const userSignOut = (action, callback) => {
  return (dispatch, getState) => {
    let { method, url, baseURL } = logout;
    axios({ method, url, baseURL })
      .then((response) => {
        if (response?.data.code === 'OK') {
          let socket = getState().auth.socket
          if (socket) socket.disconnect()
          // setTimeout(() => {
          dispatch({ type: action || SIGNOUT_USER_SUCCESS });
          clearLocalStorage();
          // }, 1000);
          if (callback) {
            callback();
          }
        }
      })
      .catch((error) => {
        console.log('error', error);
      });
  };
};

export const setOtpVerified = (action, payload) => {
  console.log('-> setOtpVerified');
  return {
    type: action,
    payload,
  };
};

export const refreshToken = (payload) => (dispatch) => {
  return dispatch({ type: REFRESH_TOKEN, payload: payload.token });
};
