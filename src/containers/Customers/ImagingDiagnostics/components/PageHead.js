import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Search } from '../../../../components/common/index';

const PageHead = (props) => {
  const { total, onSearch, onRedirect } = props;

  return (
    <>
      <div className='page_head'>
        <h3 style={{ fontSize: '25px', alignItems: 'center', width: '30%' }}>
          Imaging &amp; Diagnostics{' '}
          <span
            className='r_no'
            style={{ marginTop: '1%', marginLeft: '2%', fontSize: '55%' }}
          >
            {total}
          </span>
        </h3>
        <div style={{ display: 'flex' }}>
          <div className='form_group' style={{ marginRight: '1%' }}>
            <Search
              allowClear={true}
              onChange={onSearch}
              placeholder='Search by Name, Email'
              style={{ width: '250px' }}
            />
          </div>
          <div className='components'>
            <Button type='primary' size='lg' onClick={onRedirect}>
              Add imaging diagnostics
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(PageHead);
