import { da, te } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { ConfirmPopup, Toast } from "../../../../components/common";
import Table from "../../../../components/common/Table/index";

import axios from "../../../../services/api/config";
import { getAllNotes, updateNote } from "../../../../services/api/routes/notes";
import { userPaginate } from "../../../../services/api/routes/user";
import { USER_TYPE } from "./../../../../constants/User";
import { displayDateTime } from "../../../../util/moment";
import { getUserNameWithDesignation } from "../../../../util/common";
import _, { filter } from "lodash";
import { priority } from "./../../../../constants/notes";
import { Edit, Info } from "../../../../assets/images/popup";
import { DelNotes } from "../../../../assets/images/resident-detail";
import EditModal from "./Components/Editmodel";
import Header from "./Components/Header";
import moment from "moment";
import ViewNotesPopup from "../../../../components/NotesPopup/View";
import ViewNoteModal from "../../../../components/NotesPopup/ViewNoteModal";

const NoteTab = (props) => {
  const { isTabActive, authUser, resident } = props;
  const [apiFilter, setApiFilter] = useState({
    page: 1,
    limit: 10,
    populate: [
      {
        prescriptionOrderId: ["orderNumber"],
      },
      {
        prescriptionMedicationId: ["uniqueNumber"],
      },
      {
        pmrId: ["pmrId"],
      },
      {
        addedBy: [
          "mergeLFName",
          "type",
          {
            "assignedCustomer": [
              "isActive",
              "homeId",
              {
                "designationId": [
                  "name",
                  "code",
                  "parentId"
                ]
              }
            ]
          }
        ],
      },
      {
        pmrOrderId: ["orderNumber"],
      },
      {
        xrayId: ["orderNumber"],
      },
      {
        residentDocumentId: ["residentDocId"],
      },
      {
        virtualVisitId: ["_id"],
      },
      {
        noteType: ["name"],
      },
      {
        "history.noteType": ["name"],
      },
      {
        "history.addedBy": [],
      },
    ],
    find: {
      residentId: resident.currentResidentId,
      isDeleted: false,
    },
  });
  const [userListForFilter, setUserListForFilter] = useState([]);
  const [userListForFilterLoading, setUserListForFilterLoading] = useState(
    false
  );

  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [showConfirmMessage, setShowConfirmMessage] = useState(false);
  const [idForRecordToDelete, setIdForRecordToDelete] = useState(false);
  const [isEditVisible, setIsEditVisible] = useState(false);
  const [noteRecordForEdit, setNoteRecordForEdit] = useState({});
  const [updateButtonLoading, setUpdateButtonLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(true);
  const [detailViewVisible, setDetailViewVisible] = useState(false);
  const [detailViewRecord, setDetailViewRecord] = useState({});
  useEffect(() => {
    if (isTabActive) {
      fetch();
    }
  }, [isTabActive, apiFilter]);

  useEffect(() => {
    if (isTabActive) {
      setUserListForFilterLoading(true);
      let userFilter = {
        fields: ["mergeLFName"],
        find: {
          type: [USER_TYPE.HOME.NURSE, USER_TYPE.HOME.PHYSICIAN],
        },
      };
      axios({ ...userPaginate, data: { query: userFilter } })
        .then((data) => {
          if (data.data.code === "OK") {
            setUserListForFilter(data.data.data.list);
          } else {
            Toast.error(data.data.message);
          }
          setUserListForFilterLoading(false);
        })
        .catch((error) => {
          setUserListForFilterLoading(false);
        });
    }
  }, [isTabActive]);

  const fetch = () => {
    setTableLoading(true);
    axios({ ...getAllNotes, data: { query: apiFilter } })
      .then((data) => {
        if (data.data.code === "OK") {
          _.map(data.data.data.data, (record) => {
            if (record.prescriptionOrderId) {
              record.recordName = `Prescription Order ${record.prescriptionOrderId.orderNumber}`;
              return;
            } else if (record.residentDocumentId) {
              record.recordName = `Resident Document ${record.residentDocumentId.residentDocId}`;
              return;
            } else if (record.pmrId) {
              record.recordName = `Pmr ${record.pmrId.pmrId}`;
              return;
            } else if (record.xrayId) {
              record.recordName = `Xray ${record.xrayId.orderNumber}`;
              return;
            } else if (record.prescriptionMedicationId) {
              record.recordName = `Prescription-Medication  ${record.prescriptionMedicationId.uniqueNumber}`;
              return;
            } else if (record.pmrOrderId) {
              record.recordName = `Pmr Order ${record.pmrOrderId.orderNumber}`;
              return;
            } else if (record.virtualVisitId) {
              record.recordName = `Virtual Visit `;
              return;
            }
          });
          setCount(data.data.data.count);
          setData(data.data.data.data);
          console.log("🚀 ~ file: index.js ~ line 144 ~ .then ~ data.data.data.data", data.data.data.data)
          // _.includes(data.data.data.data,(x)=>{x.isActive=true})
        }
        setTableLoading(false);
      })
      .catch((error) => {
        setTableLoading(false);
      });
  };

  const onShowSizeChange = (size) => {
    if (size) {
      setApiFilter((prevFilter) => ({ ...prevFilter, limit: size, page: 1 }));
    }
  };
  const handleDeleteNoteButtonClick = (record) => {
    setIdForRecordToDelete(record._id);
    setShowConfirmMessage(true);
  };

  const handleEditNoteButtonClick = (record) => {
    setNoteRecordForEdit(record);
    setIsEditVisible(true);
  };

  const handleNoteEditClose = () => {
    setIsEditVisible(false);
  };

  const handleNoteUpdate = (id, data) => {
    setUpdateButtonLoading(true);
    const { method, url, baseURL } = updateNote;
    axios({
      method,
      url: `${url}/${id}`,
      baseURL,
      data,
    })
      .then((data) => {
        if (data.data.code === "OK") {
          fetch();
          Toast.success(data.data.message);
        } else {
          Toast.error(data.data.message);
        }
        setUpdateButtonLoading(false);
        handleNoteEditClose();
      })
      .catch((error) => {
        setUpdateButtonLoading(false);
        handleNoteEditClose();
        Toast.error(error);
      });
  };

  const handleDeleteNote = () => {
    const { method, url, baseURL } = updateNote;

    axios({
      method,
      url: `${url}/${idForRecordToDelete}`,
      baseURL,
      data: {
        isDeleted: true,
      },
    })
      .then((data) => {
        if (data.data.code === "OK") {
          fetch();
          Toast.success(data.data.message);
        } else {
          Toast.error(data.data.message);
        }
      })
      .catch((error) => {
        Toast.error(error);
      });
  };

  const handleTableChange = (pagination) => {
    if (!pagination) return;
    let tempFilter = apiFilter;
    tempFilter = {
      ...tempFilter,
      page: pagination.current,
      limit: pagination.pageSize,
    };
    setApiFilter(tempFilter);
  };

  const handleDateFilter = (filterDate) => {
    let tempFilter = { ...apiFilter };
    if (filterDate) {
      tempFilter = {
        ...tempFilter,
        gte: [{ createdAt: moment(filterDate).startOf("day") }],
        lte: [{ createdAt: moment(filterDate).endOf("day") }],
      };
    } else {
      tempFilter = _.omit(tempFilter, ["lte", "gte"]);
    }
    setApiFilter(tempFilter);
  };

  const handleNoteTypeChangeFilter = (noteType) => {
    let tempFilter = { ...apiFilter };
    if (noteType) {
      tempFilter.find = {
        ...tempFilter.find,
        noteType: noteType,
      };
    } else {
      tempFilter.find = _.omit(tempFilter.find, "noteType");
    }
    setApiFilter(tempFilter);
  };

  const handleNotePriorityFilter = (priority) => {
    let tempFilter = { ...apiFilter };
    if (priority) {
      tempFilter.find = {
        ...tempFilter.find,
        priority: priority,
      };
    } else {
      tempFilter.find = _.omit(tempFilter.find, "priority");
    }
    setApiFilter(tempFilter);
  };

  const handleAddedByFilter = (addedBy) => {
    let tempFilter = { ...apiFilter };
    if (addedBy) {
      tempFilter.find = {
        ...tempFilter.find,
        addedBy: addedBy,
      };
    } else {
      tempFilter.find = _.omit(tempFilter.find, "addedBy");
    }
    setApiFilter(tempFilter);
  };

  const handleTypeOfDocFilter = (type) => {
    let tempFilter = { ...apiFilter };
    if (type) {
      tempFilter.ne = [{ [type]: null }];
    } else {
      tempFilter = _.omit(tempFilter, "ne");
    }
    setApiFilter(tempFilter);
  };

  const handleNoteViewModal = (record, action) => {
    console.log(
      "🚀 ~ file: index.js ~ line 266 ~ handleNoteViewModal ~ record",
      record,
      action
    );
    setDetailViewRecord(record);
    setDetailViewVisible(action);
  };
  const columns = [
    {
      title: "Sr.No",
      keyword: "index",
      dataIndex: "index",
      render: (text, record, index) => <div style={record?.isAlert == true ? { color: 'red' } : null}>{(apiFilter.page - 1) * apiFilter.limit + (index + 1)}</div>,
    },
    {
      title: "Associated Document",
      dataIndex: "recordName",
      // render: (text, record) => {
      //   if (record.prescriptionOrderId) {
      //     return (
      //       <>
      //         {"Prescription Order "}
      //         {record.prescriptionOrderId.orderNumber}
      //       </>
      //     );
      //   } else if (record.residentDocumentId) {
      //     return (
      //       <>
      //         {"Resident Document "}
      //         {record.residentDocumentId.residentDocId}
      //       </>
      //     );
      //   } else if (record.pmrId) {
      //     return (
      //       <>
      //         {"Pmr "}
      //         {record.pmrId.pmrId}
      //       </>
      //     );
      //   } else if (record.xrayId) {
      //     return (
      //       <>
      //         {"Xray "}
      //         {record.xrayId.orderNumber}
      //       </>
      //     );
      //   } else if (record.prescriptionMedicationId) {
      //     return (
      //       <>
      //         {"Prescription-Medication "}
      //         {record.prescriptionMedicationId.uniqueNumber}
      //       </>
      //     );
      //   } else if (record.pmrOrderId) {
      //     return (
      //       <>
      //         {"PmrOrder "}
      //         {record.pmrOrderId.orderNumber}
      //       </>
      //     );
      //   } else if (record.virtualVisitId) {
      //     return <>{"Virtual Visit "}</>;
      //   }
      // },
    },
    {
      title: "Added By",
      dataIndex: "addedBy",
      render: (text, record) => <div style={record?.isAlert == true ? { color: 'red' } : null}>{text ? getUserNameWithDesignation(text) : '-'}</div>,
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => <div style={record?.isAlert == true ? { color: 'red' } : null}> {text ? displayDateTime(text) : ""}</div>,
    },
    {
      title: "Note",
      dataIndex: "note",
      render: (text, record) => <div style={record?.isAlert == true ? { color: 'red' } : null}>{text ? text : ""} </div>,
    },
    {
      title: "Note Type",
      dataIndex: "noteType",
      render: (text, record) => <div style={record?.isAlert == true ? { color: 'red' } : null}>{text ? text.name : ""}</div>,
    },

    // {
    //   title: "Priority",
    //   dataIndex: "priority",
    //   render: (text, record) => (
    //     <>{text ? _.invert(priority)[parseInt(text)] : ""}</>
    //   ),
    // },
    {
      title: "Actions",
      // dataIndex: "priority",
      showRefresh: true,

      render: (text, record) => (
        // authUser._id === record.addedBy?._id ?
        <div className="actions">
          <a onClick={() => handleEditNoteButtonClick(record)}>
            <Edit />
            <p>Edit</p>
          </a>
          <a onClick={() => handleDeleteNoteButtonClick(record)}>
            <DelNotes />
            <p>Delete Note</p>
          </a>
          <a onClick={() => handleNoteViewModal(record, true)}>
            <Info />
            <p>View</p>
          </a>
        </div>
        // : ""
      ),
    },
  ];
  return (
    <>
      <Header
        handleDateFilter={handleDateFilter}
        handleNoteTypeChangeFilter={handleNoteTypeChangeFilter}
        handleNotePriorityFilter={handleNotePriorityFilter}
        userListForFilter={userListForFilter}
        handleAddedByFilter={handleAddedByFilter}
        handleTypeOfDocFilter={handleTypeOfDocFilter}
        userListForFilterLoading={userListForFilterLoading}
      />
      {showConfirmMessage && (
        <ConfirmPopup
          title={"Are you sure you want to delete this note?"}
          okText="Yes"
          visible={showConfirmMessage}
          onCancel={() => {
            setShowConfirmMessage(false);
          }}
          onOk={() => {
            setShowConfirmMessage(false);
            handleDeleteNote();
          }}
        />
      )}
      <Table
        // loading={true}
        columns={columns}
        datasource={data}
        loading={tableLoading}
        pagination={{
          current: apiFilter.page,
          pageSize: apiFilter.limit,
          total: count,
          showSizeChanger: true,
          onShowSizeChange: onShowSizeChange,
        }}
        onChange={handleTableChange}
      />
      {isEditVisible && (
        <EditModal
          visible={isEditVisible}
          isEdit={true}
          detail={noteRecordForEdit}
          onCancel={handleNoteEditClose}
          handleUpdate={handleNoteUpdate}
          updateButtonLoading={updateButtonLoading}
        />
      )}
      {detailViewVisible && (
        <ViewNoteModal
          xRayNumber={detailViewRecord.recordName}
          detail={detailViewRecord}
          visible={detailViewVisible}
          isOnlyView={true}
          // notesType={}
          footer={null}
          onClose={() => {
            setDetailViewVisible(false);
          }}
        />
      )}
    </>
  );
};
const mapStateToProps = (props) => {
  const { auth, resident } = props;
  return { authUser: auth.authUser, resident };
};
export default connect(mapStateToProps)(withRouter(NoteTab));
