import {
    SWITCH_LANGUAGE,
    SET_USER_DATA,
    SET_USER_TOKEN,
    SET_USER_DEFAULT_PASSWORD,
    SIGNOUT_USER_SUCCESS,
    SET_OTP_VERIFIED,
    REFRESH_TOKEN,
    SET_HOME_ID,
    SOCKET_SET
} from "../ActionTypes";
import { encryptData, decryptData } from '../../util/Crypto'
const initialSettings = {
    token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
    authUser: localStorage.getItem('user') ? decryptData(localStorage.getItem('user')) : null,
    defaultPassword: localStorage.getItem('user') ? decryptData(localStorage.getItem('user')).defaultPassword : null,
    defaultVirtualVisitId: '',
    otpVerified: false,
};

const settings = (state = initialSettings, action) => {
    switch (action.type) {

        case SIGNOUT_USER_SUCCESS: {
            return {
                ...state,
                token: null,
                authUser: null,
                initURL: '',
                isResetPassword: false,
                socket: null,
                otpVerified: false,
                homeId: ''
            }
        }
        case SET_USER_DATA: {
            return {
                ...state,
                authUser: action.payload
            }
        }
        case SET_USER_TOKEN: {
            return {
                ...state,
                token: action.payload
            }
        }
        case SET_USER_DEFAULT_PASSWORD: {
            return {
                ...state,
                defaultPassword: action.payload
            }
        }

        case SET_OTP_VERIFIED: {
            return {
                ...state,
                otpVerified: action.payload
            }
        }

        case REFRESH_TOKEN: {
            return {
                ...state,
                token: action.payload
            }
        }
        case SET_HOME_ID: {
            return {
                ...state,
                homeId: action.payload
            }
        }
        case SOCKET_SET: {
            return {
                ...state,
                socket: action.payload
            }
        }
        default:
            return state;
    }
};

export default settings;
