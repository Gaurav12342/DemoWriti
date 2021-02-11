import React, { useEffect, useState } from 'react';
import { Search, Spin, Select, Option } from './common'
import axios from '../services/api/services/common'
import { getResidents } from '../services/api/routes/resident';
import PropTypes from "prop-types";
import { STATUS } from '../constants/resident';

const Resident = props => {
    const { placeholder, onSelectResident } = props
    const [filter, setFilter] = useState({
        fields: ['mergeLFName'],
        sortBy: { createdAt: 'DESC' },
        find: { status: STATUS.ACTIVE },
    });
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);
    const mountedRef = React.useRef(false)

    useEffect(() => {
        if (mountedRef.current) {
            const delayDebounceFn = setTimeout(() => {
                fetch()
            }, 600)
            return () => clearTimeout(delayDebounceFn)
        }
    }, [filter])

    useEffect(() => {
        mountedRef.current = true;
    }, [])

    const handleSearch = (value) => {

        let obj = {
            ...filter,
            search: {
                keyword: value,
                keys: ['mergeLFName'],
            }
        }
        setFilter(obj)
    }

    const fetch = () => {
        setLoader(true)
        axios({ ...getResidents, data: { 'query': { ...filter } } }).then(data => {
            if (data.code === 'OK') {
                setData(data.data.data)
            }
            setLoader(false)
        }).catch(err => {
            setLoader(false)
        })
    }

    return <>
        <Select
            placeholder={placeholder}
            allowClear multiple showSearch
            filterOption={false}
            onChange={onSelectResident}
            onSearch={handleSearch}
            searchable={true}
            notFoundContent={loader ? <Spin spinning={loader}></Spin> : 'No Data Found'}
        >
            {
                !loader &&
                data.map(res => {
                    return (
                        <Option key={res._id}>{res.mergeLFName}</Option>
                    );
                })
            }
        </Select>

    </>
}

export default Resident
Resident.defaultProps = { combobox: false };