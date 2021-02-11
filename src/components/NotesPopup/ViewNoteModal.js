import React, { Component, useState } from "react";
import { Dialog } from "../common";

import Modal from "../common/Popup";
import ViewNotesPopup from "./View";

const ViewNoteModal = (props) => {
  return (
    <Dialog
      {...props}
      onCancel={
        () => props.onClose()
        // props.onCancel(notesData.length, props.addData.subCategory)
      }
      customChildren={true}
      footer={false}
      className="logout_popup add_notes_warp view_notes_wrap"
    >
      <div
        className="popup-content-log"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <h3 className="name_head">
          {props.modalTitle || "View Note"}
         
        </h3>
        <ViewNotesPopup {...props} />
      </div>
    </Dialog>
  );
};

export default ViewNoteModal;
