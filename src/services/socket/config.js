import io from "socket.io-client";
import { SOURCE_MEDIUM } from '../../constants/common';
import { MODULE, BASE_URL, } from './routes/common'
import { decryptData } from '../../util/Crypto';
import { isPharmacyUser } from '../../constants/User'

let homeId, tenantId, authUser, token

export const isSetSocketQuery = () => {
    homeId = localStorage.getItem('homeId')
    tenantId = localStorage.getItem('tenantId');
    authUser = decryptData(localStorage.getItem('user'));
    token = JSON.parse(localStorage.getItem('token'));
    return !!(homeId && tenantId && authUser && token)
}

let baseURL = BASE_URL[MODULE.SET_UP]
if (process.env.PUBLIC_URL === "production")
    baseURL = '/'

export default function SocketConfig() {
    let url = io(baseURL, {
        forceNew: true,
        secure: true,
        reconnection: true,
        // rejectUnauthorized: false,
        transports: ["websocket", "polling"],
        query: {
            authorization: token,
            homeid: homeId,
            homeidentifier: tenantId,
            pharmacyid: isPharmacyUser(authUser.type) ? authUser?.pharmacyId?._id : authUser?.homeId?.pharmacyId?._id,
            devicetype: SOURCE_MEDIUM["WEB"],
        }
    });
    console.log("SocketConfig -> url", url)
    url.addEventListener('error', function (event) {
        console.log('WebSocket error: ', event);
    })

    url.addEventListener('close', function (event) {
        console.log('The connection has been closed successfully.');
    })
    url.addEventListener('open', function (event) {
        console.log('The connection has been closed successfully.');
    })
    url.addEventListener('message', function (event) {
        console.log('The connection has been closed successfully.');
    })
    return url
}
