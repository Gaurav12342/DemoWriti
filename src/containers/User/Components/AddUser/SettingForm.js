import React, { useEffect, useState } from "react";
import { Select, Option, ErrorMsg } from "../../../../components/common";
import axios from "../../../../services/api/services/common";
import { getAll as getAllRoles } from "../../../../services/api/routes/permission";
import { Info } from '../../../../assets/images/popup';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import ViewRolePermission from '../../../Permission/components/ViewRolePermission'
import { USER_TYPE } from '../../../../constants/User'

const Form = (props) => {
  const { onSave, loading, onCancel, detail, col, defaultValue } = props
  const { getFieldError, getFieldDecorator, validateFields, setFieldsValue, getFieldValue, setFieldValue } = props.form
  const [roles, setRoles] = useState([])
  const [visible, setVisible] = useState(false)
  const [loader, setLoader] = useState(false)
  const edit = false
  let errors
  
  useEffect(() => {
    fetchRoles()
  }, [])

  // useEffect(()=>{
  //   setFieldsValue({"subscriptionRoleGroup":defaultValue})
  // },[defaultValue])
  const fetchRoles = async () => {
    setLoader(true)
    const data = {
      sortBy: { createdAt: -1 },
      find: {
        isActive: true,
        homeId: props.authUser.type === USER_TYPE.HOME.ADMIN ? props.authUser.homeId?._id : undefined,
        pharmacyId: props.authUser.type === USER_TYPE.PHARMACY.ADMIN ? props.authUser.pharmacyId?._id : undefined,
      }
    }
    let res = await axios({ ...getAllRoles, data: { query: data } })
    if (res) {
      if (res.code === 'OK') {
        setRoles(res.data.data)
      }
    }
    setLoader(false)
  }

  const viewRole = (visible) => {
    setVisible(visible)
  }

  return <>
    <div className={`form_group  ${col ? col : 'col-4'}`} style={{ paddingLeft: 0 }}>
      <div className="form_group col-8 required" style={{ float: 'left' }}>
        <label>Assign Role Permission<span>*</span></label>

        {getFieldDecorator('subscriptionRoleGroup', {
          rules: [{
            required: true, message: `Please select`
          }]
        })(
          <Select showSearch placeholder="Select Role Permission"
            loading={loader}
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {roles.map(v => {
              return <Option key={v._id} value={v._id} >
                {v.name}
              </Option>
            })}
          </Select>
        )}
        {(errors = getFieldError('subscriptionRoleGroup')) ? <ErrorMsg errors={errors} /> : null}
      </div>
      <div className="form_group col-3" style={{ float: 'right' }}>
        {
          getFieldValue('subscriptionRoleGroup') ?
            <Tooltip overlay={'View Role Permission'} placement="top">
              <Info style={{ marginTop: '-4px', cursor: 'pointer', height: '20px', width: '20px' }}
                onClick={() => viewRole(true)} />
            </Tooltip>
            : null
        }
      </div>
    </div>
    {
      visible ? <ViewRolePermission visible={visible} id={getFieldValue('subscriptionRoleGroup')}
        onCancel={() => viewRole(false)} /> : null
    }
  </>
}

export default Form