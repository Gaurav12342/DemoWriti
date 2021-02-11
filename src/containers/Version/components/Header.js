import React from "react";
import { Button, RadioGroup } from "../../../components/common/index";
import { VERSION_PLATFORM } from "../../../constants/common";

const Header = (props) => {
  const { onAdd, radioValue, hadleRadioValue, total } = props;
  return (
    <>
      <div className="page_head">
        <h3 style={{ fontSize: "25px", alignItems: "center", width: "30%" }}>
          {" "}
          Version{" "}
          <span
            className="r_no"
            style={{ marginTop: "1%", marginLeft: "2%", fontSize: "55%" }}
          >
            {total}
          </span>
        </h3>
        <div className="form_wrap">
          <div className="components radio_grp" style={{ marginRight: "20px" }}>
            <RadioGroup
              options={[
                {
                  style: { color: "red" },
                  label: "Window",
                  id: "Window",
                  value: VERSION_PLATFORM.WINDOWS,
                  checked: radioValue === VERSION_PLATFORM.WINDOWS,
                },
                {
                  label: "Android",
                  id: "Android",
                  value: VERSION_PLATFORM.ANDROID,
                  checked: radioValue === VERSION_PLATFORM.ANDROID,
                },
                {
                  label: "Iphone",
                  id: "Iphone",
                  value: VERSION_PLATFORM.IPHONE,
                  checked: radioValue === VERSION_PLATFORM.IPHONE,
                },
                {
                  label: "Home Backup",
                  id: "Home Backup",
                  value: VERSION_PLATFORM.HOME_BACKUP,
                  checked: radioValue === VERSION_PLATFORM.HOME_BACKUP,
                },
                {
                  label: "Print Exe",
                  id: "Print Exe",
                  value: VERSION_PLATFORM.PRINT_EXE,
                  checked: radioValue === VERSION_PLATFORM.PRINT_EXE,
                },
              ]}
              name="version"
              onChange={hadleRadioValue}
              value={radioValue}
            />
          </div>
          <div className="components" style={{marginTop : '3px'}}>
            <Button type="primary" size="lg" onClick={onAdd}>
              Add
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
