import React from 'react'
import { Button } from '../../../components/common/index'
function ButtonUI({ btnLabel, onAdd }) {
    return <div className="form_group">
        <Button type="primary" size='lg' onClick={onAdd}>
            Add {btnLabel} User
        </Button>
    </div>
}
export default ButtonUI