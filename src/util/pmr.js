import { decryptData } from './Crypto';
import { USER_TYPE } from '../constants/User'
import { SUB_CATEGORY } from '../constants/todo';

export function getOrdersLength(orderList) {
    let orderSize = orderList.filter(order => !order.cloneFrom).length
    return orderSize
}
export function calculatePercentage(completedOrder, orderList = []) {
    let orderSize = getOrdersLength(orderList)
    let percentage = parseInt((completedOrder / orderSize) * 100)
    return percentage
}

export function isCautionAlertNotes(pmrDetail, defaultToDoCategory) {
    if (!pmrDetail)
        return
    if ((pmrDetail.checkType === SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_1 ||
        pmrDetail.checkType === SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_2)
        && pmrDetail.checkType !== SUB_CATEGORY.MED_REVIEW.PMR
        && defaultToDoCategory !== pmrDetail.subCategory //orderlist
        && (pmrDetail.pmrStatusUpdate && pmrDetail.pmrStatusUpdate.latest
            && pmrDetail.pmrStatusUpdate.latest.type &&
            pmrDetail.pmrStatusUpdate.latest.type !== SUB_CATEGORY.MED_REVIEW.PMR)
    )
        return true
    else return false
}











//conditions
export const
    isDrOrderView = (defaultToDoCategory, authUser) => {
        if (!authUser) return
        return authUser.type === USER_TYPE.HOME.PHYSICIAN ||
            (authUser.type === USER_TYPE.HOME.NURSE &&
                defaultToDoCategory === SUB_CATEGORY.MED_REVIEW.PMR)
    },
    isNrAck = (pmrDetail, order, defaultToDoCategory) => {
        return ((pmrDetail.subCategory === SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_1 ||
            defaultToDoCategory === SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_1) &&
            order.nurseAcknowStatus1) ||
            ((pmrDetail.subCategory === SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_2 ||
                defaultToDoCategory === SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_2)
                && order.nurseAcknowStatus2) ||
            (pmrDetail.subCategory === SUB_CATEGORY.MED_REVIEW.PMR)
    },
    isUndoAck = ({ detail, order, defaultToDoCategory }) => {
        return ((detail.subCategory === SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_1 ||
            defaultToDoCategory === SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_1) &&
            order.nurseAcknowStatus1) ||
            ((detail.subCategory === SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_2 ||
                defaultToDoCategory === SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_2)
                && order.nurseAcknowStatus2) ||
            (detail.subCategory === SUB_CATEGORY.MED_REVIEW.PMR)
    }