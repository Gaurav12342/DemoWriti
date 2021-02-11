import React from 'react';
import ConfirmPopup from './ConfirmPopup'

const Modal = ConfirmPopup

function withConfirm(props) {
  return {
    ...props,
    visible: true,
    func: true
  };
}

Modal.confirm = function confirmFn(props) {
  return ConfirmPopup(withConfirm(props));
};
export default Modal

