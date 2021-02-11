import React, { useState } from "react";
import CommonService from "../../../services/api/services/common";
import { Button, Toast } from "../../../components/common";
import Confirm from "../../../components/common/Popup/ConfirmPopup";

const HardUpdate = (props) => {
  const { record, documentId, model, onHardUpdate, API, isHardUpdate } = props;
  const [confirm, setConfirm] = useState(false);
  const [loader, setLoader] = useState(false);
  const [isActive, setIsActive] = useState(props.isActive);
  const [confirmText, setConfirmText] = useState("");
  let checkActive = record.isHardUpdate && record.isHardUpdate === true;

  const handleConfirmation = () => {
    const status = checkActive ? "Soft Update" : "Hard Update";
    const name = record
      ? record.name
        ? record.name
        : record.mergeLFName
        ? record.mergeLFName
        : ""
      : "";
    setConfirmText(`Are you sure, you want to ${status} ${name} ?`);
    setConfirm(true);
  };

  const handleOk = async () => {
    setLoader(true);
    let { method, url, baseURL } = API;
    url = `${url}/${documentId}`;
    let data = {
      id: documentId,
      model: model,
      fieldName: "isHardUpdate",
      isHardUpdate: !isHardUpdate,
    };
    let newValue = isActive;
    let response = await CommonService({ method, url, data, baseURL });
    if (response) {
      if (response.code === "OK") {
        newValue = !isHardUpdate;
        let record = { ...props.record };
        record.isHardUpdate = !record.isHardUpdate;
        onHardUpdate(record);
        setConfirm(false);
        Toast.success(response.message);
      } else {
        Toast.error(response.message);
      }
    }
    setLoader(false);
    setIsActive(newValue);
  };

  return (
    <>
      <Button
        type={checkActive ? "primary" : "danger"}
        size="xs"
        onClick={handleConfirmation}
        loading={loader}
      >
        {checkActive ? "Hard Update" : "Soft Update"}
      </Button>
      {confirm && (
        <Confirm
          style={{ width: "400px" }}
          visible={confirm}
          onOk={handleOk}
          onCancel={() => setConfirm(false)}
        >
          <p>{confirmText}</p>
        </Confirm>
      )}
    </>
  );
};

export default HardUpdate;
