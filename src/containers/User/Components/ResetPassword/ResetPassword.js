import React from 'react'
import Modal from '../../../../components/common/Popup/index'
import { ErrorMsg, Input } from '../../../../components/common/index'
function ResetPassword(props) {
    const { onCancel, onOk, form, visible } = props
    const { getFieldDecorator, getFieldError } = form
    let errors

    const compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== form.getFieldValue('newPassword')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    const validateToNextPassword = (rule, value, callback) => {
        if (value) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    return <Modal
        visible={visible}
        title='Reset Password'
        onCancel={onCancel}
        onClose={onCancel}
        maskClosable={false}
        onOk={onOk}
        style={{ width: "730px" }}
        okText='Reset'
    >
        <form autoComplete="off" onSubmit={(e)=>e.preventDefault()}
        >
        <div className="form_wrap flex-wrap">
            <div className='form_row add-user'>
                <div className='form_group required col-8'>
                    <label>Password<span>*</span></label>
                    {getFieldDecorator('newPassword', {
                        rules: [{
                            required: true, message: 'Please add your password!',
                        }, {
                            min: 8,
                            message: 'Password must be minimum of 8 digit.',
                        }, {
                            validator: validateToNextPassword,
                        }],
                    })(
                        <Input type="password" autoComplete="off" placeholder="Enter New Password" />
                    )}
                    {(errors = getFieldError('newPassword')) ? <ErrorMsg errors={errors} /> : null}
                </div>

            </div>
            <div className='form_row add-user'>
                <div className='form_group required col-8'>
                    <label>Confirm Password<span>*</span></label>
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: compareToFirstPassword,
                        }],
                    })(
                        <Input type="password" placeholder="Enter Confirm Password" />
                    )}
                    {(errors = getFieldError('confirm')) ? <ErrorMsg errors={errors} /> : null}
                </div>
            </div>
        </div>
        </form>
    </Modal>
}
export default ResetPassword