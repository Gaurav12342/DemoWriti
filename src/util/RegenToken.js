import axios from '../services/api/config'
import { tokenRefresh } from '../services/api/routes/auth';
export async function reGenerateToken(previousRequest) {
    const { method, url } = tokenRefresh;
    let token = localStorage.getItem('refreshToken');

    const req = {
        refreshToken: "jwt " + JSON.parse(token),
    };
    let response = await axios({
        ...tokenRefresh,
        method,
        url,
        data: req,
    }).then(async ({ data }) => {
        if (data && data.code === 'OK') {
            localStorage.setItem('token', JSON.stringify(data.data.token));
            return  axios({ ...previousRequest }).then(({ data }) => {
                return Promise.resolve(data)
            }).catch(err => {
                return Promise.resolve({ status: 'error' })
            })
        }
    });
    return response
}