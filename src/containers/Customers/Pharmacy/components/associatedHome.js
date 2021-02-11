import React from "react";
import Modal from "../../../../components/common/Popup/index";
import _ from "lodash";
import Table from "../../../../components/common/Table/index";
function AssociatedHomeListModal(props) {
  const { visible, onCancel, data } = props;
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "emails",
      render: (text) => {
        return <p>{text && text.length > 0 ? text[0].email : ""}</p>;
      },
    },
    {
      title: "Unique Number",
      dataIndex: "uniqueNo",
    },
    {
      title: "Active",
      dataIndex: "isActive",
      render: (text) => {
        return text ? <p>Yes</p> : <p>No</p>;
      },
    },
  ];

  return (
    <>
      <Modal
        visible={visible}
        onCancel={onCancel}
        title={`Associated Home List`}
        onClose={onCancel}
        maskClosable={false}
        onOk={onCancel}
        style={{ width: "60%" }}
        footer={false}
        // className="user-detail-view"
      >
        <div className="pmr_wrap">
          <div className="container">
            <Table datasource={data} columns={columns} pagination={false} />
          </div>
        </div>
      </Modal>
    </>
  );
}
export default AssociatedHomeListModal;
