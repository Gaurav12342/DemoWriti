import React from "react";
import Modal from "../../../components/common/Popup/index";
import Table from "../../../components/common/Table/index";
import _ from "lodash";
function HomeList(props) {
  const { visible, onCancel, data } = props;
 
  return (
    <>
      <Modal
        visible={visible}
        onCancel={onCancel}
        title={`Assigned Home List`}
        onClose={onCancel}
        maskClosable={false}
        onOk={onCancel}
        style={{ width: "50%" }}
        footer={false}
        // className="user-detail-view"
      >
          <ul>
        {_.map(data, (d) => {
          return (
            <li align="left">
              <p>{d?.name}</p>
            </li>
          );
        })}
        </ul>
      </Modal>
    </>
  );
}
export default HomeList;
