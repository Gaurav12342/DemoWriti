import React, { useState, useEffect } from "react";
import Header from "./components/Header";
// import Table from '../../../../components/common/Table/index';
import axios from "../../../../services/api/config";
import { getRxImage } from "../../../../services/api/services/common";

import { digitalBinderPaginate } from '../../../../services/api/routes/digitalBinder';

import { View, Notes, Reminder } from '../../../../assets/images/pmr/index';
import { Edit, Todo } from '../../../../assets/images/resident-detail/index';
// import ViewNotesModal from './components/ViewNotesModal';
import { MODULE, ACTIONS } from '../../../../constants/subscription';
import { createForm } from 'rc-form';
import { useSelector } from 'react-redux';
import Table from './Table';
import { displayDateTime } from '../../../../util/moment';
import { canPerformAction, getUserNameWithDesignation } from '../../../../util/common';
import { PMR_STATUS } from '../../../../constants/pmr';
import { STATUS as PRESCRIPTION_STATUS, MODIFY_ACTION, TYPE, RX_TYPE } from '../../../../constants/prescription';
import NotesModal from '../../../../components/NotesPopup/List';
import ReminderModal from '../../../../components/ReminderPopup/List';
import { LightBox } from '../../../../components/common';
import { TODO_CATEGORY, SUB_CATEGORY, DEVICE_VIEW } from '../../../../constants/todo';
import moment, { isDate } from 'moment';
import AuthenticateModal from '../../../../components/AuthenticateModal';
import { getTodoRedirectUrl } from '../../../../util/todo'

const _ = require('lodash');

const DATA_TYPE = {
  RESIDENT_DOCUMENT: 1,
  PRESCRIPTION: 2,
  PMR: 3,
};

const lower = (val = "") =>
  (typeof val === "string" && val.toLowerCase()) || val;

