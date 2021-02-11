/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Tab } from 'react-tabs';
import { ReactComponent as CloseResident } from '../../../../assets/images/resident-detail/cancel.svg';
import Image from '../../Image';
import PropTypes from 'prop-types';
import _ from 'lodash';

const CustomTab = (props) => {
  const { image, title, count, id, closeable, onCloseTab, children, ...otherProps } = props;
  // console.log('CustomTab ->  { image, title, count, id, closeable, onCloseTab, children, ...otherProps }', { image, title, count, id, closeable, onCloseTab, children, ...otherProps });

  return <Tab {...otherProps}>
    <div className="resi_d">
      {children}
      {image ?
        <Image image />
        : null}
      <h3>{title}</h3>
    </div>
    {closeable &&
      <div className="resi_c" onClick={onCloseTab}>
        <CloseResident />
      </div>
    }
    {count ?
      <div className="c_records">{count}</div> : null
    }
  </Tab>;
};

CustomTab.defaultProps = { closeable: false, };
CustomTab.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.number,
  closeable: PropTypes.bool,
  onCloseTab: PropTypes.func,
};

CustomTab.tabsRole = 'Tab'; // Required field to use your custom Tab
export default CustomTab;