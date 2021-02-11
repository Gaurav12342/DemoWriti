import React from 'react';
import { Select, Option, Spin } from '../common';
import { useCacheQuery } from '../../hooks';
import { getDrugs } from '../../services/api/routes/prescription'
import axios from '../../services/api/services/common'

const debounce = require('lodash/debounce')

const SearchMedicine = (props) => {
  const { onSelectMedication, onChange } = props;

  const { loading, error, data, fetchResults } = useCacheQuery(
    'prescriptions',
    search => {
      return axios({ ...getDrugs, data: { search: search } }).then(res => {
        if (res.code === 'OK') {
          return res.data
        }
      })
      // return fetch(`https://api.drugbank.com/v1/ca/drug_names?q=${search}`, {
      //   headers: {
      //     Authorization: 'a4cf8a1fb8a4794786a2e4f8a6bb38a5',
      //     'Access-Control-Allow-Origin': '*'
      //   }
      // }).then(res => res.json())
    },
    { clearOnTabClose: false }
  )

  if (!!error) {
    console.log("errror => ", error)
  }

  React.useEffect(() => {
    onSelectMedication(props.value, {})
    if (props.value?.length > 2) {
      const delayDebounceFn = setTimeout(() => {
        fetchResults(props.value)
      }, 750)
      return () => clearTimeout(delayDebounceFn)

    };
  }, [props.value])

  const handleMedicationSearch = (value) => {
    //   if (value && value.length > 2) {
    //     onSelectMedication(value, {})
    //     const delayDebounceFn = setTimeout(() => {
    //       fetchResults(value)
    //     }, 750)
    //     return () => clearTimeout(delayDebounceFn)

    //   };
  }

  const handleMedicationSelect = (prescribable_name) => {
    let foundMedication = data.find(data => data.prescribable_name === prescribable_name);
    onSelectMedication(prescribable_name, foundMedication)
  }

  return (
    <Select
      combobox={true}
      showArrow={false}
      placeholder="Search Medication"
      allowClear={true}
      filterOption={false}
      onChange={onChange}
      showSearch={true}
      onSearch={handleMedicationSearch}
      onSelect={handleMedicationSelect}
      disabled={props.disabled}
      searchable={false}
      value={props.value}
      notFoundContent={loading ? <Spin style={{ height: 'fit-content' }} spinning={loading} str="center"></Spin> : 'No Data Found'}
    >
      {
        !loading &&
        data?.length > 0 &&
        data.map((domainData, i) => {
          return (
            <Option
              key={i}
              value={domainData.prescribable_name}
              title={domainData.prescribable_name}
            >
              {domainData.prescribable_name}
            </Option>
          );
        })}
    </Select>
  );
};

export default SearchMedicine;
