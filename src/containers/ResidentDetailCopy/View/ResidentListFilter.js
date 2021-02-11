import React from 'react'
const ResidentListFilter = () => {
  return (
    <div className="filter_wrap">
      <div className="filter_section">
        <h4 className="filter_head"> Sort By </h4>
        <div className="filter_value">
          <label for="phy" className="filter_switch mb-md-10">
            <input type="radio" name="phy" id="phy" />
            <span>Physician</span>
          </label>
          <label for="ha" className="filter_switch">
            <input type="radio" name="phy" id="ha" />
            <span>Home Area</span>
          </label>
        </div>
      </div>
      <div className="filter_section">
        <h4 className="filter_head"> Status </h4>
        <div className="filter_value">
          <label for="a" className="filter_switch">
            <input type="radio" name="st" id="a" />
            <span>Active</span>
          </label>
          <label for="in" className="filter_switch">
            <input type="radio" name="st" id="in" />
            <span>In Active</span>
          </label>
        </div>
        <div className="filter_value pt_0">
          <label for="vvs" className="filter_check">
            <input type="checkbox" name="vvs" id="vvs" />
            <span className="checkbox"></span>
            <span className="lbl">Virtual Visit Scheduled</span>
          </label>
          <label for="ptd" className="filter_check">
            <input type="checkbox" name="ptd" id="ptd" />
            <span className="checkbox"></span>
            <span className="lbl">Pending To Do</span>
          </label>

        </div>
      </div>
    </div>
  )
}
export default ResidentListFilter