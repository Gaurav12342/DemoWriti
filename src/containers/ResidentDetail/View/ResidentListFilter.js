import { fil } from "date-fns/locale";
import React, { useState, useEffect } from "react";
import { Button } from "../../../components/common";
import DoctorFilter from "../../../components/DoctorFilter";
import HomeAreaFilter from "../../../components/HomeAreaFilter";
import { STATUS } from "../../../constants/resident";
import _ from 'lodash'
const ResidentListFilter = (props) => {
  const [filter, setFilter] = useState(props.filter);
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    if (!props.showFilter && !isApplied) {
      setData(initData);
    }
  }, [props.showFilter]);

  const initData = {
    active: STATUS.ACTIVE === filter.find.status,
    inactive: STATUS.DEACTIVE === filter.find.status,
    phy: false,
    ha: false,
    vvs: false,
    ptd: false,
    mergeLFName: filter.sortBy?.mergeLFName,
  };

  const [data, setData] = useState(initData);
  const prepareFilter = (options, sortOpt) => {
    let obj = {
      ...filter,
      pageNo: 1,
      sortBy: { ...filter.sortBy, ...sortOpt },
      find: {
        ...filter.find,
        ...options,
      },
    };
    setFilter(obj);
  };

  const onSetStatus = (e) => {
    const { value, checked } = e.target;
    prepareFilter({
      status: value === "active" ? STATUS.ACTIVE : STATUS.DEACTIVE,
    });
    setData({
      ...data,
      active: value === "active",
      inactive: value === "inactive",
    });
  };

  const onSetSorting = (e) => {
    const { value, checked } = e.target;
    let obj = {};
    if (value === "mergeLFName") {
      if (checked) obj["mergeLFName"] = "ASC";
      else delete obj["mergeLFName"];
    }
    // else if (value === 'ha') {
    //   if (checked)
    //     obj['homeAreaId.name'] = 'ASC'
    //   else delete obj['homeAreaId.name']
    // }
    prepareFilter({}, obj);
    setData({ ...data, [value]: checked });
  };

  const onSetOthers = (e) => {
    const { value, checked } = e.target;
    let obj = {};
    if (value === "vvs") {
      obj["vvs"] = value;
      setData({ ...data, vvs: checked });
    } else if (value === "ptd") {
      obj["ptd"] = value;
      setData({ ...data, ptd: checked });
    }
    prepareFilter(obj);
  };

  const handleFilter = (str) => {
    if (str === "clear") {
      props.onChangeFilter(props.initFilter);
      setFilter(props.initFilter);
      // setData(initData)
      setIsApplied(false);
    } else {
      setIsApplied(true);
      props.onChangeFilter(filter);
    }
  };

  const setDoctorFilter = (doctorId) => {
    const tempFilter = { ...filter };
    tempFilter.find = {
      ...tempFilter.find,
      doctorId: doctorId,
    };
    setFilter(tempFilter);
  };
  const setHomeareaFilter = (homeAreaId) => {
    console.log(
      "🚀 ~ file: ResidentListFilter.js ~ line 102 ~ setHomeareaFilter ~ homeAreaId",
      homeAreaId
    );
    const tempFilter = { ...filter };
    if (_.size(homeAreaId)) {
      tempFilter.find = {
        ...tempFilter.find,
        homeAreaId: homeAreaId,
      };
    } else {
      tempFilter.find = _.omit(tempFilter.find, "homeAreaId");
    }
    setFilter(tempFilter);
  };
  return (
    <>
      {props.showFilter ? (
        <div className="filter_wrap">
          <div className="filter_section">
            <h4 className="filter_head"> Sort By </h4>
            <div className="filter_value">
              <label htmlFor="phy" className="filter_switch mb-md-10">
                <input
                  type="checkbox"
                  name="mergeLFName"
                  id="phy"
                  value="mergeLFName"
                  checked={!!data.mergeLFName}
                  onChange={onSetSorting}
                />
                <span>Name</span>
              </label>
              {/* <label for="ha" className="filter_switch">
            <input type="checkbox" name="ha" id="ha" value='ha' checked={data.ha}
              onChange={onSetSorting} />
            <span>Home Area</span>
          </label> */}
            </div>
          </div>
          <div className="filter_section">
            <h4 className="filter_head"> Status </h4>
            <div className="filter_value">
              <label for="a" className="filter_switch">
                <input
                  type="radio"
                  name="st"
                  id="a"
                  value="active"
                  checked={data.active}
                  onChange={onSetStatus}
                />
                <span>Active</span>
              </label>
              <label for="in" className="filter_switch">
                <input
                  type="radio"
                  name="st"
                  id="in"
                  value="inactive"
                  checked={data.inactive}
                  onChange={onSetStatus}
                />
                <span>In Active</span>
              </label>
            </div>
            <div className="filter_section">
              <HomeAreaFilter
                showFilter={true}
                onChange={(e) => setHomeareaFilter(e)}
                multiple={true}
                defaultValue={filter.find?.homeAreaId}
              />
            </div>
            <div className="filter_section" style={{ marginTop: "10px" }}>
              <DoctorFilter
                onChange={(e) => setDoctorFilter(e)}
                value={filter.find?.doctorId}
                allowClear={true}
              />
            </div>

            {/* <div className="filter_value pt_0">
          <label for="vvs" className="filter_check">
            <input type="checkbox" name="vvs" id="vvs" value="vvs" checked={data.vvs}
              onChange={onSetOthers} />
            <span className="checkbox"></span>
            <span className="lbl">Virtual Visit Scheduled</span>
          </label>
          <label for="ptd" className="filter_check">
            <input type="checkbox" name="ptd" id="ptd" value="ptd" checked={data.ptd}
              onChange={onSetOthers} />
            <span className="checkbox"></span>
            <span className="lbl">Pending To Do</span>
          </label>

        </div> */}
          </div>
          <div style={{ marginTop: "10px" }}>
            <Button
              type="secondary"
              style={{ width: "50%", borderRadius: "unset" }}
              onClick={() => handleFilter("clear")}
            >
              Clear Filter
            </Button>
            <Button
              type="primary"
              style={{ width: "50%", borderRadius: "unset" }}
              onClick={handleFilter}
            >
              Apply Filter
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default ResidentListFilter;
