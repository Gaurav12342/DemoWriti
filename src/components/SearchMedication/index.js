import React, { useState } from 'react';
import { Input, Select, Option, Spin } from '../common';
import axios from '../../services/api/services/common'
import { getDrugs } from '../../services/api/routes/prescription'
// import drugs from '../../assets/files/JSON/drugs.json';
const drugs = [
  {
    "hits": [
      {
        "field": "name",
        "value": "Atorvastatin 20 mg Oral Tablet"
      }
    ],
    "name": "Atorvastatin 20 mg Oral Tablet",
    "country": "Canada",
    "brands": [
      "Apo-atorvastatin",
      "Auro-atorvastatin",
      "Dom-atorvastatin",
      "Jamp-atorvastatin",
      "Mar-atorvastatin",
      "Mylan-atorvastatin",
      "PMS-atorvastatin",
      "Ran-atorvastatin",
      "Ratio-atorvastatin",
      "Reddy-atorvastatin",
      "Riva-atorvastatin",
      "Teva-atorvastatin"
    ],
    "ndc_product_codes": null,
    "dpd_codes": [
      "02295288",
      "02310902",
      "02313456",
      "02313715",
      "02350319",
      "02355620",
      "02391066",
      "02392941",
      "02399385",
      "02399490",
      "02407264",
      "02417944",
      "02422778",
      "02454025"
    ],
    "ema_product_codes": null,
    "dosage_forms": [
      "Tablet"
    ],
    "strength_number": "20",
    "strength_unit": "mg",
    "dosage_form": [
      "Tablet"
    ],
    "route": "Oral",
    "approved": true,
    "unapproved": false,
    "generic": true,
    "otc": false,
    "mixture": false,
    "allergen": false,
    "vaccine": false,
    "ingredients": [
      {
        "drugbank_id": "DB01076",
        "name": "Atorvastatin",
        "cas": "134523-00-5",
        "strength_number": "20",
        "strength_unit": "mg"
      }
    ]
  },
  {
    "hits": [
      {
        "field": "name",
        "value": "Atorvastatin calcium trihydrate 20 mg Oral Tablet"
      }
    ],
    "name": "Atorvastatin calcium trihydrate 20 mg Oral Tablet",
    "rx_norm_name": "atorvastatin calcium 20 MG Oral Tablet",
    "country": "US",
    "brands": [
      "Atorvastatin Calcium"
    ],
    "ndc_product_codes": [
      "50090-3536",
      "63304-0828",
      "68645-0481",
      "70518-2111",
      "70934-0296",
      "71610-0022",
      "72205-0023"
    ],
    "dpd_codes": null,
    "ema_product_codes": null,
    "dosage_forms": [
      "Tablet, film coated"
    ],
    "strength_number": "20",
    "strength_unit": "mg/1",
    "dosage_form": [
      "Tablet, film coated"
    ],
    "route": "Oral",
    "approved": true,
    "unapproved": false,
    "generic": true,
    "otc": false,
    "mixture": false,
    "allergen": false,
    "vaccine": false,
    "ingredients": [
      {
        "drugbank_id": "DB01076",
        "name": "Atorvastatin",
        "cas": "134523-00-5",
        "strength_number": "20",
        "strength_unit": "mg/1"
      }
    ]
  },
  {
    "hits": [
      {
        "field": "name",
        "value": "Amlodipine besylate 2.5 mg / Atorvastatin calcium trihydrate 20 mg Oral Tablet"
      }
    ],
    "name": "Amlodipine besylate 2.5 mg / Atorvastatin calcium trihydrate 20 mg Oral Tablet",
    "rx_norm_name": "amLODIPine besylate 2.5 MG / atorvastatin calcium 20 MG Oral Tablet",
    "country": "US",
    "brands": [
      "Amlodipine and atorvastatin",
      "Amlodipine besylate and Atorvastatin calcium"
    ],
    "ndc_product_codes": [
      "00378-4511",
      "43598-0320",
      "59762-6711"
    ],
    "dpd_codes": null,
    "ema_product_codes": null,
    "dosage_forms": [
      "Tablet, film coated"
    ],
    "strength_number": null,
    "strength_unit": null,
    "dosage_form": [
      "Tablet, film coated"
    ],
    "route": "Oral",
    "approved": true,
    "unapproved": false,
    "generic": true,
    "otc": false,
    "mixture": true,
    "allergen": false,
    "vaccine": false,
    "ingredients": [
      {
        "drugbank_id": "DB00381",
        "name": "Amlodipine",
        "cas": "88150-42-9",
        "strength_number": "2.5",
        "strength_unit": "mg/1"
      },
      {
        "drugbank_id": "DB01076",
        "name": "Atorvastatin",
        "cas": "134523-00-5",
        "strength_number": "20",
        "strength_unit": "mg/1"
      }
    ]
  },
  {
    "hits": [
      {
        "field": "name",
        "value": "Amlodipine besylate 10 mg / Atorvastatin calcium trihydrate 20 mg Oral Tablet"
      }
    ],
    "name": "Amlodipine besylate 10 mg / Atorvastatin calcium trihydrate 20 mg Oral Tablet",
    "country": "US",
    "brands": [
      "Amlodipine and atorvastatin"
    ],
    "ndc_product_codes": [
      "68382-0432",
      "70771-1465"
    ],
    "dpd_codes": null,
    "ema_product_codes": null,
    "dosage_forms": [
      "Tablet, film coated"
    ],
    "strength_number": null,
    "strength_unit": null,
    "dosage_form": [
      "Tablet, film coated"
    ],
    "route": "Oral",
    "approved": true,
    "unapproved": false,
    "generic": true,
    "otc": false,
    "mixture": true,
    "allergen": false,
    "vaccine": false,
    "ingredients": [
      {
        "drugbank_id": "DB00381",
        "name": "Amlodipine",
        "cas": "88150-42-9",
        "strength_number": "10",
        "strength_unit": "mg/1"
      },
      {
        "drugbank_id": "DB01076",
        "name": "Atorvastatin",
        "cas": "134523-00-5",
        "strength_number": "20",
        "strength_unit": "mg/1"
      }
    ]
  }
]

