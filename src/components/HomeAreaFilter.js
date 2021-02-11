import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Select, Option } from './common';
import axios from '../services/api/services/common';
import { getAllHomeArea } from '../services/api/routes/customer';
import { connect } from 'react-redux';
import { isKeyExist } from '../util/common';
import { setUserData } from '../appRedux/actions/Auth';
const _ = require('lodash');

const HomeAreaFilter = (props) => {
  const {
    placeholder,
    onChange,
    authUser,
    homeId,
    multiple,
    defaultValue,
    name,
  } = props;
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [homeAreaList, setHomeAreaList] = useState([]);

  // useEffect(() => {
  //   // uncomment if u want to fetch home area from homeId (not switch home)
  //   if (authUser?.homeId?._id)
  //     fetch()
  // }, [authUser])

  useEffect(() => {
    if (
      isKeyExist(authUser, ['homeId', 'homeAreas']) &&
      authUser.homeId.homeAreas.length
    ) {
      setHomeAreaList(authUser.homeId.homeAreas);
    }
  }, [authUser]);

  // useEffect(() => {
  // uncomment if u want to fetch home area from homeId (not switch home)
  //   fetch()
  // }, [homeId])

  // fetch = async () => {
  //   // if (authUser.homeAreas && authUser.homeAreas.length > 0) {
  //   //   setHomeAreaList(authUser.homeAreas);
  //   // } else {
  //   setLoader(true);
  //   const request = {
  //     select: ['isActive', '_id', 'name'],
  //     where: { isActive: true, homeId: homeId },
  //   };
  //   let res = await axios({ ...getAllHomeArea, data: request });
  //   if (res && res.code === 'OK') {
  //     setHomeAreaList(res.data.data);
  //     props.setUserData({ ...authUser, homeAreas: res.data.data });
  //   }
  //   setLoader(false);
  //   // }
  // };

  return (
    <React.Fragment>
      <Select
        multiple={multiple}
        loading={loader}
        placeholder={placeholder}
        showSearch
        name={name}
        defaultValue={defaultValue || undefined}
        onChange={onChange}
        allowClear
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {homeAreaList.length > 0
          ? homeAreaList.map((curObj) => {
            return (
              <Option key={curObj._id} value={curObj._id}>
                {curObj.name}
              </Option>
            );
          })
          : null}
      </Select>
    </React.Fragment>
  );
};

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return { authUser };
};

HomeAreaFilter.defaultProps = {
  allowClear: true,
  placeholder: 'Select Home Area',
};
HomeAreaFilter.propTypes = {
  allowClear: PropTypes.bool,
  placeholder: PropTypes.string,
};
export default connect(mapStateToProps, { setUserData })(HomeAreaFilter);
