import React from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Search,
  RadioGroup,
} from "../../../../components/common/index";
import { CLIENTELE_TYPE } from "../../../../constants/Customer";
import PharmacyFilter from "./PharmacyFilter";
import queryString from "query-string";

const _ = require("lodash");

const PageHead = (props) => {
  const {
    onSearch,
    total,
    radioValue,
    hadleRadioValue,
    queryData,
    handleRedirect,
    pharmacyData,
    filterListLoading,
    onPharmacyFilterChange,
    location,
    placeholder
  } = props;

  const query = queryString.parse(location.search);
  
  return (
    <>
      <div className="page_head">
        <h3 style={{ fontSize: "25px", alignItems: "center", width: "30%" }}>
          {" "}
          Customer{" "}
          <span
            className="r_no"
            style={{ marginTop: "1%", marginLeft: "2%", fontSize: "55%" }}
          >
            {total}
          </span>
        </h3>

        <div className="form_wrap">
          {query.type == "home" &&(
            <div>
              <PharmacyFilter
                data={pharmacyData}
                filterListLoading={filterListLoading}
                onChange={onPharmacyFilterChange}
                placeholder={placeholder}
              />
            </div>
          )}
          <div className="components radio_grp" style={{ marginRight: "10px" }}>
            <RadioGroup
              options={[
                {
                  label: "Organization",
                  id: "Organization",
                  value: CLIENTELE_TYPE.ORGANIZATION,
                  checked:
                    queryData && queryData === CLIENTELE_TYPE.ORGANIZATION,
                },
                {
                  label: "Home",
                  id: "Home",
                  value: CLIENTELE_TYPE.HOME,
                  checked: queryData && queryData === CLIENTELE_TYPE.HOME,
                },
                {
                  label: "Home Area",
                  id: "Home Area",
                  value: CLIENTELE_TYPE.HOME_AREA,
                  checked: queryData && queryData === CLIENTELE_TYPE.HOME_AREA,
                },
              ]}
              name="clientele"
              onChange={hadleRadioValue}
              value={radioValue}
            />
          </div>

          <div className="form_group" style={{ marginTop: "12px" }}>
            <Search
              allowClear={true}
              onChange={onSearch}
              placeholder="Search by Name, Email"
              style={{ width: "250px" }}
            />
          </div>
          <div className="components">
            <Button type="primary" size="lg" onClick={handleRedirect}>
              {`Add ${
                (queryData == CLIENTELE_TYPE.ORGANIZATION && "organization") ||
                (queryData == CLIENTELE_TYPE.HOME && "home") ||
                (queryData == CLIENTELE_TYPE.HOME_AREA && "home area")
              }`}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(PageHead);
