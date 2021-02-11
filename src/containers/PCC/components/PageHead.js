import React, { useState, useEffect } from 'react';
import {
  Button,
} from '../../../components/common/index';

const PageHead = (props) => {
  const { total, onSync, syncLoader } = props;

  return (
    <>
      <div className='page_head'>
        <h3 style={{ fontSize: '25px', alignItems: 'center', width: '30%' }}>
          {' '}
          PointClickCare{' '}
          <span
            className='r_no'
            style={{ marginTop: '1%', marginLeft: '2%', fontSize: '55%' }}
          >
            {total}
          </span>
        </h3>
        <div className='form_wrap'>
          <div className='components'>
            <Button type='primary' size='lg' onClick={onSync} loading={syncLoader}>
              Sync
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default (PageHead);
