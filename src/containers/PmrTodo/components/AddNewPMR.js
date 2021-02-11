import React, { useState } from 'react';
import Modal from "../../../../src/components/common/Popup";
import { ORDER_TYPE } from '../../../constants/prescription';
import { createForm } from 'rc-form'
import { ErrorMsg, Input, Select, TextArea, Option, Toast } from '../../../components/common';

import IndicationJson from '../../../assets/files/JSON/indications.json'
import SearchMedication from '../../../components/SearchMedication/SearchMedicationCopy';
import { medicationAdd } from '../../../services/api/routes/pmr';
import axios from "./../../../services/api/services/common";
import { isDrOrNp } from '../../../util/common'
import { SUB_CATEGORY } from '../../../constants/todo';
import { PMR_ORDER } from '../../../constants/pmr';
import { USER_TYPE } from '../../../constants/User';

function AddNewPMRModal({ visible, onClose, form, detail, orderData: propOrderData, onAddOrder,
  onNurseAck, onDrAck, standingOrder, authUser, orderStatus }) {
  const { getFieldError, getFieldDecorator, setFieldsValue } = form;
  let errors

  let orderData = propOrderData;
  if (propOrderData && propOrderData.clonedOrders && propOrderData.clonedOrders.length > 1) {
    orderData = propOrderData.clonedOrders.find(ord => ord.cloneFrom == propOrderData._id)
  }
  const [orderType, setOrderType] = useState(0);
  const [medication, setMedication] = useState(null)
  const [indication, setIndication] = useState('');
  const [direction, setDirection] = useState('');
  const [progressNote, setProgressNote] = useState('');
  const [description, setDescription] = useState('');
  const [descError, setDescError] = useState('');
  const [orderTypeErr, setOrderTypeErr] = useState('');
  const [loading, setLoading] = useState(false)
  const medicationRecord = React.useRef({});
  const isEdit = React.useRef(!!orderData?._id);

  React.useEffect(() => {
    if (orderData && orderData._id) {
      setFieldsValue({
        'medication': orderData?.drug?.name,
        'indication': orderData?.indication,
        'direction': orderData.sig || orderData.direction,
        'progressNotes': orderData?.progressNotes
      });
      setDirection(orderData.sig || orderData.direction)
      setMedication(orderData?.drug?.name)
      setOrderType(orderData?.orderType);
      setProgressNote(orderData?.progressNotes);
      setDescription(orderData?.description);
      setIndication(orderData?.indication);
      setProgressNote(orderData?.progressNotes);
    }
  }, [orderData])

  const handleMedicationChange = (medication, record) => {
    medicationRecord.current = record;
    setMedication(medication);
  }

  const onStandingOrderSave = () => {
    if (!description || !description?.trim()) {
      return setDescError("Please add description");
    }
    setDescError("");
    const reqData = {
      "pmrId": detail._id,
      description,
      "subCategory": detail.subCategory,
      pmrOrderId: !!orderData && orderData._id,
      isEdit: !!orderData && orderData._id,
      rxNum: '',
      source: 'KROLL'
    }
    onNurseAck(reqData)
  }

  const onSave = () => {
    const reqData = {
      "pmrId": detail._id,
      "indication": indication,
      "medication": medication,
      "orderType": orderType,
      direction: direction,
      "luCode": {
        "reasonForUseId": "",
        "reasonText": ""
      },
      "subCategory": detail.subCategory,
      "odbId": "5d64d870417e1a43fd6f040e",
      "strength": medicationRecord?.current?.number,
      "strengthUnit": medicationRecord?.current?.unit,
      "dosageForm": medicationRecord?.current?.dosage_form,
      "din": medicationRecord?.current?.ingredients?.[0]?.drugbank_id,
      "progressNotes": progressNote
    }
    if (!orderType) {
      setOrderTypeErr("Please select order type");
      return
    } else {
      setOrderTypeErr('')
    }
    if (!reqData.medication) {
      Toast.error('Please input medication of minimum 3 characters')
      return
    }
    form.validateFields((err, values) => {
      if (!!orderData && orderData._id || orderStatus === PMR_ORDER.STATUS.DISCONTINUE) {
        // while edit
        if (authUser.type === USER_TYPE.HOME.NURSE) {
          onNurseAck(reqData)
        }
        else if (authUser.type === USER_TYPE.HOME.PHYSICIAN
          && detail.subCategory === SUB_CATEGORY.MED_REVIEW.PMR) {
          onDrAck(reqData)
        }
      } else {
        if (isDrOrNp(authUser) && detail.subCategory === SUB_CATEGORY.MED_REVIEW.PMR) {
          //Add new form
          reqData.status = PMR_ORDER.STATUS.CONTINUE
          reqData.docStatusUpdate = PMR_ORDER.STATUS.CONTINUE
        }
        setLoading(true);

        axios({ ...medicationAdd, data: reqData }).then(res => {
          if (res.code === 'OK') {
            Toast.success(res.message)
            onAddOrder(res.data);
            setLoading(false);
            onClose()
          }
        }).catch(err => {
          console.log("error = ", err)
          setLoading(false);
        }).finally(() => setLoading(false))
      }
    });

  };

  return (
    <Modal
      visible={visible}
      title={`${isEdit.current ? 'Update' : 'Add'} Order`}
      maskClosable={true}
      onCancel={onClose}
      onClose={onClose}
      footer={true}
      className="lock_popup addxray-popup"
      closable={false}
      okText={isEdit.current ? 'Update' : 'Add'}
      btnClass="d-flex-end f-end footer-block"
      onOk={standingOrder ? onStandingOrderSave : onSave}
      okButtonProps={{ loading: loading }}
    >
      {
        standingOrder ?
          <StandingOrder {...{ description, setDescription, descError }}></StandingOrder>
          :
          <>
            <div className="filter_wrap" style={{ borderTop: 0 }}>
              <div className="filter_section add-pmr-order">
                <span className="sub-text ">Type</span>
                <div className="rx-btns drug-bts">
                  <div className="flex-block filter_value" style={{ padding: '10px 0 5px', flexWrap: 'wrap', display: 'flex' }}>
                    {
                      Object.keys(ORDER_TYPE).map(x => (
                        <label
                          for={x.replace(/_/, ' ')}
                          className="filter_switch"
                          onClick={() => setOrderType(ORDER_TYPE[x])}
                          style={{ marginBottom: '5px' }}
                        >
                          <input
                            type="checkbox"
                            name={x.replace(/_/, ' ')}
                            id={x.replace(/_/, ' ')}
                            value={ORDER_TYPE[x]}
                            checked={orderType === ORDER_TYPE[x]}
                          />
                          <span style={{ whiteSpace: 'nowrap', display: 'block' }}>
                            {x.replace(/_/, ' ')}
                          </span>
                        </label>
                      ))
                    }
                  </div>
                  {!!orderTypeErr ?
                    <div style={{ marginBottom: 15 }}>
                      <ErrorMsg errors={[orderTypeErr]} />
                    </div>
                    : null}
                </div>
              </div>
            </div>

            <div>
              {/* <div className="form_group">
          {
            !isDrOrNp(authUser) ?
              <DoctorFilter value={physicianId} onChange={setPhysicianId} />
              : null
          }
        </div> */}
              <div className="form_group">
                {getFieldDecorator('medication', {
                  rules: [{
                    required: true, message: `Please enter medication`,
                    // whitespace: true,
                  }]
                })(
                  <SearchMedication
                    value={medication}
                    onSelectMedication={handleMedicationChange}
                  />
                )}
                {(errors = getFieldError('medication')) ? <ErrorMsg errors={errors} /> : null}

              </div>
              <div className="form_group textInput">
                {getFieldDecorator('direction', {
                  rules: [{
                    required: false, message: `Please enter direction`,
                    whitespace: true,
                  }]
                })(
                  <Input placeholder='direction' onChange={e => setDirection(e.target.value)} />
                )}
                {(errors = getFieldError('direction')) ? <ErrorMsg errors={errors} /> : null}

              </div>
              <div className="form_group">
                {getFieldDecorator('indication', {
                  rules: [{
                    required: false, message: `Please enter indication`,
                    whitespace: true,
                  }]
                })(
                  <Select
                    showSearch
                    combobox={true}
                    allowClear
                    placeholder="Select Indication"
                    // optionFilterProp="children"
                    onChange={setIndication}
                    filterOption={(input, option) =>
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {
                      IndicationJson.map((data) => {
                        return (
                          <Option value={data.name} key={data.id}>{data.name}</Option>
                        )
                      })
                    }
                  </Select>
                )}
                {(errors = getFieldError('indication')) ? <ErrorMsg errors={errors} /> : null}
              </div>
              <div className="form_group">
                <TextArea
                  placeholder="Progress Notes &#10;(will push to PCC/MED e-care)"
                  class="inputForm form_group"
                  onChange={e => setProgressNote(e.target.value)}
                  value={progressNote}
                ></TextArea>
              </div>
            </div>
          </>
      }
    </Modal>
  )
}

function StandingOrder({ description, setDescription, descError = '' }) {
  return (
    <div className="form_group">
      <TextArea
        placeholder="Description"
        class="inputForm form_group"
        onChange={e => setDescription(e.target.value)}
        value={description}
      ></TextArea>
      {!!descError && <ErrorMsg errors={[descError]} />}
    </div>
  )
}

export default createForm()(AddNewPMRModal);