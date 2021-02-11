import React from "react";
import { Search, Select, Option } from "../../../components/common/index";
import {
  capitalizeStr,
  isModuleAccessible,
  canPerformAction,
} from "../../../util/common";
import { MODULE, ACTIONS } from "../../../constants/subscription";
import { withRouter } from "react-router-dom";
import ButtonUI from "./AddEditButton";
import PharmacyFilter from "./PharmacyFilter";
import { isPharmacyUser } from '../../../constants/User'
import queryString from "query-string";

function Header(props) {
  const {
    btnLabel,
    total,
    onSearch,
    onAdd,
    userRoleOptions,
    onTypeFilter,
    filter,
    permission,
    MAPPED_USER_CUSTOMER_MODULE,
    defaultTab,
    typeFilter,
    pharmacyData,
    filterListLoading,
    onPharmacyFilterChange,
    pageName,
    placeholder,
    location,
    authUser
  } = props;

  return (
    <div className="page_head">
      <h3 style={{ textTransform: "capitalize" }}>
        {pageName} User <span className="r_no">{total}</span>
      </h3>
      <div className="form_wrap ">
        <div className="form_group m-r-5">
          {location.pathname === "/user/pharmacy" && (
            isPharmacyUser(authUser?.type) ? null :
              <PharmacyFilter
                filterListLoading={filterListLoading}
                data={pharmacyData}
                onChange={onPharmacyFilterChange}
                placeholder={placeholder}
              />
          )}
        </div>
        <div className="form_group">
          {userRoleOptions && userRoleOptions.length ? (
            <Select
              placeholder="Filter By Type"
              onChange={(val) => onTypeFilter(val)}
              allowClear={true}
              value={typeFilter}
            >
              {userRoleOptions.map((obj) => {
                return (
                  <Option key={obj.value} value={obj.value}>
                    <span>{obj.text.replace(/_/g, " ")}</span>
                  </Option>
                );
              })}
            </Select>
          ) : null}
        </div>
        <div className="form_group">
          <Search
            placeholder="Search by Name, Email"
            allowClear={true}
            onChange={onSearch}
            style={{ width: "250px" }}
            value={filter?.search?.keyword}
          // onClear={() => onSearch('')}
          />
        </div>
        {/* {
                isModuleAccessible(MAPPED_USER_CUSTOMER_MODULE[defaultTab], true) &&
                    permission[ACTIONS.ADD.CODE] ? <ButtonUI
                        btnLabel={btnLabel}
                        onAdd={onAdd}
                    /> : null
            } */}
        <ButtonUI btnLabel={btnLabel} onAdd={onAdd} />
      </div>
    </div>
  );
}
export default withRouter(Header);
