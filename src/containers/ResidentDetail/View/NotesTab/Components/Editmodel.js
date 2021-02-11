import React, { useState, useEffect } from "react";
import { createForm } from "rc-form";
import Dialog from "../../../../../components/common/Popup/index";
import { Plus, Info } from "../../../../../../src/assets/images/popup/index";
import Button from "../../../../../components/common/Button";
import Select from "../../../../../components/common/Select";
import TextArea from "../../../../../components/common/TextArea";
import Reminder from "../../../../../components/common/Reminder";
import { displayDateTime } from "../../../../../util/moment";
import { getUserNameWithDesignation } from "../../../../../util/common";
import { priority as masterPriority } from "../../../../../constants/notes";
import SubmasterFilter from "../../../../../components/SubmasterFilter";

const EditModal = (props) => {
  const {
    isEdit,
    form,
    onCancel,
    noteTypes,
    detail = {},
    handleUpdate,
    updateButtonLoading,
  } = props;

  //   const noteTypeOptions = noteTypes.map((n) => ({
  //     ...n,
  //     key: n._id,
  //     label: n.name,
  //     id: n._id,
  //     value: n._id,
  //   }));
  const [reminder, setReminder] = useState(false);
  const [note, setNote] = useState(detail.note);
  const [priority, setPriority] = useState(detail.priority);
  const { getFieldDecorator, getFieldValue } = form;
  const [isPublic, setIsPublic] = useState(detail.isPublic);
  const [isActive, setIsActive] = useState(detail.isActive);
  const [noteType, setNoteType] = useState(detail.noteType);

  useEffect(() => {
    setPriority(detail.priority || 1);
    setNote(detail.note);
    setIsPublic(detail.isPublic);
    setIsActive(detail.isActive);
    if (detail.noteType) setNoteType(detail.noteType._id);
  }, [detail]);

  const handleOk = async () => {
    handleUpdate(detail._id, { noteType, priority, note, isActive, isPublic });
  };

  const handleReminder = (visible) => {
    setReminder(visible);
  };
  const handleNoteTypeChange = (record) => {

    setNoteType(record);
  };
  return (
    <Dialog
      {...props}
      footer={false}
      customChildren={true}
      className="logout_popup add_notes_warp"
    >
      <div className="popup-content-log">
        <h3 className="name_head">Edit Note</h3>
        <div className="bb"></div>
        {!!isEdit && (
          <div className="ptrik-notes">
            <span>
              Created By :{" "}
              {detail.addedBy && getUserNameWithDesignation(detail.addedBy)}
            </span>
            <span>
              Created At :{" "}
              {detail.createdAt && displayDateTime(detail.createdAt)}
            </span>
          </div>
        )}

        <div className="ptrik-notes">
          <span>
            Note Type :{" "}
            <SubmasterFilter
              onChange={handleNoteTypeChange}
              defaultValue={noteType}
              code="NOTE_TYPE"
              allowClear = {false}
            />
          </span>
        </div>

        <div className="d-flex j-space-between">
          <div className="alert-box">
            <span>Priority</span>
            <div className="filter_value d-flex">
              <label htmlFor="low" className="filter_check">
                <input
                  type="checkbox"
                  name="priority"
                  id="low"
                  value={masterPriority.LOW}
                  checked={priority === masterPriority.LOW}
                  onChange={(e) => setPriority(masterPriority.LOW)}
                />
                <span className="checkbox"></span>
                <span className="lbl">Low</span>
              </label>
              <label htmlFor="medium" className="filter_check">
                <input
                  type="checkbox"
                  name="priority"
                  id="medium"
                  value={masterPriority.MEDIUM}
                  checked={priority === masterPriority.MEDIUM}
                  onChange={(e) => setPriority(masterPriority.MEDIUM)}
                />
                <span className="checkbox"></span>
                <span className="lbl">Medium</span>
              </label>
              <label htmlFor="high" className="filter_check">
                <input
                  type="checkbox"
                  name="priority"
                  id="high"
                  value={masterPriority.HIGH}
                  checked={priority === masterPriority.HIGH}
                  onChange={(e) => setPriority(masterPriority.HIGH)}
                />
                <span className="checkbox"></span>
                <span className="lbl">High</span>
              </label>
            </div>
          </div>
        </div>

        <div className="d-flex j-space-between" style={{marginTop:"10px"}}>
          <div className="alert-box">
            <span>Is Public</span>
            <div className="filter_value d-flex">
              <label htmlFor="yes" className="filter_check">
                <input
                  type="checkbox"
                  name="isPublic"
                  id="yes"
                  value={true}
                  checked={isPublic}
                  onChange={(e) => setIsPublic(true)}
                />
                <span className="checkbox"></span>
                <span className="lbl">Yes</span>
              </label>
              <label htmlFor="no" className="filter_check">
                <input
                  type="checkbox"
                  name="isPublic"
                  id="no"
                  value={false}
                  checked={!isPublic}
                  onChange={(e) => setIsPublic(false)}
                />
                <span className="checkbox"></span>
                <span className="lbl">No</span>
              </label>
            </div>
          </div>
        </div>

        <div className="d-flex j-space-between" style={{marginTop:"10px"}}>
          <div className="alert-box">
            <span>Is Active</span>
            <div className="filter_value d-flex">
              <label htmlFor="yesActive" className="filter_check">
                <input
                  type="checkbox"
                  name="isActive"
                  id="yesActive"
                  value={true}
                  checked={isActive}
                  onChange={(e) => setIsActive(true)}
                />
                <span className="checkbox"></span>
                <span className="lbl">Yes</span>
              </label>
              <label htmlFor="noActive" className="filter_check">
                <input
                  type="checkbox"
                  name="isActive"
                  id="noActive"
                  value={false}
                  checked={!isActive}
                  onChange={(e) => setIsActive(false)}
                />
                <span className="checkbox"></span>
                <span className="lbl">No</span>
              </label>
            </div>
          </div>
        </div>

        <div className="additional-textarea">
          <TextArea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add Note"
          ></TextArea>
        </div>

        {/* <div className="d-flex bottom-doc">
          <Info />
          <span className="">Associated with Document </span>
          <span className="color-green">{xRayNumber}</span>
          <MathPlus onClick={handleDoc} />
        </div> */}

        <div className="d-flex reminder-part j-space-between">
          <div className="d-flex j-space-between">
            {/* <div className="plus-icon">
                        <div className="d-flex mr-20">
                            <p className="green-bg-plus" onClick={() => handleReminder(true)}>
                                <Plus />
                            </p>
                            <span className="green-text">Set Reminder</span>
                        </div>
                    </div> */}
          </div>
          <div className="d-flex-end f-end">
            <Button
              className="prev-screen-btn gray-btn sh-btn"
              onClick={onCancel}
            >
              CANCEL
            </Button>
            <Button
              className="prev-screen-btn sh-btn"
              onClick={handleOk}
              loading={updateButtonLoading}
            >
              {"UPDATE"}
            </Button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default createForm()(EditModal);
