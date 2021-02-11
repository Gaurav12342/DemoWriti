import React, { useState } from 'react';
import { createForm } from 'rc-form';
import AddResidentPopup from './AddResidentPopup';
import axios from '../../../../services/api/config';
import { addResident } from '../../../../services/api/routes/resident';
import { Toast } from '../../../../components/common';
import { setTimeToZero } from '../../../../util/moment';
const moment = require('moment');
function AddResidentMain(props) {
  const {
    isVisible,
    onCancel,
    form,
    authUser,
    homeId,
    onAddedResident,
  } = props;
  const [homeAreaId, setHomeAreaId] = useState([]);
  const [POAData, setPOAData] = useState([]);
  const [current, setCurrent] = useState([1]);
  const [btnLoading, setBtnLoading] = useState(false);

  const handleDoctorChange = (val) => {
    form.setFieldsValue({
      physicianId: val,
    });
  };
  const handleSubmit = () => {
    // debugger;
    const { validateFields } = form;
    validateFields((error, value) => {
      if (error) {
        return console.log('errors', error);
      }
      //   setBtnLoading(true);
      value.dob = moment(value.dob).format('MM/DD/YYYY');
      value.homeId = homeId;
      // value.isPrimary = true;
      if (
        current &&
        current.length > 0 &&
        (value.poaFirstName1 || value.poaLastName1)
      ) {
        let poa = [];
        current.forEach((i) => {
          poa.push({
            name: value[`poaLastName${i}`] + '  ' + value[`poaFirstName${i}`],
            contactNo: value[`poaPhone${i}`],
            email: value[`poaEmail${i}`],
          });
          delete value[`poaLastName${i}`];
          delete value[`poaFirstName${i}`];
          delete value[`poaPhone${i}`];
          delete value[`poaEmail${i}`];
        });
        value.poa = poa;
      }
      value.weight = {
        value: value.weight,
        date: setTimeToZero(moment())
      }
      value.height = {
        value: value.height,
        date: setTimeToZero(moment())
      }
      value.addresses = [{
        line1: value.line1,
        line2: value.line2,
        city: value.city,
        isPrimary: true,
        province: value.province,
        pincode: value.pincode
      }]
      delete value.line1
      delete value.line2
      delete value.city
      delete value.province
      delete value.pincode
      addResidentRequest(value);
      console.log('current', current);
    });
  };
  const addResidentRequest = (value) => {
    setBtnLoading(true);
    let { method, url, baseURL } = addResident;
    axios({ method, url, baseURL, data: value })
      .then(({ data }) => {
        if (data.code === 'OK') {
          setBtnLoading(false);
          Toast.success(data.message);
          onAddedResident(true);
          onCancel();
        }
        setBtnLoading(false);
      })
      .catch((err) => {
        setBtnLoading(false);
      });
  };
  const addCustomFields = () => {
    const { validateFields } = form;
    validateFields((error, value) => {
      let tCurrent = current,
        canInsert = true;
      tCurrent.forEach((i) => {
        if (!(value[`poaFirstName${i}`] && value[`poaLastName${i}`])) {
          canInsert = false;
        }
      });
      if (canInsert) {
        tCurrent.push(tCurrent[tCurrent.length - 1] + 1);
        setCurrent(tCurrent);
      }
    });
  };
  const handleDeleteClick = (ci) => {
    let index = current.indexOf(ci);
    if (index >= 0) {
      let tCurrent = [...current];
      tCurrent.splice(index, 1);
      if (tCurrent.length > 0) {
        setCurrent(tCurrent);
      }
      // form.resetFields([`poaLastName${ci}`, `poaFirstName${ci}`, `poaPhone${ci}`, `poaEmail${ci}`])
    }
  };
  const handleCascaderChange = (e) => {
    console.log('TCL: handleCascaderChange -> e', e);
    // setHomeAreaId(['primary'])
  };
  return (
    <AddResidentPopup
      isVisible={isVisible}
      form={form}
      onCancel={onCancel}
      authUser={authUser}
      onSubmit={handleSubmit}
      onDoctorChange={handleDoctorChange}
      onCascaderChange={handleCascaderChange}
      homeAreaId={homeAreaId}
      onAddCustomFields={addCustomFields}
      current={current}
      POAData={POAData}
      onDeleteClick={handleDeleteClick}
      btnLoading={btnLoading}
    />
  );
}
const wrappedResidentForm = createForm()(AddResidentMain);
export default wrappedResidentForm;
