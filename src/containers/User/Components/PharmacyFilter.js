import React, { useState, useEffect } from "react";
import { Select, Option } from "../../../components/common";
import _ from 'lodash'
const PharmacyFilter = (props) => {
  const {
    data,
    multiple,
    placeholder,
    defaultValue,
    onChange,
    filterListLoading,
  } = props;
  const [pharmacyData, setPharmacyData] = useState([]);

  useEffect(() => {
    if (_.size(data)) {
      setPharmacyData(data);
    }
  }, [data]);

  return (
    <>
      <Select
        multiple={multiple}
        loading={filterListLoading}
        placeholder={placeholder}
        showSearch
        defaultValue={defaultValue || undefined}
        onChange={onChange}
        allowClear
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {pharmacyData.map((curObj) => {
          return (
            <Option key={curObj._id} value={curObj._id}>
              {curObj.name}
            </Option>
          );
        })}
      </Select>
    </>
  );
};
export default PharmacyFilter;
