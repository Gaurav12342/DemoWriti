import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createForm } from "rc-form";
import { Edit, Filters } from "../../../assets/images/resident-detail/index";
import axios from "../../../services/api/config";
import {
  krollHomeHASync,
  pharmacyPaginate,
  pharmacyUpdate,
} from "../../../services/api/routes/customer";
import ActiveDeactive from "../../../components/common/ActiveDeactive";
import Table from "../../../components/common/Table/index";
import PageHead from "../../../containers/Customers/Pharmacy/components/PageHead";
import routes from "../../../routes/constant";
import SettingModal from "../Clientele/components/SettingModal";
import { CLIENTELE_TYPE } from "../../../constants/Customer";
import Tooltip from "rc-tooltip";
import { Info } from "../../../assets/images/popup";
import AssociatedHomeListModal from "./components/associatedHome";
import ConfirmPopup from "../../../components/common/Popup/ConfirmPopup";
import { Toast } from "../../../components/common";
import { Refresh1 } from "../../../assets/images/pmr";

const _ = require("lodash");

const Pharmacy = (props) => {
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    sortBy: { createdAt: "DESC" },
    populate: [{ homes: ["name", "isActive", "emails", "uniqueNo"] }],
    find: {},
  });
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [visibleSetting, setVisibleSetting] = useState(false);
  const [record, setRecord] = useState(null);
  const authUser = useSelector((state) => state.auth.authUser);
  const [showAssociatedHomeModal, setShowAssociatedHomeModal] = useState(false);
  const [associatedHomeList, setAssociatedHomeList] = useState([]);
  const [confirmPopupForSync, setConfirmPopupForSync] = useState(false);
  const [pharmacyDataForSync, setPharmacyDataForSync] = useState({});
  const [syncPopupOkButtonLoading, setSyncPopupOkButtonLoading] = useState(
    false
  );
  useEffect(() => {
    if (filter.hasOwnProperty("search") && filter.search["keyword"]) {
      const delayDebounceFn = setTimeout(() => {
        fetch();
      }, 600);
      return () => clearTimeout(delayDebounceFn);
    } else fetch();
  }, [filter]);

  const modifiedList = (list) => {
    let modifiedList = list.map((current) => {
      return current;
    });
    return modifiedList;
  };

  const fetch = () => {
    setLoading(true);
    axios({
      ...pharmacyPaginate,
      data: { query: { ...filter } },
    })
      .then((data) => {
        if (data.data.code === "OK") {
          let updatedList = modifiedList(data.data.data.data);
          setData(updatedList);
          setTotal(data.data.data.count);
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
    };
    if (tfilter && Object.keys(tfilter).length) {
      if (tfilter.isActive && tfilter.isActive.length) {
        tempFilter.find.isActive = tfilter.isActive;
      } else if (tempFilter.find.isActive) {
        delete tempFilter.find["isActive"];
      }
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
  const handleShowAssociatedHome = (homes) => {
    setAssociatedHomeList(homes);
    setShowAssociatedHomeModal(true);
  };
  const onAssociatedHomeModalCancel = () => {
    setShowAssociatedHomeModal(false);
  };
  const showConfirmPopupForSync = (value, data) => {
    setPharmacyDataForSync(data);
    setConfirmPopupForSync(value);
  };

  const handleHomeSync = async () => {
    setSyncPopupOkButtonLoading(true);
    axios({
      ...krollHomeHASync,
      data: { pharmacyId: pharmacyDataForSync._id },
    })
      .then((data) => {
        if (data.data.code === "OK") {
          setConfirmPopupForSync(false);
          setSyncPopupOkButtonLoading(false);
          Toast.success(data.data.message);
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
      render: (text) => <span>{text ? text[0].email : ""}</span>,
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
            record={record}
            isActive={record.isActive}
            API={pharmacyUpdate}
            model="pharmacy"
            onActiveDeactive={(record) => {
              handleActiveDeactive(record);
            }}
          />
        </span>
      ),
      filters: [
        { text: "Active", value: true },
        { text: "De-active", value: false },
      ],
      onFilter: (value, record) => record.isActive === value,
    },
    {
      title: "Action",
      showRefresh: true,
      render: (text, record) => (
        <>
          <div className="actions">
            <a
              onClick={() => {
                props.history.push(
                  `${routes.pharmacyUpsert.path}/${record._id}`
                );
              }}
            >
              <Edit />
              <p>Edit</p>
            </a>
            <a onClick={() => handleSetting(true, record)}>
              <Filters />
              <p>Setting</p>
            </a>
            
            <a onClick={() => handleShowAssociatedHome(record.homes)}>
              <Info
                style={{
                  marginTop: "-4px",
                  cursor: "pointer",
                  height: "20px",
                  width: "20px",
                }}
              />
              <p>Associated Home</p>
            </a>
            {record.isKroll ? (
              <a onClick={() => showConfirmPopupForSync(true, record)}>
                <Refresh1
                  style={{
                    marginTop: "-4px",
                    cursor: "pointer",
                    height: "20px",
                    width: "20px",
                  }}
                />
                <p>Sync Kroll Home</p>
              </a>
            ) : (
              ""
            )}
          </div>
        </>
      ),
    },
  ];

  const handleRedirect = () => {
    props.history.push(routes.pharmacyUpsert.path);
  };

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

  return (
    <>
      <div className="pmr_wrap">
        <div className="container">
          <PageHead
            total={total}
            onRedirect={handleRedirect}
            onSearch={handleSearch}
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
          queryData={CLIENTELE_TYPE.PHARMACY}
          visible={visibleSetting}
          subscripData={record}
          detail={record}
          onCancel={(res) => handleSetting(false, null, res)}
          authUser={authUser}
        />
      ) : null}

      {showAssociatedHomeModal && (
        <AssociatedHomeListModal
          visible={showAssociatedHomeModal}
          data={associatedHomeList}
          onCancel={onAssociatedHomeModalCancel}
        />
      )}
      {confirmPopupForSync && (
        <ConfirmPopup
          children={
            <b>Are you sure you want to sync Kroll Home and HomeArea</b>
          }
          visible={showConfirmPopupForSync}
          okButtonProps={{ loading: syncPopupOkButtonLoading }}
          onOK={handleHomeSync}
          onCancel={() => showConfirmPopupForSync(false, {})}
        />
      )}
    </>
  );
};

export default createForm()(Pharmacy);
