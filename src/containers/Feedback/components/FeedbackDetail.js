
// import Modal from "../../../src/components/common/Popup/index";
import React, { useEffect, useState } from "react";
import Modal from "../../../components/common/Popup/index";

const FeedbackDetail = (props) => {
    const { title, visible, data, onClose, maskClosable } = props;
    console.log("🚀 ~ file: FeedbackDetail.js ~ line 8 ~ FeedbackDetail ~ feedbackDetailVisible", title)

    return (
        <>
            <Modal
                // form={form}
                visible={visible}
                title={title}
                onClose={onClose}
                onCancel={onClose}
                maskClosable={maskClosable}
                isClose={true}
                cancelText={"OK"}
                // onOk={handleFeedbackSubmit}
                style={{ width: "50%" }}

            >
                <div  className="word-wrap-align">
                    {data}
                </div>
            </Modal>


        </>
    )
}
export default FeedbackDetail   