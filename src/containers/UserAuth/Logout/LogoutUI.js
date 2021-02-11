import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { createForm } from "rc-form";
import Dialog from "rc-dialog";
import Spin from "../../../components/common/Spin";
import { Input, Button } from "../../../components/common/index";
const _ = require("lodash");
const $ = require( "jquery" )

const LogoutUI = (props) => {
  const [name, setName] = useState("");
  // let { isVisible, onLogout, userName, logoutDisable, form, onClose } = props;
  // let { getFieldDecorator, validateFields } = form;
  let { showModal, onContinue, onLogout, userName, remainingTime } = props;
  // console.log("assssssss", name);
  // console.log("props", form);

  useEffect(() => {
    $(document).ready(function (){
        $('.high_overlay').parent('.rc-dialog-wrap').prev('.rc-dialog-mask').css({ background: 'rgba(0, 0, 0, 0.85)'});
    });
    
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onContinue(name);
    // console.log("name", name);
    // props.form.validateFields((value, error) => {
    //   console.log("logout form data", value);
    // });
  };

  return (
    <>
      <Dialog visible={showModal} className="lock_popup high_overlay" maskClosable={false}>
        <div className="popup-content">
          <div className="user_name_img">
            <img src={require("../../../assets/images/popup/user.jpg")} />
          </div>
          <h3 className="name_head">{userName}</h3>
          <span className="des_head"></span>
          <div className="bb"></div>
          <p className="activity_head">LAST ACTIVE ON : 09:53 am</p>
          <div className="screen_input">
            <Input
              name="password"
              type="password"
              placeholder="Enter Password"
              className="inputForm"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div>
            <Button
              size="lg"
              type="secondary"
              onClick={onLogout}
            // disabled={logoutDisable}
            >
              LOG OUT
              {/* {logoutDisable && (
                <Spin spinning={true} colorCode={"#ffffff"} str={"left"}></Spin>
              )} */}
            </Button>{" "}
            &nbsp;
            <Button size="lg" onClick={handleSubmit}>
              CONTINUE
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default createForm()(LogoutUI);
