import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createForm } from "rc-form";
import { Button, Select, Option } from "../../../components/common/index";

const _ = require("lodash");

const InActivityForm = (props) => {
  const { authUser, form, onInActivityTime } = props;
  const timeArray = _.range(1, 31);
  const { getFieldDecorator, setFieldsValue, validateFields } = form;

  useEffect(() => {
    if (authUser) {
      setFieldsValue(authUser);
    }
  }, [authUser]);

  const handleInActivityTime = () => {
    validateFields((error, value) => {
      if (!error) {
        onInActivityTime(value);
      }
    });
  };

  return (
    <>
      <div className="form_row" style={{ marginTop: "2%" }}>
        <div className="form_group col-3 required">
          {getFieldDecorator("inActiveTime")(
            <Select
              name="inActiveTime"
              className="inputForm select"
              placeholder="Inactivity Timeout"
            >
              {timeArray &&
                timeArray.map((time) => {
                  return (
                    <>
                      <Option value={time}>{`${time} mins`}</Option>{" "}
                    </>
                  );
                })}
            </Select>
          )}
          <p> Please enter timeout between 1 & 30 (mins)</p>
        </div>
        <div className="form_group col-3">
          <Button type="primary" onClick={handleInActivityTime} size="lg">
            Save
          </Button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return { authUser };
};

export default connect(mapStateToProps)(createForm()(InActivityForm));
