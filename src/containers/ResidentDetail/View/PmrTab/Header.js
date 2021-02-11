import React from 'react';
import { Search, } from '../../../../components/common';
const Header = (props) => {
  const { onSearch } = props;
  const [searchVal, setSearchVal] = React.useState('');

  React.useEffect(() => {
    onSearch(searchVal)
  }, [searchVal])

  return (
    <>
      <div className='page_head'>
        <div style={{ display: 'flex' }}>
          <div className='form_group' style={{ marginRight: '1%' }}>
            <Search
              value={searchVal}
              allowClear={true}
              onChange={e => setSearchVal(e.target.value)}
              placeholder='Search by PMR No.'
              style={{ width: '250px' }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
