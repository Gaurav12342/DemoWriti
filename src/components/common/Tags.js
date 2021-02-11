/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Close } from '../../assets/images/popup/index';

const Tags = (props) => {
  const { className, children, onClose, closeIcon, closable, onClick } = props;
  return (
    <>
      <span onClick={onClick} className={'o_status ' + className}>
        {children}
        <span onClick={onClose}>{(closable && <Close />) || closeIcon}</span>
      </span>
    </>
  );
};

Tags.defaultProps = {
  className: 'submitted',
  closable: false,
};
Tags.propTypes = {
  className: PropTypes.string,
  closeIcon: PropTypes.node,
  closable: PropTypes.bool,
  onClose: PropTypes.func,
  color: PropTypes.string,
  style: PropTypes.string,
  onClick: PropTypes.func,
};
export default Tags;
