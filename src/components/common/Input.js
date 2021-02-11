import React, { useState } from "react";
import PropTypes from "prop-types";
import { Pvisible, Punvisible } from '../../assets/images/index'
import { ChevronDown, Clear } from "../../assets/images/index";

const appendIcon = (opt) => {
  if (opt.inputIcon) {
    if (opt.allowClear && opt.value)
      return null
    else return opt.inputIcon
  } return null
}

const Input = ({
  componentClass,
  onClear,
  onSearch,
  isSearch,
  allowClear,
  hideshowpasschange,
  show,
  ispass,
  clearClassName,
  ...props
}) => {

  const handleClear = e => {
    e.stopPropagation();
    if(onClear)
    onClear();
    props.onChange([])
  }

  return (
    <>
      {/* <div className={"components " + componentClass}> */}
      <input
        type="text"
        onKeyDown={(e) => {
          if (isSearch && (e.which === 13 || e.keyCode === 13) && onSearch) {
            console.log("e.target.value", e.target.value);
            onSearch(e.target.value);
            e.preventDefault();
          }
        }}
        {...props}
      />
      {
        ispass ?
          <>{
            show ? <Pvisible onClick={hideshowpasschange} /> : <Punvisible onClick={hideshowpasschange} />
          }
          </> : null
      }

      {allowClear && props.value && !props.disabled ? (
        clearClassName ?
          <Clear className={clearClassName} onClick={handleClear} /> :
          <Clear onClick={handleClear} />
      ) : null}
      {appendIcon(props)}
      {/* {appendIcon({ inputIcon, allowClear, value: props.value })} */}
      {/* </div> */}
    </>
  );
};

export default Input;
Input.defaultProps = {
  className: "form_control",

  // className: "inputForm",
  componentClass: "",
  allowClear: false,
  ispass: false,
  show: false
};
Input.propTypes = {
  className: PropTypes.string,
  componentClass: PropTypes.string,
  allowClear: PropTypes.bool,
  onClear: PropTypes.func,
  ispass: PropTypes.bool,
  show: PropTypes.bool,
  hideshowpasschange: PropTypes.func
};
