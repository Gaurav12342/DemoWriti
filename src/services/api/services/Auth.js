import { USER_TYPE, isPharmacyUser } from '../../../constants/User'

const _ = require('lodash')
export const prepareUserData = (payload) => {
    if (!payload)
        return
    let user = _.cloneDeep(payload)
    if ([USER_TYPE.ADMIN.SUPER, USER_TYPE.ADMIN.GENERAL, USER_TYPE.PHARMACY].indexOf(user.type) >= 0) {
        return user
    }
    let homeList = []
    if (isPharmacyUser(user.type)) {
        if (user?.pharmacyId?.homes?.length > 0) {
            user.pharmacyId.homes.forEach(obj => {
                homeList.push(obj)
            })
            console.log("prepareUserData -> user.homeId", user.homeId)
            // user.homeId = user.homeId || homeList[0]
        }
    } else if (user.assignedCustomer && user.assignedCustomer.length) {
        user.assignedCustomer.forEach(obj => {
            if (obj.homeId) {
                homeList.push({
                    _id: obj.homeId._id,
                    name: obj.homeId.name
                })
            }
        })
    }
    user.homeList = homeList
    return user
}

