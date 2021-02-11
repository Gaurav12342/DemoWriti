import React from "react";
import Modal from "../../../components/common/Popup/index";
import Table from "../../../components/common/Table/index";
import _ from "lodash";
import { displayDateTime } from "../../../util/moment";
function LoginHistory(props) {
  const { visible, onCancel, data } = props;
  let columns = [
    {
      title: "IP",
      dataIndex: "ip",
      render: (text) => <>{text ? text : ""}</>,
    },
    {
      title: "City",
      dataIndex: "address",
      render: (text) => <>{text ? text.city : ""}</>,
    },
    {
      title: "Country",
      dataIndex: "address",
      render: (text) => <>{text ? text.country : ""}</>,
    },
    {
      title: "Region",
      dataIndex: "address",
      render: (text) => <>{text ? text.region : ""}</>,
    },
    {
      title: "Time",
      dataIndex: "time",
      render: (text) => <>{text ? displayDateTime(text) : ""}</>,
    },
  ];
  return (
    <>
      <Modal
        visible={visible}
        onCancel={onCancel}
        title={`Login History`}
        onClose={onCancel}
        maskClosable={false}
        onOk={onCancel}
        style={{ width: "50%" }}
        footer={false}
      >
        <>
          <Table
            datasource={data}
            columns={columns}
            pagination={false}
            
          />
        </>
      </Modal>
    </>
  );
}
export default LoginHistory;
