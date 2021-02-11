import React from 'react'
import { canPerformAction } from '../../util/common'
// params type should be object
// ex:params:{
//     moduleId:1,
//     actiontoCheck:"ADD",
//     subModuleId:3,
//     checkSubAction:"ADD"
// }
const CheckAction = ({ children, params }) => {
    return <>
        {params ? canPerformAction(params) ? { children } : null : { children }}
    </>
}
export { CheckAction }