import React from 'react';
import { Button, Search, RadioGroup } from '../../../components/common/index';
import { SUPPORT_TYPE } from '../../../constants/supportFeedback';
import { supportDelete } from '../../../services/api/routes/supportFeedback';

const Header = (props) => {
  const { onVisible, total, onRadioValue, onHandleRadioValue, onCheckAddAction } = props;
  return (
    <>
      <div className='page_head'>
        <h3 style={{ fontSize: '25px', alignItems: 'center', width: '30%' }}>
          Support
          <span
            className='r_no'
            style={{ marginTop: '1%', marginLeft: '2%', fontSize: '55%' }}
          >
            {total}
          </span>
        </h3>
        <div className='form_wrap'>
          <div className='components radio_grp' style={{ marginRight: '20px' }}>
            <RadioGroup
              options={[
                {
                  style: { color: 'red' },
                  label: 'Connect with writi',
                  id: 'Connect with writi',
                  value: SUPPORT_TYPE.CONNECT_WITH_WRITI,
                  checked: onRadioValue === SUPPORT_TYPE.CONNECT_WITH_WRITI,
                },
                {
                  label: 'Request a feature',
                  id: 'Request a feature',
                  value: SUPPORT_TYPE.REQUEST_A_FEATURE,
                  checked: onRadioValue === SUPPORT_TYPE.REQUEST_A_FEATURE,
                },
                {
                  label: 'Submit a bug',
                  id: 'Submit a bug',
                  value: SUPPORT_TYPE.SUBMIT_A_BUG,
                  checked: onRadioValue === SUPPORT_TYPE.SUBMIT_A_BUG,
                },
              ]}
              name='support'
              onChange={onHandleRadioValue}
              value={onRadioValue}
            />
          </div>
          {onCheckAddAction ?
            <div className='components' style={{ marginTop: '3px' }}>
              <Button type='primary' size='lg' onClick={onVisible}>
                Add Request
            </Button>
            </div>
            : null}
        </div>
        {/* <div style={{ display: 'flex' }}>
          <div className='form_group' style={{ marginRight: '2%' }}>
            <Search
              allowClear={true}
              //   onChange={onSearch}
              placeholder='Search by Name, Email'
              style={{ width: '250px' }}
            />
          </div>
          <div className='components'>
            <Button type='primary' size='lg' onClick={onVisible}>
              Add Request
            </Button>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Header;
