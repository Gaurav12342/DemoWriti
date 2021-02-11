import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS, HIDE_MESSAGE, SHOW_MESSAGE, SOCKET_SET, CURRENT_PAGE_DATA } from "../../constants/ActionTypes";

export const fetchStart = () => {
  return {
    type: FETCH_START
  }
};

export const fetchSuccess = () => {
  return {
    type: FETCH_SUCCESS
  }
};

export const fetchError = (error) => {
  return {
    type: FETCH_ERROR,
    payload: error
  }
};

export const showMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  }
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE
  }
};

export const currentPageData = (data) => {
  return {
    type: "CUURENT_PAGE_DATA",
    data: data
  }
};

export const setSocket = (action, socket) => {
  return (dispatch) => {
    dispatch({ type: action, payload: socket });
  }
};
