import React, { useEffect } from "react";
import Dialog from "rc-dialog";
import PropTypes from "prop-types";
import Button from "../Button";
import { Close } from "../../../assets/images/popup/index";
import propTypes from "rc-form/lib/propTypes";
import Spin from "../Spin";

const Modal = (props) => {
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
    btnClass,
    closable,
    titleClass,
    footer,
    customChildren,
    okButtonProps,
    isClose,
    ...otherProps
  } = props;
  return (
    <>
      <Dialog
        destroyOnClose={true}
        visible={visible}
        onClose={onCancel}
        onCancel={onCancel}
        {...otherProps}
      >
        {customChildren ? (
          children
        ) : (
            <>
              <div className="popup-content">
                {title ? (
                  <>
                    <h3 className={"name_head " + titleClass}>{title}</h3>
                    <div className="bb"></div>
                  </>
                ) : null}
                {description && <p>{description}</p>}
                <div className="modal_body_container">
                  {children}
                </div>

                {footer ? (
                  footer.length > 0 ? (
                    <div className={btnClass}>{footer} </div>
                  ) : (
                      <div className={btnClass}>
                        <Button type="secondary" size="lg" onClick={onCancel}>
                          {cancelText}
                        </Button>
                        {!isClose ?
                          <Button
                            type="primary"
                            size="lg"
                            style={{ marginLeft: '1%' }}
                            onClick={onOk}
                            loading={okButtonProps && okButtonProps.loading}
                          >
                            {okText}
                          </Button> : null
                        }
                      </div>
                    )
                ) : null}
                {footerDescription && (
                  <div className="bottom-line">{footerDescription}</div>
                )}
              </div>
            </>
          )}
        {closable && (
          <button className="close-btn" onClick={onCancel}>
            {closeIcon || <Close />}
          </button>
        )}
      </Dialog>
    </>
  );
};

Modal.defaultProps = {
  closable: true,
  okText: "Ok",
  cancelText: "Cancel",
  btnClass: "d-flex-end f-end",
  className: "lock_popup del-notes-wrap",
  titleClass: "text-left",
  footer: true,
  customChildren: false,
};

Modal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  closable: PropTypes.bool,
  closeIcon: PropTypes.node,
  title: PropTypes.string,
  titleClass: PropTypes.string,
  btnClass: PropTypes.string,
  className: PropTypes.string,
  description: PropTypes.string,
  footerDescription: PropTypes.string,
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  footer: PropTypes.bool, // whether to show footer or not
  customChildren: PropTypes.bool, // to render custom children
  loading: PropTypes.bool,
};

export default Modal;
