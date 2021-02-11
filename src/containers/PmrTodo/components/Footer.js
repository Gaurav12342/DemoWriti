import React, { Component, useEffect, useState } from 'react';
import { displayDate, displayTime } from '../../../util/moment';
import { getOrdersLength, calculatePercentage } from '../../../util/pmr';
import { Notes } from '../../../assets/images/pmr/index';

import { Line } from 'rc-progress';

const Header = (props) => {
  const { detail, onCreateNotesModal, onNotesModal } = props;
  const percentage = calculatePercentage(
    detail.completedOrder,
    detail.orderList
  );

  return (
    <>
      <div className='rx-btns'>
        <div className='flex-block'>
          {/* <a>
            <button>Rx Order</button>
          </a> */}
          {/* <a>
            <button>Pandding To Do's</button>
          </a> */}
          <a>
            <button
              onClick={() => {
                onCreateNotesModal('order');
              }}
            >
              PMR Order Notes
            </button>
          </a>
          <div className='p-relative'>
            <a
              onClick={() => {
                onCreateNotesModal('upsert');
              }}
              className='note-count'
            >
              {detail?.notesCount ? (
                <p className=''>{detail.notesCount}</p>
              ) : null}

              <Notes />
              <span className='notes-part'>Notes</span>
            </a>
            {/* <a className='note-count'>
              <img
                src={require('../../NursePrep/img/add-notes.svg')}
                className='mr-5'
              />
              <span className='notes-part'>Add Notes</span>
            </a> */}
          </div>
        </div>
        <div>
          <a className='order-com'>
            <Line percent={percentage} strokeWidth='4' strokeColor='#0BAA50' />
            Order Complete {detail.completedOrder} of{' '}
            {getOrdersLength(detail.orderList)}{' '}-{' '}{percentage}%
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