const DigitalBinder = ({ form, onEditRx, isTabActive }) => {
  const { authUser, currentResidentId } = useSelector((state) => ({
    authUser: state.auth.authUser,
    currentResidentId: state.resident.currentResidentId,
  }));

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [viewNotesVisible, setViewNotesVisible] = useState(false);
  const [getSpecificDigitalBinder, setSpecificDigitalBinder] = useState("");
  const [notesModal, setNotesModal] = useState(false);
  const [reminderModal, setReminderModal] = useState(false);
  const [reminderFilterOptions, setReminderFilterOptions] = useState({});
  const [notesFilterOptions, setNotesFilterOptions] = useState({});
  const [residentDocId, setResidentDocId] = useState("");
  const [visibleImage, setVisibleImage] = useState(false);
  const [detail, setDetail] = useState(null);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const currentModalData = React.useRef();
  const tableRef = React.useRef();
  const allData = React.useRef([]);
  let redirectUrl = '';

  const [filter, setFilter] = useState({
    query: {},
    RESIDENT_DOCUMENT: {
      populate: [
        {
          masterId: ['name'],
        },
        {
          physicianId: ["mergeLFName",
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
            }],
        },
      ],
    },
    PMR: {
      populate: [
        {
          masterId: ['name'],
        },
        {
          acknowledgedBy: [],
        },
        {
          physicianId: ["mergeLFName",
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
            }],

        },
      ],
    },
    PRESCRIPTION: {
      fields: [],
      populate: [
        {
          masterId: ['name'],
        },
        {
          thirdPartyPrescriptionType: [],

        },
        {
          physicianId: ["mergeLFName",
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
            }],
        },
        { "prescriptionMedication": null, "match": { "isDelete": false } }
      ],
    },
  });

  useEffect(() => {
    if (!isTabActive)
      return
    fetch();
  }, [filter, isTabActive]);

  const handleViewImages = (visible, record) => {
    if (visible && record.DATA_TYPE === DATA_TYPE.PRESCRIPTION) {
      getRxImage([record._id])
        .then((resp) => {
          if (resp?.[0])
            record.attachments = resp[0].attachments;
          record && record.attachments.map((x, i) => {
            x.caption = `${record.orderNumber}-${i + 1}`
            return x
          })

          setDetail(record);
          setVisibleImage(visible);
          // setImgLoader(false)
        })
        .catch((err) => {
          // setImgLoader(true)
        });
    } else {
      setVisibleImage(visible);
      setDetail(record);
    }
  };

  const prepareAttachments = () => {
    let imageViewer = [];
    if (detail && detail.DATA_TYPE == DATA_TYPE.RESIDENT_DOCUMENT) {
      if (detail?.documents?.length > 0) {
        imageViewer = _.map(detail.documents, function (a) {
          a.src = a.path;
          return a;
        });
      }
    } else if (detail && detail.DATA_TYPE == DATA_TYPE.PRESCRIPTION) {
      if (detail?.attachments?.length > 0) {
        imageViewer = _.map(detail.attachments, function (a) {
          a.src = a.path;
          return a;
        });
      }
    } else if (detail && detail.DATA_TYPE == DATA_TYPE.PMR) {
      if (detail?.attachments?.length > 0) {
        imageViewer = _.map(detail.attachments, function (a) {
          a.src = a.path;
          return a;
        });
      }
    }
    return { imageViewer };
  };
  const { imageViewer } = prepareAttachments();





  const columns = React.useMemo(
    () => [
      {
        Header: "Sr. No.",
        Cell: ({ row }) => row.index + 1,
      },
      {
        Header: "Type",
        accessor: "orderNumber",
        Cell: ({ cell: { value }, row: { original } }) => {
          if (original.DATA_TYPE === DATA_TYPE.PRESCRIPTION) {
            return (
              <>
                <p>Rx Order</p>
                <p style={{ color: "#609fae" }}>{value}</p>
              </>
            );
          }
          if (original.DATA_TYPE === DATA_TYPE.RESIDENT_DOCUMENT) {
            return (
              <>
                <p>Resident Document</p>
                <p style={{ color: "#609fae" }}>{original.residentDocId}</p>
              </>
            );
          }
          return "-";
        },
      },
      {
        Header: "Document Type",
        accessor: "masterId.name",
        Cell: ({ cell: { value }, row: { original } }) => <>{value || "-"}</>,
      },
      {
        Header: "Physician",
        accessor: "physicianId.mergeLFName",
        Cell: ({ cell: { value }, row: { original } }) => <>
          {original.physicianId && getUserNameWithDesignation(original.physicianId) || "-"}
        </>
      },
      {
        Header: "Date & Time",
        accessor: "createdAt",
        Cell: ({ cell: { value } }) => (
          <span style={{ textTransform: "capitalize" }}>
            {displayDateTime(value)}
          </span>
        ),
      },
      {
        Header: "Staus",
        accessor: "status",
        Cell: ({ row: { original } }) => {
          const status = original.status;
          if (original.DATA_TYPE === DATA_TYPE.PRESCRIPTION) {
            return <p>{_.invert(PRESCRIPTION_STATUS)[status]}</p>;
          }
          if (original.DATA_TYPE === DATA_TYPE.RESIDENT_DOCUMENT) {
            return <p>-</p>;
          }
          if (original.DATA_TYPE === DATA_TYPE.PMR) {
            return <p>{_.invert(PMR_STATUS)[status]}</p>;
          }
        },
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ cell: { value }, row: { original } }) =>
          (
            redirectUrl = handlePendingTodo(original),
            <>
              <div className="actions">
                <div>
                  {(original.DATA_TYPE === DATA_TYPE.PRESCRIPTION) &&
                    original.rxType === RX_TYPE.PRESCRIPTION &&
                    original.type === TYPE.COE &&
                    (original.physicianId?._id === authUser._id ||
                      original.addedBy === authUser._id) &&
                    (original.status === PRESCRIPTION_STATUS.SUBMITTED ||
                      original.status === PRESCRIPTION_STATUS.DRAFT) &&
                    canPerformAction({
                      moduleId: MODULE.RX_ORDER,
                      actiontoCheck: ACTIONS.EDIT.CODE,
                    }) ? (
                      <div onClick={() => handleEditPresc(true, original)}>
                        <Edit />
                        <p>Edit</p>
                      </div>
                    ) : null}
                </div>
                <div>
                  {(original.DATA_TYPE === DATA_TYPE.PRESCRIPTION ||
                    original.DATA_TYPE === DATA_TYPE.RESIDENT_DOCUMENT) ? (
                      <div
                        onClick={() => {
                          handleViewImages(true, original);
                        }}
                      >
                        <View />
                        <p>View</p>
                      </div>
                    ) : null}
                </div>
                <div
                  onClick={() => {
                    createNotesModal(original);
                  }}
                >
                  <Notes />
                  <p>Notes</p>
                  {original.notesCount ? (
                    <span className="notes tot">{original.notesCount}</span>
                  ) : null}
                </div>
                <div
                  onClick={() => {
                    createReminderModal(original);
                  }}
                >
                  <Reminder />
                  <p>Reminder</p>
                  {original.reminderCount ? (
                    <span className="notes tot">{original.reminderCount}</span>
                  ) : null}
                </div>

                <a target="_blank" href={redirectUrl} style={{ textDecoration: 'none' }}>
                  <div className='ac_count'>
                    <Todo />
                    {original?.pendingTodoCount ?
                      <span className='todo tot read'>{original.pendingTodoCount}</span>
                      : null}
                  </div>
                  <p>To Do</p>
                </a>
              </div>
            </>
          ),
        disableGlobalFilter: true,
        hasRefresh: true,
      },
    ],
    []
  );

  const onShowSizeChange = (size) => {
    if (size) {
      setFilter((prevFilter) => ({ ...prevFilter, limit: size, page: 1 }));
    }
  };

  const fetch = () => {
    setLoading(true);
    let { method, url, baseURL } = digitalBinderPaginate;
    axios({
      method,
      url,
      baseURL,
      data: {
        ...filter,
        ...{
          query: { ...filter.query, find: { residentId: currentResidentId } },
        },
      },
    })
      .then((response) => {
        if (response && response.data.code == "OK") {
          let dataArray = [];
          _.map(response.data.data, (data) => {
            if (data["RESIDENT_DOCUMENT"] && data["RESIDENT_DOCUMENT"].data) {
              dataArray = _.concat(
                dataArray,
                _.map(data["RESIDENT_DOCUMENT"].data, (d) => {
                  d.DATA_TYPE = DATA_TYPE.RESIDENT_DOCUMENT;
                  d.attachments = d.documents;
                  return d;
                })
              );
            }
            if (data["PRESCRIPTION"] && data["PRESCRIPTION"].data) {
              dataArray = _.concat(
                dataArray,
                _.map(data["PRESCRIPTION"].data, (d) => {
                  d.DATA_TYPE = DATA_TYPE.PRESCRIPTION;
                  return d;
                })
              );
            }
            if (data["PMR"] && data["PMR"].data) {
              dataArray = _.concat(
                dataArray,
                _.map(data["PMR"].data, (d) => {
                  d.DATA_TYPE = DATA_TYPE.PMR;
                  return d;
                })
              );
            }
          });
          allData.current = [...dataArray];
          handleFilter("");
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  const handleDateChange = (val) => {
    let newFilter = { ...filter };
    const preFilteredData = [...allData.current];
    const filteredData = preFilteredData.filter((row) => {
      let status = row.status,
        matchedStatus = "";
      if (row.DATA_TYPE === DATA_TYPE.PRESCRIPTION) {
        matchedStatus = _.invert(PRESCRIPTION_STATUS)[status];
      }
      if (row.DATA_TYPE === DATA_TYPE.RESIDENT_DOCUMENT) {
        matchedStatus = "-";
      }
      if (row.DATA_TYPE === DATA_TYPE.PMR) {
        matchedStatus = _.invert(PMR_STATUS)[status];
      }

      const isDateMatch = displayDateTime(row.createdAt).includes(
        lower(val[0])
      );

      return isDateMatch;
    })
    // newFilter = {
    //   ...newFilter,
    //   page: 1,
    //   gte: [{ createdAt: val[0] }],
    //   lte: [{ createdAt: val[1] }],
    // };
    // setFilter(newFilter);
    setData(filteredData);
  };

  const handleFilter = (searchVal = "") => {
    const preFilteredData = [...allData.current];
    if (searchVal.trim() === "") {
      setData(preFilteredData);
      setTotal(preFilteredData.length);
    } else {
      searchVal = searchVal.trim();
      const filteredData = preFilteredData.filter((row) => {
        let status = row.status,
          matchedStatus = "";
        if (row.DATA_TYPE === DATA_TYPE.PRESCRIPTION) {
          matchedStatus = _.invert(PRESCRIPTION_STATUS)[status];
        }
        if (row.DATA_TYPE === DATA_TYPE.RESIDENT_DOCUMENT) {
          matchedStatus = "-";
        }
        if (row.DATA_TYPE === DATA_TYPE.PMR) {
          matchedStatus = _.invert(PMR_STATUS)[status];
        }

        const isResidentDocMatch = lower(row.residentDocId).includes(
          lower(searchVal)
        );
        const isOrderNumberMatch = lower(row.orderNumber).includes(
          lower(searchVal)
        );
        const isPmrMatch = lower(row.pmrId).includes(
          lower(searchVal)
        );


        const isPhysicianMatch = lower(row.physicianId?._id).includes(
          lower(searchVal)
        );
        // const isDateMatch = displayDateTime(row.createdAt).includes(
        //   lower(searchVal[0])
        // );
        const isStatus = lower(matchedStatus).includes(searchVal);

        // const isDateMatch = displayDateTime(row.createdAt).includes(
        //   lower(searchVal)
        // );

        return isResidentDocMatch || isOrderNumberMatch || isPmrMatch || isPhysicianMatch
          // || isPhysicianMatch || isDateMatch || isStatus
          ;
      });
      setData(filteredData);

    }
    setLoading(false);
  };

  const handleViewNoteModalVisible = (record) => {
    setSpecificDigitalBinder(record);
    setViewNotesVisible(true);
  };

  const handleViewNoteModalDisable = () => {
    setViewNotesVisible(false);
  };

  const createNotesModal = (record) => {
    let filterData = {
      residentDocumentId:
        record?.DATA_TYPE == DATA_TYPE.RESIDENT_DOCUMENT
          ? record._id
          : undefined,
      prescriptionOrderId:
        record?.DATA_TYPE == DATA_TYPE.PRESCRIPTION ? record._id : undefined,
      pmrId: record?.DATA_TYPE == DATA_TYPE.PMR ? record._id : undefined,
    };
    let options = {
      query: {
        find: { ...filterData, subCategory: SUB_CATEGORY.NOTES.GENERAL },
        populate: [{ addedBy: [] }],
        // category: TODO_CATEGORY.PRESCRIPTION,
      },
    };
    currentModalData.current = { ...record };
    setNotesFilterOptions(options);
    setNotesModal(true);

    if (currentModalData.current?.DATA_TYPE == DATA_TYPE.RESIDENT_DOCUMENT) {
      setResidentDocId({
        residentDocumentId: currentModalData.current._id,
        category: TODO_CATEGORY.PRESCRIPTION,
        subCategory: SUB_CATEGORY.NOTES.GENERAL,
      });
    } else if (currentModalData.current?.DATA_TYPE == DATA_TYPE.PRESCRIPTION) {
      setResidentDocId({
        prescriptionOrderId: currentModalData.current._id,
        category: TODO_CATEGORY.PRESCRIPTION,
        subCategory: SUB_CATEGORY.NOTES.GENERAL,
      });
    } else if (currentModalData.current?.DATA_TYPE == DATA_TYPE.PMR) {
      setResidentDocId({
        pmrId: currentModalData.current._id,
        category: TODO_CATEGORY.PRESCRIPTION,
        subCategory: SUB_CATEGORY.NOTES.GENERAL,
      });
    }
    // setResidentDocId({ category: TODO_CATEGORY.PRESCRIPTION });
  };

  const visibleNotesModal = (visible, record, str, noteCount) => {
    setNotesModal(visible);
    setNotesFilterOptions({});
    if (noteCount != undefined) {
      setData(oldData => {
        return oldData.map(d => {
          if (d._id === currentModalData.current._id) {
            d['notesCount'] = noteCount;
            return d;
          }
          return d;
        })
      })
    }
    if (!visible && str !== "cancel") {
      fetch();
    }
  };

  const visibleReminderModal = (visible, record, str, reminderCount) => {
    setReminderModal(visible);
    setReminderFilterOptions({});
    if (reminderCount != undefined) {
      setData(oldData => {
        return oldData.map(d => {
          if (d._id === currentModalData.current._id) {
            d['reminderCount'] = reminderCount;
            return d;
          }
          return d;
        })
      })
    }
    if (!visible && str !== "cancel") fetch();
  };

  const createReminderModal = (record) => {
    let filterData = {
      residentDocumentId:
        record?.DATA_TYPE == DATA_TYPE.RESIDENT_DOCUMENT
          ? record._id
          : undefined,
      prescriptionOrderId:
        record?.DATA_TYPE == DATA_TYPE.PRESCRIPTION ? record._id : undefined,
      pmrId: record?.DATA_TYPE == DATA_TYPE.PMR ? record._id : undefined,

      // category:
      //   record?.DATA_TYPE == DATA_TYPE.RESIDENT_DOCUMENT
      //     ? DATA_TYPE.RESIDENT_DOCUMENT
      //     : DATA_TYPE.PRESCRIPTION,
    };
    let options = {
      query: {
        find: { ...filterData, subCategory: SUB_CATEGORY.NOTES.GENERAL },
        populate: [{
          addedBy: ["mergeLFName",
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
            }]
        }],
        // category: TODO_CATEGORY.PRESCRIPTION,
      },
    };

    currentModalData.current = { ...record };
    setReminderFilterOptions(options);
    setReminderModal(true);

    if (currentModalData.current?.DATA_TYPE == DATA_TYPE.RESIDENT_DOCUMENT) {
      setResidentDocId({
        residentDocumentId: currentModalData.current._id,
        category: TODO_CATEGORY.RESIDENT_DOCUMENT,
        subCategory: SUB_CATEGORY.NOTES.GENERAL,
      });
    } else if (currentModalData.current?.DATA_TYPE == DATA_TYPE.PRESCRIPTION) {
      setResidentDocId({
        prescriptionOrderId: currentModalData.current._id,
        category: TODO_CATEGORY.PRESCRIPTION,
        subCategory: SUB_CATEGORY.NOTES.GENERAL,
      });
    } else if (currentModalData.current?.DATA_TYPE == DATA_TYPE.PMR) {
      setResidentDocId({
        pmrId: currentModalData.current._id,
        category: TODO_CATEGORY.PMR,
        subCategory: SUB_CATEGORY.NOTES.GENERAL,
      });
    }
  };

  const handleEditPresc = (visible, record, response) => {
    if (response) {
      let req = { ...detail, uniqueId: response.uniqueId };
      onEditRx(req);
    }
    setVisibleEdit(visible);
    setDetail(record);
  };

  const handlePendingTodo = record => {
    const todoCategoryData = () => {
      if (record?.DATA_TYPE === DATA_TYPE.PRESCRIPTION) {
        return TODO_CATEGORY.PRESCRIPTION
      } else if (record?.DATA_TYPE === TODO_CATEGORY.RESIDENT_DOCUMENT) {
        return TODO_CATEGORY.RESIDENT_DOCUMENT
      } else {
        return TODO_CATEGORY.MED_REVIEW
      }
    }

    const orderNumberData = () => {
      if (record?.DATA_TYPE === DATA_TYPE.PRESCRIPTION) {
        return record?.orderNumber
      } else if (record?.DATA_TYPE === TODO_CATEGORY.RESIDENT_DOCUMENT) {
        return record?.residentDocId
      } else {
        return record?.pmrId
      }
    }

    if (!record.pendingTodoCount)
      return
    let url = getTodoRedirectUrl({
      todoCategory: todoCategoryData(),
      subCategory: record.pendingTodo?.[record.pendingTodo.length - 1].subCategory,
      viewType: DEVICE_VIEW.PENDING,
      orderNumber: orderNumberData()
      // todoCategory: record?.DATA_TYPE === DATA_TYPE.PRESCRIPTION ? TODO_CATEGORY.PRESCRIPTION : TODO_CATEGORY.RESIDENT_DOCUMENT,
      // orderNumber: record?.DATA_TYPE === DATA_TYPE.PRESCRIPTION ? record?.orderNumber : record?.residentDocId
    })
    return url
  }

  return (
    <div className="resi_treat_content_wrap virtual_visit pmr_tab xray_tab digital_tab">
      <Header form={form} onSearching={handleFilter} onDateChange={handleDateChange} />
      <Table
        columns={columns}
        data={data}
        isLoading={loading}
        onTableRefresh={fetch}
        ref={tableRef}
      />
      {notesModal && (
        <NotesModal
          visible={notesModal}
          filterOptions={notesFilterOptions}
          onCancel={(data) => visibleNotesModal(false, null, "cancel", data)}
          onOk={() => visibleNotesModal(false)}
          isUpsertList={true}
          modalTitle={`View Note - ${currentModalData.current.DATA_TYPE === DATA_TYPE.RESIDENT_DOCUMENT
            ? currentModalData.current.residentDocId
            : currentModalData.current.orderNumber
            }`}
          xRayNumber={
            currentModalData.current.DATA_TYPE === DATA_TYPE.RESIDENT_DOCUMENT
              ? currentModalData.current.residentDocId
              : currentModalData.current.orderNumber
          }
          addData={{
            residentId: currentModalData.current.residentId,
            ...residentDocId,
          }}
        />
      )}
      {reminderModal && (
        <ReminderModal
          visible={reminderModal}
          filterOptions={reminderFilterOptions}
          onCancel={(data) => visibleReminderModal(false, null, "cancel", data)}
          onOk={() => visibleReminderModal(false)}
          isUpsertList={true}
          modalTitle={`View Reminder - ${currentModalData.current.DATA_TYPE === DATA_TYPE.RESIDENT_DOCUMENT
            ? currentModalData.current.residentDocId
            : currentModalData.current.orderNumber
            }`}
          xRayNumber={
            currentModalData.current.DATA_TYPE === DATA_TYPE.RESIDENT_DOCUMENT
              ? currentModalData.current.residentDocId
              : currentModalData.current.orderNumber
          }
          addData={{
            residentId: currentModalData.current.residentId,
            ...residentDocId,
          }}
        />
      )}

      {visibleImage && imageViewer.length > 0 ? (
        <LightBox
          visible={visibleImage}
          images={imageViewer && imageViewer.length > 0 ? imageViewer : null}
          // images={imageViewer}
          onCloseRequest={() => handleViewImages(false, null)}
          curImg={0}
          imageTitle={{ caption: true }}
        />
      ) : null}

      {visibleEdit ? (
        <AuthenticateModal
          visible={visibleEdit}
          // loading={loader}
          title={`Authetication For Update - ${detail.orderNumber}`}
          maskClosable={false}
          request={{
            prescriptionId: detail._id,
            action: MODIFY_ACTION.EDIT,
          }}
          onOk={(data) => handleEditPresc(false, null, data)}
          onCancel={() => handleEditPresc(false, null)}
        />
      ) : null}

    </div>
  );
};

export default createForm()(DigitalBinder);
