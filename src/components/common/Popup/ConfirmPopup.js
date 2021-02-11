import React from 'react';
import Dialog from './index';
import PropTypes from 'prop-types';

const ConfirmPopup = (props) => {
  const {
    visible,
    closable,
    children,
    ...otherProps
  } = props;

  return (
    <>
      <Dialog
        visible={visible}
        closable={closable || false}
        className="lock_popup del-notes-wrap"
        btnClass={null}
        titleClass='text-center'
        {...otherProps}
        onOk={otherProps.onOK}
      >
        {children}
      </Dialog>
    </>
  );
};

export default ConfirmPopup;
