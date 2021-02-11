
// import Modal from "../../../src/components/common/Popup/index";
import React, { useEffect, useState } from "react";
import { TextArea } from "../../../components/common";
import Modal from "../../../components/common/Popup/index";

const UpsertForm = (props) => {
    const { form,title, visible, onCancel, onClose, maskClosable,okButtonProps, okText, cancelText ,handleFeedbackSubmit } = props;
    const {getFieldDecorator} = form;
    return (
        <>
            <Modal
                form={form}
                visible={visible}
                title={title}
                onCancel={onCancel}
                onClose={onClose}
                maskClosable={maskClosable}
                onOk={handleFeedbackSubmit}
                style={{ width: "50%" }}
                okText={okText}
                cancelText={cancelText}
                okButtonProps={okButtonProps}
            >
                <div className="form_row" style={{ marginTop: "2%" }}>
                    <div className="form_group col-12">
                        <label>
                            Create suggestion<span>*</span>
                        </label>
                        <div className="additional-textarea">
                            <div className="form_wrap mb-10">
                                {getFieldDecorator("message", {
                                    rules: [
                                        {
                                            required: false,
                                            message: "Please fill the feedback.!",
                                        },
                                    ],
                                })(<TextArea name="message" />)}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>


        </>
    )
}
export default UpsertForm   