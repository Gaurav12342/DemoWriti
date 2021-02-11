import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DEVICE_VIEW } from '../../constants/prescription'
import Select, { Option } from '../../components/common/AutoComplete'

const ViewTypeFilter = (props) => {
    const { onChangeListview, isPrimaryFilter, viewType } = props
    const [type, setType] = useState(DEVICE_VIEW['PENDING'])

    useEffect(() => {
        if (viewType)
            setType(viewType)
    }, [viewType])

    let deviceView = { ...DEVICE_VIEW }
    if (isPrimaryFilter) {
        delete deviceView['PENDING']
    } else {
        delete deviceView['PRIMARY']
        delete deviceView['SECONDARY']
    }

    return <>
        {
            // type &&
            <Select
                value={type}
                onChange={onChangeListview}
            >
                {Object.keys(deviceView).map(v => {
                    return (
                        <Option
                            key={DEVICE_VIEW[v]}
                            value={DEVICE_VIEW[v]}
                        >
                            {v.replace(/_/g, " ")}
                        </Option>
                    );
                })}
            </Select>
        }
    </>
}
export default ViewTypeFilter
ViewTypeFilter.defaultProps = {
    isPrimaryFilter: false
}
ViewTypeFilter.propTypes = {
    isPrimaryFilter: PropTypes.bool,
    onChangeListview: PropTypes.func
}