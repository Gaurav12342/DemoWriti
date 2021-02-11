/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import Spin from "../common/Spin";
import PropTypes from "prop-types";
import { UpdResidentDoc } from "../../assets/images/resident-detail/index";

const ButtonType = {
  primary: "btn primary-btn",
  secondary: "btn grey-btn",
  danger: "btn danger-btn",
  outline: "btn outline",
  transparent: "btn transparent-btn",
};
const ButtonSize = {
  xs: "btn-xs",
  lg: "btn-lg",
  sm: "btn-sm",
};

const Button = (props) => {
  const {
    loading,
    children,
    type,
    size,
    spinHeight,
    onClick,
    isUpload,
    ...otherProps
  } = props;
  let classNames;
  let stroke;
  if (loading) {
    classNames = ButtonType[type] + " " + ButtonSize[size] + " spin_btn";
    if (ButtonSize[size] == "btn-sm") {
      stroke = 2;
    }
    if (ButtonSize[size] == "btn-xs") {
      stroke = 2;
    }
    if (ButtonSize[size] == "btn-lg") {
      stroke = 4;
    }
  } else {
    classNames = ButtonType[type] + " " + ButtonSize[size];
  }

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
  };

  return (
    <>
      <button className={classNames} {...otherProps} onClick={handleClick}>
        {loading ? (
          <Spin
            spinning={true}
            colorCode={"#ffffff"}
            str={"left autoheight"}
            strokeWidth={stroke}
          ></Spin>
        ) : null}
        {/* {
          isUpload ? <UpdResidentDoc  /> : null
        } */}
        {children}
      </button>
    </>
  );
};

Button.defaultProps = { type: "primary", size: "sm" };
Button.propTypes = {
  className: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.string,
  icon: PropTypes.object,
  type: PropTypes.oneOf(Object.keys(ButtonType)),
  size: PropTypes.oneOf(Object.keys(ButtonSize)),
};

export default Button;
