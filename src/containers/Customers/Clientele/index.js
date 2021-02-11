import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createForm } from "rc-form";
import "../../../../node_modules/rc-tooltip/assets/bootstrap.css";
import queryString from "query-string";
import { CLIENTELE_TYPE } from "../../../constants/Customer";
import PageHead from "../Clientele/components/PageHead";
import axios from "../../../services/api/services/common";
import { syncKrollResident } from "../../../services/api/routes/resident";
import { Edit, Filters } from "../../../assets/images/resident-detail/index";
import {
  homeOrgPagination,
  homeOrgUpdate,
  homeAreaPaginate,
  homeAreaUpdate,
  homeOrgUpdateStatus,
} from "../../../services/api/routes/customer";
import ActiveDeactive from "../../../components/common/ActiveDeactive";
import Table from "../../../components/common/Table/index";
import routes from "../../../routes/constant";
import SettingModal from "../Clientele/components/SettingModal";
import { pharmacyPaginate } from "../../../services/api/routes/customer";
import { Toast } from "../../../components/common/Toast";
import { Refresh1 } from "../../../assets/images/pmr";
import ConfirmPopup from "../../../components/common/Popup/ConfirmPopup";

const _ = require("lodash");

const Clientele = (props) => {
  const { form, location, history, authUser } = props;

  const [loading, setLoading] = useState(false);
  const [queryId, setQueryId] = useState("");

  const filterInitialize = {
    page: 1,
    limit: 10,
    fields: [],
    find: { isActive: true },
    populate: [{ pharmacyId: ["name"] }],
    sortBy: { createdAt: "DESC" },
  };
  const pharmacyFilter = {
    fields: ["name"],
  };
  const [filter, setFilter] = useState(filterInitialize);

  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [visibleSetting, setVisibleSetting] = useState(false);
  const [record, setRecord] = useState(null);
  const [pharmacyData, setPharmacyData] = useState([]);
  const [filterListLoading, setFilterListLoading] = useState(false);
  const [confirmPopupForSync, setConfirmPopupForSync] = useState(false);
  const [homeDataForSync, setHomeDataForSync] = useState({});
  const [syncPopupOkButtonLoading, setSyncPopupOkButtonLoading] = useState(
    false
  );
  useEffect(() => {
    const query = queryString.parse(location.search);
    if (query.type == "organization") {
      return setQueryId(CLIENTELE_TYPE.ORGANIZATION);
    } else if (query.type == "home") {
      return setQueryId(CLIENTELE_TYPE.HOME);
    } else if (query.type == "homeArea") {
      return setQueryId(CLIENTELE_TYPE.HOME_AREA);
    } else {
      setQueryId(query.type);
    }
  }, [location]);
  useEffect(() => {
    if (queryId) {
      if (filter.hasOwnProperty("search") && filter.search["keyword"]) {
        const delayDebounceFn = setTimeout(() => {
          fetch();
        }, 600);
        return () => clearTimeout(delayDebounceFn);
      } else fetch();
    }
  }, [queryId, filter]);

  useEffect(() => {
    setFilterListLoading(true);
    axios({ ...pharmacyPaginate, data: { query: pharmacyFilter } })
      .then((data) => {
        if (data.code === "OK") {
          setPharmacyData(data.data.data);
        } else {
          Toast.error(data.data.message);
          setFilterListLoading(true);
        }
        setFilterListLoading(false);
      })
      .catch((err) => {
        setFilterListLoading(false);
        Toast.error(err);
      });
  }, []);
  const modifiedList = (list) => {
    let modifiedList = list.map((current) => {
      return current;
    });
    return modifiedList;
  };

  const fetch = () => {
    setLoading(true);
    let { url, method, baseURL } =
      queryId == CLIENTELE_TYPE.HOME_AREA
        ? homeAreaPaginate
        : homeOrgPagination;

    let apiData = {
      query: {
        ...filter,
        find: {
          ...filter.find,
          type: queryId == CLIENTELE_TYPE.HOME_AREA ? null : queryId,
        },
      },
    };
    axios({
      url,
      method,
      baseURL,
      data: apiData,
    })
      .then((respose) => {
        if (respose.code === "OK") {
          let updatedList = modifiedList(respose.data.data);
          setData(updatedList);
          setTotal(respose.data.count);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleTableChange = (pagination, tfilter, sorter) => {
    if (!pagination) return;
    let tempFilter = filter;
    tempFilter = {
      ...tempFilter,
      page: pagination.current,
      limit: pagination.pageSize,
      find: {
        ...tempFilter.find,
      },
    };
    if (tfilter && Object.keys(tfilter).length) {
      if (tfilter.isActive && tfilter.isActive.length) {
        tempFilter.find.isActive = tfilter.isActive;
      }
      // else if (tempFilter.find.isActive) {
      //   delete tempFilter.find['isActive'];
      // }
      tempFilter.page = pagination.current;
    } else {
      // tempFilter.filter = {
      //     type: tempFilter.filter.type
      // }
    }
    setFilter(tempFilter);
  };

  const onShowSizeChange = (size) => {
    if (size) {
      setFilter((prevFilter) => ({ ...prevFilter, limit: size, page: 1 }));
    }
  };

  const handleSearch = (event) => {
    let value = event.target.value;
    let obj = {
      ...filter,
      pageNo: 1,
      search: {
        keyword: value,
        keys: ["name", "emails.email"],
      },
    };
    setFilter(obj);
  };

  const handleActiveDeactive = (record) => {
    let tempData = data.map((rec) => {
      if (rec._id === record._id) {
        return { ...rec, isActive: !rec.isActive };
      } else {
        return rec;
      }
    });
    setData(tempData);
  };

  const showConfirmPopupForSync = (value, data) => {
    setHomeDataForSync(data);
    setConfirmPopupForSync(value);
  };

  const handleEditUrl = () => {
    if (queryId == CLIENTELE_TYPE.ORGANIZATION) {
      return 'organization'
    } else if (queryId == CLIENTELE_TYPE.HOME)
      return 'home'
    else if (queryId == CLIENTELE_TYPE.HOME_AREA) {
      return 'homeArea'
    }
  }

  const getColumns = () => [
    {
      title: "Sr.No",
      keyword: "index",
      dataIndex: "index",
      render: (text, record, index) =>
        (filter.page - 1) * filter.limit + (index + 1),
    },
    {
      title: "Name.",
      dataIndex: "name",
      render: (text, record) => <>{text ? text : ""}</>,
    },
    {
      title: "Email",
      dataIndex: "emails",
      render: (text) => (
        <span>{text && text.length > 0 ? text[0].email : ""}</span>
      ),
    },
    {
      title: queryId == CLIENTELE_TYPE.HOME_AREA ? null : "Pharmacy",
      dataIndex: queryId == CLIENTELE_TYPE.HOME_AREA ? null : "pharmacyId",
      render: (text) => <span>{text && text.name ? text.name : ""}</span>,
    },
    {
      title: "Phone No",
      dataIndex: "phone",
      render: (text) => (
        <span style={{ textTransform: "capitalize" }}>{text ? text : " "}</span>
      ),
    },
    {
      title: "Unique No",
      dataIndex: "uniqueNo",
      render: (text) => (
        <span style={{ textTransform: "capitalize" }}>{text ? text : " "}</span>
      ),
    },
    {
      title: "Active",
      dataIndex: "isActive",
      render: (text, record) => (
        <span style={{ textTransform: "capitalize" }}>
          <ActiveDeactive
            documentId={record._id}
            API={
              queryId == CLIENTELE_TYPE.HOME_AREA
                ? homeAreaUpdate
                : queryId == CLIENTELE_TYPE.HOME
                  ? homeOrgUpdateStatus
                  : homeOrgUpdate
            }
            record={record}
            isActive={record.isActive}
            model="master"
            onActiveDeactive={(record) => {
              handleActiveDeactive(record);
            }}
          />
        </span>
      ),
      filters: [
        { text: "Active", value: true, defaultChecked: true },
        { text: "De-active", value: false, },
      ],
      isCheck: true,
      // onFilter: (value, record) => console.log('isActive',record),
      onFilter: (value, record) => record.isActive === value,
    },
    {
      title: "Action",
      showRefresh: true,
      render: (text, record) => (
        <>
          <div className="actions" style={{ width: "50%" }}>
            <a
              onClick={() => {
                history.push(
                  `${routes.clienteleUpsert.path}?type=${
                  handleEditUrl()
                  }&&id=${record._id} `
                );
              }}
            >
              <Edit />
              <p>Edit</p>
            </a>
            {queryId == CLIENTELE_TYPE.HOME ? (
              <>
                <a onClick={() => handleSetting(true, record)}>
                  <Filters />
                  <p>Setting</p>
                </a>
                {record.krollId && (
                  <a onClick={() => showConfirmPopupForSync(true, record)}>
                    <Refresh1
                      style={{
                        marginTop: "-4px",
                        cursor: "pointer",
                        height: "20px",
                        width: "20px",
                      }}
                    />
                    <p>Sync Resident From Kroll</p>
                  </a>
                )}
              </>
            ) : null}
          </div>
        </>
      ),
    },
  ];

  const handleSetting = (visible, record, res) => {
    setVisibleSetting(visible);
    setRecord(record);
    if (res) {
      let newData = [...data];
      let index = newData.findIndex((x) => x._id === res._id);
      if (index >= 0) {
        newData[index] = {
          ...newData[index],
          assignedSubscriptionGroupId: res.assignedSubscriptionGroupId,
        };
        setData(newData);
      }
    }
  };

  const hadleRadioValue = (e) => {
    if (e.target.checked) {
      let val = parseInt(e.target.value);
      setQueryId(val);
      props.history.push({
        pathname: props.location.pathname,
        search: `?type=${
          val === CLIENTELE_TYPE.HOME
            ? "home"
            : val === CLIENTELE_TYPE.ORGANIZATION
              ? "organization"
              : "homeArea"
          }`,
      });
    }
  };

  const handleRedirect = () => {
    if (queryId == CLIENTELE_TYPE.ORGANIZATION) {
      return history.push(`${routes.clienteleUpsert.path}?type=organization`);
    } else if (queryId == CLIENTELE_TYPE.HOME) {
      return history.push(`${routes.clienteleUpsert.path}?type=home`);
    } else if (queryId == CLIENTELE_TYPE.HOME_AREA) {
      return history.push(`${routes.clienteleUpsert.path}?type=homeArea`);
    } else {
      return null;
    }
  };
  const onPharmacyFilterChange = (pharmacyId) => {
    const tempFilter = { ...filter };
    tempFilter.find = { ...tempFilter.find, pharmacyId };
    setFilter(tempFilter);
  };
  const handleHomeSync = async () => {
    setSyncPopupOkButtonLoading(true);
    axios({
      ...syncKrollResident,
      data: {
        homeId: homeDataForSync._id,
        pharmacyId: homeDataForSync.pharmacyId?._id,
        activeHomes: [homeDataForSync.krollId],
        homeIdentifier: homeDataForSync.homeIdentifier,
      },
    })
      .then((data) => {
        console.log("🚀 ~ file: index.js ~ line 382 ~ .then ~ data", data)
        if (data.code === "OK") {
          setConfirmPopupForSync(false);
          setSyncPopupOkButtonLoading(false);
          Toast.success(data.message);
        } else {
          setConfirmPopupForSync(false);
          setSyncPopupOkButtonLoading(false);
        }
      })
      .catch((error) => {
        setConfirmPopupForSync(false);
        console.log("EEOROR", error);
        setSyncPopupOkButtonLoading(false);
      });
  };

  return (
    <>
      <div className="pmr_wrap">
        <div className="container">
          <PageHead
            total={total}
            form={form}
            hadleRadioValue={hadleRadioValue}
            queryData={queryId}
            onSearch={handleSearch}
            handleRedirect={handleRedirect}
            pharmacyData={pharmacyData}
            filterListLoading={filterListLoading}
            onPharmacyFilterChange={onPharmacyFilterChange}
            placeholder={"Select Pharmacy"}
          />
          <Table
            columns={getColumns()}
            datasource={data}
            loading={loading}
            onChange={handleTableChange}
            pagination={{
              current: filter.page,
              pageSize: filter.limit,
              total: total,
              showSizeChanger: true,
              onShowSizeChange: onShowSizeChange,
            }}
          />
        </div>
      </div>
      {visibleSetting ? (
        <SettingModal
          queryData={queryId}
          visible={visibleSetting}
          subscripData={record}
          detail={record}
          onCancel={(res) => handleSetting(false, null, res)}
        />
      ) : null}
      {confirmPopupForSync && (
        <ConfirmPopup
          children={<b className="font-22">Are you sure you want to sync Kroll Resident ?</b>}
          visible={showConfirmPopupForSync}
          okButtonProps={{ loading: syncPopupOkButtonLoading }}
          onOK={handleHomeSync}
          onCancel={() => showConfirmPopupForSync(false, {})}
        />
      )}
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return { authUser };
};

export default connect(mapStateToProps)(createForm()(withRouter(Clientele)));
