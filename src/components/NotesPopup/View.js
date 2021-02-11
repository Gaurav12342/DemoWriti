import React, { Component, useState } from "react";
import Dialog from "../common/Popup";
import { Conversation, AddNotes, Edit } from "../../../src/assets/images/popup";
import { DeleteNote, NoteUpsert } from "./index";
import { getUserNameWithDesignation } from "../../util/common";
import { displayCustomDateFormat, displayDateTime } from "../../util/moment";
import { invert } from "lodash";
import { priority } from "../../constants/notes";
import { useSelector } from "react-redux";
import _ from "lodash";

const ViewNote = (props) => {
  const { detail, noteTypes ,isHistory} = props;
  // let foundNoteType =
  //   detail?.noteType && noteTypes.find((n) => n._id == detail.noteType);
  return (
    <>
      <div className="d-flex ptrik-notes" >
        <span className={isHistory? " line-through":""}>
          Created By :{" "}
          {detail.addedBy && Object.keys(detail.addedBy).length
            ? getUserNameWithDesignation(detail.addedBy)
            : "-"}
        </span>
        <span className={isHistory? " line-through":""}>
          Created At :{" "}
          {detail.createdAt && Object.keys(detail.createdAt).length
            ? displayDateTime(detail.createdAt)
            : "-"}
        </span>
        {detail.isAlert ? <span className="alert-tag">Alert</span> : null}
        {isHistory ? <span className="pink-tag">Edited</span> : null}

      </div>

      <div className="d-flex mb-20">
        {/* <div className='pr-lock'>
              <span className='mdm-text'>Priority</span>
              <span className='hight-text'>
                {invert(priority)[detail.priority || 1]}
              </span>
            </div> */}
       {!isHistory &&  <div className="pr-lock">
          <span className="mdm-text">Associated Document</span>
          <span className="rx-text">{props.xRayNumber}</span>
        </div>}
        <div className="pr-lock">
          <span  className={isHistory? "mdm-text line-through":"mdm-text"}>Type</span>
          <span  className={isHistory? "ss-text line-through":"ss-text"}>{detail.noteType?.name}</span>
        </div>
      </div>

      <div className="">
        <span  className={isHistory? "ss-text line-through":"ss-text"}>Note</span>
        <p className={isHistory ? "p-desc-text line-through" : "p-desc-text"}>{detail.note || "-"}</p>
      </div>
    </>
  );
};
const ViewNotesPopup = (props) => {
  const { detail, noteTypes = [], index, isOnlyView } = props;
  console.log("🚀 ~ file: View.js ~ line 62 ~ ViewNotesPopup ~ isOnlyView", isOnlyView)
  const authUser = useSelector((state) => state.auth.authUser);

  const [loader, setLoader] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleClarify, setVisibleClarify] = useState(false);
  const handleEdit = (visible) => {
    setVisibleEdit(visible);
  };
  const handleDelete = (visible) => {
    setVisibleDelete(visible);
  };
  const handleClarify = (visible) => {
    setVisibleDelete(visible);
  };

  return (
    <>
      {detail && Object.keys(detail).length > 0 ? (
        <>
          <ViewNote detail={detail} noteTypes={noteTypes} {...props} />
          {_.map(detail.history, (d) => {
            return (
              <>
                <hr />
                <ViewNote detail={d} noteTypes={noteTypes} isHistory={true} />
              </>
            );
          })}
          {isOnlyView && <hr />}
          { isOnlyView ? null : (
            <div className="gray-block">
              <div className="d-flex">
                <span className="mdm-text mr-20">Actions</span>
                <div
                  className="d-flex align-center cursor mr-20"
                  onClick={() => handleEdit(true)}
                >
                  <Edit className="imgwd" />
                  <span className="small-text">Edit Note</span>
                </div>
                {detail?.addedBy?._id === authUser?._id &&
                <div
                  className="d-flex align-center cursor mr-20"
                  onClick={() => handleDelete(true)}
                >
                  <AddNotes className="imgwd" />
                  <span className="small-text">Delete Note</span>
                </div>}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="d-flex ptrik-notes">
            <h3>Data not found</h3>
          </div>
        </>
      )}

      {visibleDelete && (
        <DeleteNote
          visible={visibleDelete}
          detail={detail}
          handleDelete={() => {
            setVisibleDelete(false);
            props.handleDelete();
          }}
          onCancel={() => setVisibleDelete(false)}
        />
      )}
      {visibleEdit && (
        <NoteUpsert
          noteTypes={props.noteTypes}
          visible={visibleEdit}
          isEdit={true}
          detail={detail}
          onCancel={() => handleEdit(false)}
          xRayNumber={props.xRayNumber}
          handleUpdate={(id, data) => {
            setVisibleEdit(false);
            props.handleUpdate(id, data);
          }}
        />
      )}
    </>
  );
};

export default ViewNotesPopup;
