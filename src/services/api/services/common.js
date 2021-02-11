import axios from '../config'
import routes from '../../../routes/constant'
import { displayCatchErrorMsg } from '../../../util/common'
import { masterPaginate } from '../routes/master'
import { rxImage } from '../routes/prescription'
import { privateBucketUrl } from '../routes/user'

const CommonService = (request) => {
    const { method, url, data, headers, params, baseURL } = request
    return axios({ method, url, data, params, baseURL, headers })
        .then(({ data }) => Promise.resolve(data))
        .catch(error => {
            displayCatchErrorMsg(error)
            console.log(error)
            return Promise.reject(error)
        })
}
export default CommonService

// export const getApiUrl = (url) => {
//     // get API base url according to module
//     let baseurl = base_url
//     Object.keys(routes).map(route => {
//         if (routes[route].path === window.location.pathname && routes[route].module) {
//             console.log(baseurl[routes[route].module])
//             url = baseurl[routes[route].module]
//         }
//     })
//     return url
// }

export const getSubMasters = (code) => {
    //get submasters from master code
    let data = {
        "query": {
            "fields": ["isActive", "name", "code", "masterForMedium"],
            "find": {
                "isActive": true,
                "code": code
            },
            "populate": [
                {
                    "subMaster": ["isActive", "name", "code", "masterForMedium", "homeId", "pharmacyId"],
                    "match": { "isActive": true }
                }
            ],
            "sortBy": {
                "createdAt": "DESC"
            },
        }
    }

    return CommonService({ ...masterPaginate, data }).then((data) => {
        if (data.code === 'OK') {
            if (data.data.data.length > 0 && data.data.data[0].subMaster.length > 0) {
                return data.data.data[0].subMaster ? data.data.data[0].subMaster : []
            }
        }
        else return []
    }).catch(err => err)
}

export const getRxImage = (orders) => {
    //view rx images
    let data = {
        "prescriptionOrdersIds": orders
    }

    return CommonService({ ...rxImage, data }).then((data) => {
        if (data.code === 'OK') {
            return data.data
        }
        else return []
    }).catch(err => err)
}
export const getPrivateBucketUrl = (orders) => {
    //view rx images
    let data = {
        "files": orders || [
            {
                "id": "1",
                "path": "https://private-writi-bucket.s3.ca-central-1.amazonaws.com/uploads/temp/THRx001170-ltc-1612440797727.png"
            }
        ]
    }

    return CommonService({ ...privateBucketUrl, data }).then((data) => {
        if (data.code === 'OK') {
            return data.data
        }
        else return []
    }).catch(err => err)
}