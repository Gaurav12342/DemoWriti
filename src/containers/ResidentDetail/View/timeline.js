import React, { useState, useEffect, useRef } from "react";
import { createForm } from "rc-form";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import { Timeline } from "../../../services/api/routes/globalSearch";
import "react-month-picker/css/month-picker.css";
import axios, {
  getRxImage,
  getPrivateBucketUrl,
} from "../../../services/api/services/common";
import { Toast, Select, Option, LightBox } from "../../../components/common";
import _ from "lodash";
import { MODULE } from "../../../constants/subscription";
import { connect } from "react-redux";
import TimelineModel from "./timeLineModel";
import { DEVICE_VIEW, STATUS, TODO_CATEGORY } from "../../../constants/todo";
import { getTodoRedirectUrl } from "../../../util/todo";
import { da } from "date-fns/locale";

const OrderTab = (props) => {
  const { resident, isTabActive } = props;
  const [visible, setVisibile] = useState(false);
  const [month, setMonth] = useState(moment().month() + 1);
  const [year, setYear] = useState(moment().year());
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [modelData, setModelData] = useState([]);
  const [todayData, setTodayData] = useState([]);
  const [yesterdayData, setYesterdayData] = useState([]);

  const [apiFilter, setApiFilter] = useState({
    date: `${year}/${month}`,
    find: {
      residentId: resident.currentResidentId,
    },
    populate: [
      {
        printedOrderList: [],
      },
    ],
  });
  const yesterday = moment().subtract("day", 1).format("MM/DD/YYYY");
  const today = moment().format("MM/DD/YYYY");
  const handleChange = (name, e) => {
    if (name === "month") {
      setMonth(e + 1);
      setApiFilter((data) => {
        return {
          ...data,
          date: `${year}/${e + 1}`,
        };
      });
    } else {
      setYear(e);
      setApiFilter((data) => {
        return {
          ...data,
          date: `${e}/${month}`,
        };
      });
    }
  };

  const columns = [
    {
      title: "OrderNumber",
      dataIndex: "title",
      render: (text) => (
        <span style={{ textTransform: "capitalize" }}>{text || "-"}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        if (text === STATUS.COMPLETED) {
          return "Complete";
        } else if (text === STATUS.COMPLETED) {
          return "Complete";
        } else if (text === STATUS.CANCELLED) {
          return "X-Ray";
        } else if (text === STATUS.UNDO) {
          return "Undo";
        }
      },
    },
  ];

  useEffect(() => {
    window.dispatchEvent(new Event("resize"));
  }, [props.isTabActive]);

  useEffect(() => {
    if (!isTabActive) return;
    fetch();
    setDate(new Date());
  }, [apiFilter, isTabActive]);

  // useEffect(()=>{
  //   setTimeout(() => {
  //       window.dispatchEvent(new Event('resize'))
  //   }, 3000);
  // },[data])

  const handlingPmrRedirect = (record) => {
    // if (!record.pendingTodoCount) return;
    let url = getTodoRedirectUrl({
      todoCategory: TODO_CATEGORY.MED_REVIEW,
      subCategory: record.subCategory,
      viewType: DEVICE_VIEW.PENDING,
      orderNumber: record.orderNumber,
    });
    window.open(url, "_blank");
    return url;
  };

  const fetch = async () => {
    let res = await axios({ ...Timeline, data: { query: { ...apiFilter } } });
    if (res) {
      if (res.code === "OK") {
        let temp = [];
        let tempTodayData = [];
        let tempYesterdayData = [];
        _.map(Object.keys(res.data), (d) => {
          temp = _.concat(temp, res.data[d]);
        });
        let events = _.map(temp, (t) => {
          if (t.module === MODULE.PMR) {
            t.title = t.pmrId;
            t.allDay = false;
          } else if (
            t.module === MODULE.RX_ORDER ||
            t.module === MODULE.X_RAY_US
          ) {
            t.title = t.orderNumber;

            t.allDay = false;
          } else if (t.module === MODULE.RESIDENT_DOCUMENT) {
            t.title = t.residentDocId;

            t.allDay = false;
          }
          if (
            moment(t.updatedAt).format("MM/DD/YYYY") ===
            moment(today).format("MM/DD/YYYY")
          ) {
            tempTodayData.push(t);
          }
          if (
            moment(t.updatedAt).format("MM/DD/YYYY") ===
            moment(yesterday).format("MM/DD/YYYY")
          ) {
            tempYesterdayData.push(t);
          }
          return t;
        });
        if (_.size(tempTodayData)) {
          setTodayData(tempTodayData);
        }
        if (_.size(tempYesterdayData)) {
          setYesterdayData(tempYesterdayData);
        }

        setData(events);
      } else Toast.error(res.message);
    }
  };

  const locales = {
    "en-CA": require("date-fns/locale/en-CA"),
  };
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const handleTimelineView = (data) => {
    if (
      data.module === MODULE.RX_ORDER ||
      data.module === MODULE.E_PROCESSING
    ) {
      if (_.size(data.attachments)) {
        handleViewImages(true, data);
      } else {
        Toast.info("There is no attachments.");
      }
    } else if (data.module === MODULE.RESIDENT_DOCUMENT) {
      if (_.size(data.documents)) {
        let attachments = [];
        _.forEach(data.documents, (d, i) => {
          const t = {
            path: d.path,
            id: i.toString(),
          };
          attachments.push(t);
          return;
        });
        getPrivateBucketUrl(attachments)
          .then((data) => {
            data = _.map(data, (d) => {
              d.src = d.path;
              return d;
            });
            setDetail({ attachments: data });
            setVisibleImage(true);
          })
          .catch((error) => {
            Toast.error("Something went wrong");
          });
      } else {
        Toast.info("There is no attachments.");
      }
    } else if (data.module === MODULE.PMR) {
      if (_.size(data.pendingTodo)) {
        data.pendingTodo = _.orderBy(data.pendingTodo, ["sequence"], ["asc"]);
        const redirectObject = {
          subCategory: data.pendingTodo[0].subCategory,
          viewType: DEVICE_VIEW.PENDING,
          orderNumber: data.pmrId,
        };
        handlingPmrRedirect(redirectObject);
      } else if (_.size(data.printedOrderList)) {
        let attachments = [];
        _.map(data.printedOrderList, (d) => {
          _.map(d.attachments, (attachment) => {
            attachments.push({ src: attachment.path });
          });
          data.attachments = attachments;

          return d;
        });
        setDetail(data);
        setVisibleImage(true);
      } else {
        Toast.info("There is no attachments.");
      }
    }
  };
  const [imgLoader, setImgLoader] = useState(false);
  const [visibleImage, setVisibleImage] = useState(false);
  const [detail, setDetail] = useState(null);

  const currentResident = resident.openedResidents[resident.currentResidentId];
  const residentName = `${currentResident.mergeLFName} (Room No ${currentResident.room})`;
  const MONTHS_NAMES_FULL = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const handleShowMore = (e) => {
    setModelData(e);
    setVisibile(true);
  };
  // const prepareAttachments = () => {
  //   let imageViewer = [];
  //   if (detail?.attachments?.length > 0) {
  //     imageViewer = _.reverse(
  //     console.log("🚀 ~ file: timeline.js ~ line 198 ~ prepareAttachments ~ imageViewer", imageViewer)
  //       _.map(detail.attachments, function (a) {
  //         a.src = a.path;
  //         return a;
  //       })
  //     );
  //   }
  //   return { imageViewer };
  // };
  // const { imageViewer } = prepareAttachments();

  const handleViewImages = (visible, record) => {
    if (visible) {
      setImgLoader(true);
      getRxImage([record._id])
        .then((resp) => {
          if (resp?.[0]) record.attachments = resp[0].attachments;
          record.attachments = _.reverse(
            record.attachments.map((x, i) => {
              x.caption = `${record.orderNumber}-${i + 1}`;
              x.src = x.path;
              return x;
            })
          );
          setVisibleImage(visible);
          setDetail(record);
          setImgLoader(false);
        })
        .catch((err) => {
          setImgLoader(false);
        });
    } else {
      setVisibleImage(visible);
      setDetail(record);
    }
  };

  const onClose = (e) => {
    setVisibile(false);
  };
  return (
    <>
      <div className="timeline_wrap">
        <div className="head">
          <h4>{residentName}</h4>
          <div className="d-flex m-10">
            <div className="col-4">
              <Select
                defaultValue={date.getFullYear()}
                onChange={(e) => handleChange("year", e)}
              >
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(
                  (key, index) => {
                    return <Option value={index + 2010}>{index + 2010}</Option>;
                  }
                )}
              </Select>
            </div>
            <div className="col-4">
              <Select
                defaultValue={date.getMonth()}
                onChange={(e) => handleChange("month", e)}
              >
                {MONTHS_NAMES_FULL.map((month, index) => (
                  <Option key={month} value={index}>
                    {month}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
        </div>
        <div className="d-flex m-10" style={{ marginTop: 10 }}>
          <div className="col-9">
            <Calendar
              localizer={localizer}
              events={data}
              startAccessor="updatedAt"
              endAccessor="updatedAt"
              style={{ height: "100%" }}
              // onEventResize={() => console.log("---------------------------------")}
              // onRangeChange={(e) => console.log(e)}
              views={[Views.MONTH]}
              toolbar={false}
              date={new Date(year, month - 1, 1)}
              onShowMore={(e) => handleShowMore(e)}
              onSelectEvent={handleTimelineView}
            />
          </div>
          <div className="col-3 rightStatusbar">
            <div className="rightResidentAction">
              <h2 className="residentTitle">Today - {today}</h2>
              {_.size(todayData) > 0 ? (
                <div className="ActionTable">
                  <div className="d-flex residentTop">
                    <h3 className="col-6 subTitle">OrderNumber</h3>
                    <h3 className="col-6 subTitle">Status</h3>
                  </div>
                  <div
                    className="residentListing"
                    style={{
                      overFlowY: "scroll",
                    }}
                  >
                    {_.map(todayData, (d) => {
                      return (
                        <div className="d-flex residentTopList">
                          <span className="col-6 listLeft">{d.title}</span>
                          <span className="col-6 listRight">
                            {d.status === STATUS.COMPLETED
                              ? "Complete"
                              : d.status === STATUS.CANCELLED
                              ? "Cancelled"
                              : d.status === STATUS.UNDO
                              ? "Undo"
                              : d.status === STATUS.SUBMITTED
                              ? "Submitted"
                              : ""}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="rightResidentAction">
              <h2 className="residentTitle">Yesterday - {yesterday}</h2>
              {_.size(yesterdayData) > 0 ? (
                <div className="ActionTable">
                  <div className="d-flex residentTop">
                    <h3 className="col-6 subTitle">OrderNumber</h3>
                    <h3 className="col-6 subTitle">Status</h3>
                  </div>
                  <div
                    className="residentListing"
                    style={{
                      overFlowY: "scroll",
                    }}
                  >
                    {_.map(yesterdayData, (d) => {
                      return (
                        <div className="d-flex residentTopList">
                          <span className="col-6 listLeft">{d.title}</span>
                          <span className="col-6 listRight">
                            {d.status === STATUS.COMPLETED
                              ? "Complete"
                              : d.status === STATUS.CANCELLED
                              ? "Cancelled"
                              : d.status === STATUS.UNDO
                              ? "Undo"
                              : d.status === STATUS.SUBMITTED
                              ? "Submitted"
                              : ""}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {visibleImage && detail?.attachments.length > 0 ? (
          <LightBox
            visible={visibleImage}
            images={detail.attachments}
            onCloseRequest={() => handleViewImages(false, null)}
            curImg={0}
            imageTitle={{ caption: true }}
          />
        ) : null}
        {visible && (
          <TimelineModel
            handleTimelineView={handleTimelineView}
            visible={visible}
            title={"Details"}
            onCancel={onClose}
            onClose={onClose}
            maskClosable={false}
            onOk={onClose}
            data={modelData}
          />
        )}
      </div>
    </>
  );
};

const mapStateToProps = ({ resident }) => {
  return { resident };
};
export default connect(mapStateToProps)(createForm()(OrderTab));

// export default connect(mapStateToProps)(Residents)
