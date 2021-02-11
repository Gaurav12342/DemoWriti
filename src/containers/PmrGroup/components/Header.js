import React from 'react';
import { Button, Search } from '../../../../src/components/common/index';

const Header = (props) => {
  const { onVisible, total, onSearch, checkAddAction } = props;
  return (
    <>
      <div className='page_head'>
        <h3 style={{ fontSize: '25px', alignItems: 'center', width: '30%' }}>
          PMR Groups{' '}
          <span
            className='r_no'
            style={{ marginTop: '1%', marginLeft: '2%', fontSize: '55%' }}
          >
            {total}
          </span>
        </h3>
        <div style={{ display: 'flex' }}>
          <div className='form_group' style={{ marginRight: '2%' }}>
            <Search
              onChange={onSearch}
              allowClear={true}
              placeholder='Search by Name'
              style={{ width: '250px' }}
            />
          </div>
          <div className='components'>
            {
              // checkAddAction ?
              <Button type='primary' size='lg' onClick={onVisible}>
                Add
            </Button>
              // : null
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