const _ = require('lodash')

const SearchMedicine = (props) => {
  const { onSelectMedication, onChange } = props
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const handleMedicationSearch = (value, callback) => {
    if (value && value.length > 2) {
      // to manage LU Code required on clearing medication
      // let str = value.split(','), strength
      // if (str) {
      //   value = str[0].replace(/\s+$/, '')
      //   if (str[1])
      //     strength = str[1].trim()
      // }
      fetchMediaction(value)
    };
  }

  const fetchMediaction = async (value) => {
    setLoader(true)
    const getAll = {
      method: 'GET',
      url: 'https://api.drugbank.com/v1/ca/drug_names?q=' + value,
      headers: { Authorization: 'a4cf8a1fb8a4794786a2e4f8a6bb38a5', isCustom: true }
    }
    const { method, url, headers } = getAll;
    // const data = { sort: { createdAt: -1 }, where: { isActive: true } };
    // try {
    //   let res = await axios({ method, url, headers });
    //   if (res) {
    //     if (res.code === "OK") {
    //       setData(res.data.data.products);
    //     }
    //   }
    // } catch{ setLoader(false) }
    let newDrug = []
    drugs.some(x => {
      if (x.name.toLowerCase().indexOf(value.toLowerCase()) >= 0)
        newDrug.push(x)
      if (newDrug.length > 9) return true
    })
    console.log("fetchMediaction -> newDrug", newDrug)
    setData(newDrug)
    setLoader(false)
  };

  return (
    <>
      <Select
        combobox={true}
        multiple={false}
        showArrow={false}
        placeholder="Search Medication"
        allowClear={true}
        filterOption={false}
        onChange={onChange}
        showSearch={true}
        onSearch={handleMedicationSearch}
        onSelect={onSelectMedication}
        disabled={props.disabled}
        searchable={true}
        value={props.value || undefined}
        notFoundContent={loader ? <Spin spinning={loader}></Spin> : 'No Data Found'}
      >
        {
          data &&
          data.length > 0 &&
          data.map((dd, index) => {
            return (
              <Option
                key={index}
                value={dd.name}
                title={dd.name}
              >
                {dd.name}
              </Option>
            );
          })}
      </Select>
    </>
  );
};

export default SearchMedicine;
