import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import Dialog from 'rc-dialog';
import PropTypes from 'prop-types';
import Button from '../common/Button';

const ConfirmPopup = (props) => {
  const {
    visible,
    onClose,
    closeIcon,
    description,
    title,
    footerDescription,
    okText,
    cancelText,
    onOk,
    onCancel,
    children,
    style,
  } = props;
  return <>

    <Dialog
      // {...props}
      visible={visible}
      onClose={onClose}
      closable={true}
      closeIcon={closeIcon}
      onCancel={onCancel}
      className='lock_popup del-notes-wrap'
      style={style}
      maskClosable={true}
    >
      <div className='popup-content'>
        <h3 className='name_head'>{title}</h3>
        <div className='bb'></div>
        <p>{description}</p>
        {children}
        <div>
          <Button className='screen-btn gray-btn' onClick={onCancel}>
            {cancelText}
          </Button>
          <Button className='screen-btn' onClick={onOk}>
            {okText}
          </Button>
        </div>

        <div className='bottom-line'>{footerDescription}</div>
      </div>
    </Dialog>
  </>
}
function Popup(props) {
  const div = document.createElement('div');
  document.body.appendChild(div);

  function handleCancel() {
    let currentConfig = {
      ...props,
      visible: false,
      afterClose: destroy()
    };
    render(currentConfig);
    if (props.onCancel) {
      props.onCancel()
    }

  }

  function handleOk() {
    handleCancel()
    if (props.onOk) {
      props.onOk()
    }
  }

  function destroy() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult && div.parentNode) {
      div.parentNode.removeChild(div);
    }
    return
  }

  function render(props) {
    setTimeout(() => {
      ReactDOM.render(
        <ConfirmPopup {...props}
          onCancel={handleCancel}
          onOk={handleOk}
        />,
        div,
      );
    });
  }

  if (props.func)
    render(props)
  else return <ConfirmPopup {...props} />

};

ConfirmPopup.defaultProps = {
  // closable: true,
  // className: 'lock_popup del-notes-wrap',
  // maskClosable: true,
  okText: 'Yes',
  cancelText: 'No',
  destroyOnClose: true,
};

ConfirmPopup.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.string,
  closable: PropTypes.bool,
  closeIcon: PropTypes.node,
  title: PropTypes.string,
  className: PropTypes.string,
  description: PropTypes.string,
  footerDescription: PropTypes.string,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  style: PropTypes.string,
  maskClosable: PropTypes.bool,
};

export default Popup;
