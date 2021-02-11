import React, { Component, useEffect, useState } from 'react';
import Table from '../../../components/common/Table/index';
import { displayDate, displayTime } from '../../../util/moment';

const Medications = (props) => {
  const { detail } = props;
  const { prescriptionMedication, createdAt, medStrip } = detail;
  console.log('detail =>', detail);

  //   const getColumns = [
  //     {
  //       title: 'Medication',
  //       dataIndex: 'medicineFullName',
  //       render: (text, record) => (
  //         <span>{text || record.name || record.medication}</span>
  //       ),
  //     },
  //     {
  //       title: 'Directions',
  //       dataIndex: 'direction',
  //       render: (text) => <span>{text}</span>,
  //     },
  //     {
  //       title: 'RFU/LU Code',
  //       dataIndex: '',
  //       render: (text) => <span>{'-'}</span>,
  //     },
  //     {
  //       title: 'Related Diagnosis or Indication',
  //       dataIndex: 'indication',
  //       render: (text) => <span>{text}</span>,
  //     },
  //   ];

  return (
    <>
      <div style={{ marginTop: '10px' }}>
        <div className='form_group col-12 '>
          <div className='form_group col-12 d-flex align-item-center'>
            <label style={{marginBottom : '0'}}>Date/Time : </label> &nbsp;
            {displayDate(createdAt)} &nbsp;
            {displayTime(createdAt)}
          </div>
          
        </div>
        {medStrip &&
          <div className='form_group col-12 d-flex'>
            <div className='form_group col-12' style={{ marginTop: '-4px' }}>
              <label className='filter_check'>
                <input type='checkbox' checked={medStrip} />
                <span className='checkbox'></span>
                <span className='lbl'>Start with next Meds Strip</span>
              </label>
            </div>
          </div>
        }
        {/* <Table
          pagination={false}
          columns={getColumns}
          datasource={prescriptionMedication}
          noLRPad={true}
          rowClassName={'custom-row-style'}
        /> */}
        {prescriptionMedication &&
          prescriptionMedication.map((data) => {
            return (
              <>
                <div className='form_group col-12 d-flex'>
                  <div className='form_group col-12'>
                    <label>
                      <b>Medication</b>
                    </label>
                    <label>
                      {data.medicineFullName ? data.medicineFullName : '-'}
                    </label>
                  </div>
                </div>
                <div className='form_group col-12 d-flex'>
                  {/* <div className='form_group col-4'>
                    <label>
                      <b>RFU/LU Code</b>
                    </label>
                    <label>{'-'}</label>
                  </div> */}
                  <div className='form_group col-8'>
                    <label>
                      <b>Related Diagnosis or Indication</b>
                    </label>
                    <label>{data.indication ? data.indication : '-'}</label>
                  </div>
                </div>
                <div className='form_group col-12 d-flex'>
                  <div className='form_group col-12'>
                    <label>
                      <b>Directions</b>
                    </label>
                    <label>{data.direction ? data.direction : '-'}</label>
                  </div>
                </div>
                <hr />
              </>
            );
          })}
      </div>
    </>
  );
};

export default Medications;
