import React from 'react';
import { Search, Button, Select, Option } from '../../../components/common/index';
import { MASTER_MEDIUM } from '../../../constants/MasterMedium';
import { MODULE, ACTIONS } from "../../../constants/subscription";
import { canPerformAction } from "../../../util/common";

const MasterHeader = (props) => {
  const {
    form,
    modalTitle,
    masterName,
    length,
    onAdd,
    onSearch,
    headerWidth,
    masterDetail,
    mediumLists,
    onChangeMedium,
    isAdmin
  } = props;
  const { getFieldDecorator, validateFields } = form;
  let mediumName = masterDetail?.masterForMedium === MASTER_MEDIUM.PHARMACY ? 'Pharmacy' :
    masterDetail?.masterForMedium === MASTER_MEDIUM.HOME ? 'Home' : '';

  const handleSearch = () => {
    validateFields((error, value) => {
      if (!error) {
        onSearch(value);
      }
    });
  };

  return (
    <>
      <div className='page_head sub_head'>
        <h3
          style={{
            width: headerWidth == true ? '80%' : '100%',
          }}
        >
          {masterName
            ? `${masterName}${mediumName ? ` (${mediumName})` : ''} - `
            : null}{' '}
          {modalTitle}
          <span className='r_no' style={{ marginTop: '1px' }}>{length}</span>
        </h3>
        <div
          style={{
            width: headerWidth == false ? '38%' : '',
            display: 'flex',
          }}
        >
          {isAdmin && (masterDetail?.masterForMedium === MASTER_MEDIUM.PHARMACY ||
            masterDetail?.masterForMedium === MASTER_MEDIUM.HOME) ?
            < div className='form_group mr-5' style={{ width: '200px' }}>
              <Select showSearch allowClear={true}
                placeholder={`Select ${masterDetail.masterForMedium === MASTER_MEDIUM.PHARMACY ? 'Pharmacy' : 'Home'}`}
                onChange={onChangeMedium}
                filterOption={(input, option) =>
                  option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {
                  mediumLists.map(data => {
                    return <Option key={data._id} value={data._id}>
                      {data.name}
                    </Option>
                  })
                }
              </Select>
            </div>
            : null
          }
          <div className='form_group' style={{ marginRight: '2%' }}>
            <Search
              allowClear={true}
              onChange={onSearch}
              placeholder='Name / Code'
              style={{ width: '200px' }}
            />
          </div>
          {
            canPerformAction({
              moduleId: MODULE.MASTER,
              actiontoCheck: ACTIONS.ADD.CODE,
            }) ?
              <div className='components'>
                <Button type='primary' size='lg' onClick={onAdd}>
                  Add
              </Button>
              </div>
              : null
          }
        </div>
      </div>
    </>
  );
};
export default MasterHeader;
