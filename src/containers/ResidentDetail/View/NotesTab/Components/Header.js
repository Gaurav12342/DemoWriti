import React, { useState } from "react";
import {
  DatePicker,
  DateTimePicker,
  Option,
  Select,
} from "../../../../../components/common";
import SubmasterFilter from "../../../../../components/SubmasterFilter";
import { priority } from "./../../../../../constants/notes";

const Header = (props) => {
  const {
    handleDateFilter,
    handleNoteTypeChangeFilter,
    handleNotePriorityFilter,
    userListForFilter,
    handleAddedByFilter,
    handleTypeOfDocFilter,
    userListForFilterLoading,
  } = props;

  const TYPE_OF_DOCUMENT = {
    prescriptionOrderId: "PrescriptionOrder",
    prescriptionMedicationId: "PrescriptionMedication",
    pmrId: "Pmr",
    pmrOrderId: "PmrOrder",
    xrayId: "Xray",
    residentDocumentId: "ResidentDocument",
    virtualVisitId: "VirtualVisit",
  };

  return (
    <>
      <div style={{ display: "flex", margin: "10px" }}>
        <div
          style={{ width: "15%", marginLeft: "10px" }}
          className="form_group"
        >
          <DateTimePicker onChange={handleDateFilter} />
        </div>
        <div style={{ marginLeft: "10px" }}>
          <SubmasterFilter
            onChange={handleNoteTypeChangeFilter}
            code="NOTE_TYPE"
          />
        </div>
        <div style={{ marginLeft: "10px" }}>
          <Select
            showSearch
            allowClear={true}
            mode={"single"}
            placeholder={"Priority"}
            // value={value || undefined}
            style={{ width: 200 || "-webkit-fill-available" }}
            onChange={handleNotePriorityFilter}
          >
            {Object.keys(priority).map((k) => {
              return (
                <Option key={priority[k]} value={priority[k]}>
                  {k}
                </Option>
              );
            })}
          </Select>
        </div>

        <div style={{ marginLeft: "10px" }}>
          <Select
            loading={userListForFilterLoading}
            showSearch
            allowClear={true}
            mode={"single"}
            placeholder={"Added By"}
            // value={value || undefined}
            style={{ width: 200 || "-webkit-fill-available" }}
            onChange={handleAddedByFilter}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {userListForFilter.map((k) => {
              return (
                <Option key={k?._id} value={k?._id}>
                  {k?.mergeLFName}
                </Option>
              );
            })}
          </Select>
        </div>

        <div style={{ marginLeft: "10px" }}>
          <Select
            showSearch
            allowClear={true}
            mode={"single"}
            placeholder={"Type Of Document"}
            // value={value || undefined}
            style={{ width: 200 || "-webkit-fill-available" }}
            onChange={handleTypeOfDocFilter}
          >
            {Object.keys(TYPE_OF_DOCUMENT).map((k) => {
              return (
                <Option key={k} value={k}>
                  {TYPE_OF_DOCUMENT[k]}
                </Option>
              );
            })}
          </Select>
        </div>
      </div>
    </>
  );
};

export default Header;
