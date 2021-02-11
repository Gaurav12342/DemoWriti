import React, { useState, useEffect } from 'react';
import { createForm, formShape } from 'rc-form';
import { Trash, Edit, PlusBtn } from '../../../assets/images/resident-detail/index';
import { Input, Button, ErrorMsg } from '../../../components/common'


const Add = (props) => {
    const { listData, onDelete, onEdit, onSelect, onInfiniteOnLoad, onSave, loading, edit, onCancel,
        detail, form, isRole } = props
    const { getFieldError, getFieldDecorator, validateFields, setFieldsValue } = form;
    let errors
    const str = isRole ? 'Role Permission' : 'Subscription'

    useEffect(() => {
        if (edit && detail) {
            setFieldsValue({ name: detail.name })
        }
    }, [edit, detail])

    const handleSave = () => {
        validateFields((error, value) => {
            if (!error) {
                onSave({ ...value })
            }
        })
    }

    return (<>
        <div className="add_permision">
            <div className="form_row">
                {/* <div className="form_wrap"> */}
                <div className="form_group col-4 required">
                    {getFieldDecorator('name', {
                        rules: [{
                            required: true, message: `Please enter ${str} name`,
                            whitespace: true,
                        }]
                    })(
                        <Input placeholder={`Enter ${str} Name`} />
                    )}
                    {(errors = getFieldError('name')) ? <ErrorMsg errors={errors} /> : null}
                </div>
                <div className='form_group col-8 text-right' >
                    <Button size="lg" type="secondary" onClick={onCancel} style={{ marginRight: '10px' }} >
                        Cancel</Button>
                    <Button size="lg" onClick={handleSave} loading={loading} >
                        {edit ? 'Update' : 'Save'}</Button>
                </div>
                {/* </div> */}
            </div>
            {/* <form>
                <div className="form_wrap">
                    <div className="sus_name">
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true, message: `Please enter ${str} name`,
                                whitespace: true,
                            }]
                        })(
                            <Input placeholder={`Enter ${str} Name`} />
                        )}
                        {(errors = getFieldError('name')) ? <ErrorMsg errors={errors} /> : null}
                    </div>
                    <div className='m-r-10' >
                        <Button size="lg" type="secondary"  onClick={onCancel} style={{ marginRight: '10px' }} >
                            Cancel</Button>
                        <Button size="lg" onClick={handleSave} loading={loading} >
                            {edit ? 'Update' : 'Save'}</Button>
                    </div>
                </div>
            </form> */}
        </div>
    </>);
}
export default createForm()(Add);