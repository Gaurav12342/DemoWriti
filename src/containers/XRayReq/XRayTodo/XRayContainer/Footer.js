import React, { useState } from "react";
import { Button } from 'antd'
import UtilService, { isDrOrNp, isFeatureAccessible, isViewPermissionAllowed } from '../../../../services/util'
import { PERMISSION_GROUP_MODULE } from '../../../../constants/Common'
import { Link } from "react-router-dom";
const _ = require('lodash')

const Footer = props => {
    const { detail, size, authUser } = props
    // let { showSubscirbeModal, setSubscirbeModal } = useState(false)

    return <div className="bottom-btnsFix">
        <div className="leftSideBtns">
            {
                isFeatureAccessible(authUser, PERMISSION_GROUP_MODULE.RX_ORDER) &&
                <Button type="primary" size={size}>
                    <Link target={"_blank"}
                        to={`/wa/orders?patientId=${detail.residentId.id}`}
                        style={{ marginLeft: "5px" }}
                    >
                        Rx Orders
                        </Link>
                </Button>
            }
            {
                isFeatureAccessible(authUser, PERMISSION_GROUP_MODULE.DigitalBinders) &&
                <Button type="primary" size={size}>
                    <Link target={"_blank"}
                        to={`/wa/resident/${detail.residentId.id}?tab=2`}
                        style={{ marginLeft: "5px" }}
                    >
                        Digital Binders
                        </Link>
                </Button>
            }
        </div>
    </div>
}

export default Footer