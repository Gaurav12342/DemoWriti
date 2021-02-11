import axios from 'axios';
import { SOURCE_MEDIUM } from '../../constants/common';
import { API_URL } from './routes/common';
import { Toast } from '../../components/common/Toast';
import { refreshToken } from '../../appRedux/actions/Auth';
import CommonService, { getApiUrl } from '../../services/api/services/common';
import { tokenRefresh } from '../../services/api/routes/auth';
import { userLogout, isInvalidTokenError } from '../../util/common';
import { decryptData } from '../../util/Crypto';
import _ from 'lodash';
import { isPharmacyUser } from '../../constants/User'

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWNmZjkyNTQ4ZWExMGY0ZDAzOTMxNThjIiwibmFtZSI6IkphbmUsIFN0YWNpIiwic2Vzc2lvbklkIjoiYmE3YjM0YTYtM2IwYy00ZWE2LWEzY2YtZTYzNzYwYTdlNjc2IiwiaG9tZUlkIjoiNWNkOTYzZWExZmQxNjAzYTA5YWU3ZjlmIiwidHlwZSI6NTIsInBhcmVudENsaWVudGVsZSI6W3siaWQiOiI1Y2Q5NjNlYTFmZDE2MDNhMDlhZTdmYTAifSx7ImlkIjoiNWRhMDBjYzIxYzQ0MzAyNjlkYTg5MWZjIn1dLCJsb2dpbkZyb20iOjEsInN1Yk51cnNlVHlwZSI6M30sImlhdCI6MTYwMjMxMjkyNSwiZXhwIjoxNjMzNDE2OTI1LCJhdWQiOiJyeC53cml0aS5jYSIsImlzcyI6InJ4LndyaXRpLmNhIn0.OsoGOlgqqu4huekkEJCVKlATYtcZAE6PpIiDUsvzspc'
let previousRequest = {};
const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    sourceMedium: SOURCE_MEDIUM['WEB'],
    deviceType: SOURCE_MEDIUM['WEB'],
    'Allow-Access-Control-Allow-Origin': '*',
  },
});

//request interceptors
instance.interceptors.request.use(
  (config) => {

    let tenantId
    let excludeTenant = JSON.parse(localStorage.getItem('excludeTenant')) || false;
    tenantId = excludeTenant ? localStorage.getItem('tenantId') : undefined;
    const homeId = excludeTenant ? localStorage.getItem('homeId') : undefined;
    const token = JSON.parse(localStorage.getItem('token'));
    if (!config.headers.Authorization)
      config.headers.Authorization = token ? `JWT ${token}` : '';
    if (!config.headers.isCustom) {
      const authUser = decryptData(localStorage.getItem('user'));
      config.headers.homeIdentifier = tenantId || '';
      config.headers.homeId = homeId;
      if (authUser)
        config.headers.pharmacyId = isPharmacyUser(authUser.type) ? authUser?.pharmacyId?._id : authUser?.homeId?.pharmacyId?._id;
    }
    delete config.headers.isCustom

    if (process.env.PUBLIC_URL === 'production') config.baseURL = '/';
    return config;
  },
  (error) => Promise.reject(error)
);

// //response interceptors
// instance.interceptors.response.use(
//   (response) => Promise.resolve(response),
//   (error) => {
//     // ()
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
//               localStorage.setItem('token', JSON.stringify(data.data.token));
//               // refreshToken(res)
//               // previousRequest.headers['token'] = 'JWT' + data.data.token;
//               previousRequest.headers['Authorization'] = 'JWT ' + data.data.token;
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

export default instance;
