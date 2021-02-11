import { FETCH_ERROR, FETCH_START, FETCH_SUCCESS,SOCKET_SET } from '../ActionTypes'

const INIT_STATE = {
  error: "",
  loading: false,
  message: ''
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case FETCH_START: {
      return { ...state, error: '', message: '', loading: true };
    }
    case FETCH_SUCCESS: {
      return { ...state, error: '', message: '', loading: false };
    }
    case FETCH_ERROR: {
      return { ...state, loading: false, error: action.payload, message: '' };
    }
    case SOCKET_SET: {
      return { ...state, socket: action.payload };
    }
    default:
      return state;
  }
}
