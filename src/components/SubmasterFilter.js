import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Select, Option } from './common';
import axios from '../services/api/services/common';
import { masterPaginate } from '../services/api/routes/master'
const _ = require('lodash');

const SubmasterFilter = (props) => {
    const { placeholder, onChange, authUser, homeId, multiple, defaultValue, code ,allowClear} = props;
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        fetch()
    }, [code])

    const fetch = () => {
        setLoader(true)
        let data = {
            "query": {
                "fields": ["isActive", "name", "code", "masterForMedium"],
                "find": {
                    "isActive": true,
                    "code": code
                },
                "populate": [
                    {
                        "subMaster": ["isActive", "name", "code", "masterForMedium", "homeId", "pharmacyId"],
                        "match": { "isActive": true }
                    }
                ],
                "sortBy": {
                    "createdAt": "DESC"
                },
            }
        }

        axios({ ...masterPaginate, data }).then((data) => {
            if (data.code === 'OK') {
                if (data.data.data.length > 0 && data.data.data[0].subMaster.length > 0) {
                    setData(data.data.data[0].subMaster)
                }
            }
            setLoader(false)
        }).catch(err => {
            setLoader(false)
        })
    }

    return (
        <React.Fragment>
            <Select
                multiple={multiple}
                loading={loader}
                placeholder={placeholder}
                showSearch
                defaultValue={defaultValue || undefined}
                onChange={onChange}
                allowClear = {allowClear}
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
            >
                {
                    data.map((curObj) => {
                        return (
                            <Option key={curObj._id} value={curObj._id}>
                                {curObj.name}
                            </Option>
                        );
                    })
                }
            </Select>
        </React.Fragment>
    );
};

const mapStateToProps = ({ auth }) => {
    const { authUser } = auth;
    return { authUser };
};

SubmasterFilter.defaultProps = {
    allowClear: true,
    placeholder: 'Select Type',
};
SubmasterFilter.propTypes = {
    allowClear: PropTypes.bool,
    placeholder: PropTypes.string,
};
export default connect(mapStateToProps)(SubmasterFilter);
