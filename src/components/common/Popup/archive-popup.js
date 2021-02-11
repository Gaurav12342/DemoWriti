import React, { useState, useEffect, useContext } from 'react';
import { TextArea, ErrorMsg, Toast, Button, Select, Option } from '../../common'
import Dialog from 'rc-dialog';
import { createForm } from 'rc-form'
import SubmasterFilter from '../../SubmasterFilter'

let errors
const ArchivePopup = (props) => {
  const { visible, onCancel, onOk, detail, residentDetail, form } = props
  const { getFieldDecorator, getFieldError } = form
  const [reasons, setReasons] = useState([])

  const handleOk = () => {
    form.validateFields((err, values) => {
      if (err) return
      if (onOk)
        onOk()
    })
  }

  return <Dialog
    visible={visible}
    maskClosable={false}
    onClose={onCancel}
    //onOk={handleOk}
    // okButtonProps={{ loading: loader || loading }}
    className="logout_popup archive_wrap"
  >
    <div className="popup-content-log">
      <h3 className="name_head">Archive {detail.orderNumber}
        <span>{residentDetail.mergeLFName}  (Room No {residentDetail.room})</span> </h3>
      <div className="bb"></div>
      <h2>Are you sure you want to
            <span>permanently archive this document?</span>
      </h2>

      <form action="">
        <div className="form_wrap">
          <div className="components">
            {getFieldDecorator('reason', {
              rules: [
                { required: true, message: 'Please Select Reason' }
              ]
            })(
              <Select placeholder="Select Reason">
                {
                  reasons.map(x => <Option value={x._id} key={x._id}>{x.name}</Option>)
                }
              </Select>
              // <SubmasterFilter placeholder="Select Reason"
              //   code="THIRD_PARTY_PRESCRIPTION_TYPE"
              // // onChange={onSubmasterChange} 
              // />
            )}
            {(errors = getFieldError('reason')) ? <ErrorMsg errors={errors} /> : null}
          </div>
        </div>
      </form>

      <div className="additional-textarea">
        {getFieldDecorator('information', {
          rules: [
            { required: false, message: 'Please Select Physician' }
          ]
        })(
          <TextArea placeholder="Additional Information"></TextArea>
        )}
        {(errors = getFieldError('information')) ? <ErrorMsg errors={errors} /> : null}
      </div>

      <div className="mb-20">
        <Button className="screen-btn gray-btn mb-0" onClick={onCancel}>CANCEL</Button>
        <Button className="screen-btn mb-0" onClick={handleOk}>YES</Button>
      </div>
      <div className="bottom-line">
        This action cannot be undone
          </div>
    </div>
  </Dialog >
}

export default createForm()(ArchivePopup);