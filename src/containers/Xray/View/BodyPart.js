import React from 'react'
import { Correct } from '../../../assets/images/resident-detail/index'
import ToolTip from './ToolTip'

const disbaleItemsStyle = {
  display: 'block',
  pointerEvents: 'none',
  // backgroundColor: '#dddddd'
}
function MainBodyPart({ name, data, onShowDynamicModal, clonedCodeList,
  clonedSelectedParts, xRayDetail, isEdit, editCode=[] }) {
  return (
    <div className="xray-details-list">
      <div className="left-detail">
        <span>{name}</span>
      </div>
      <div className="right-details">
        <div className="listing">
          {
            data.length > 0 ?
              data.map((subPart, i) => {
                return subPart.isClickable ?
                  <>
                    <div className="xray-title" style={['TOE(S)', 'FINGER(S)', 'VENOUS_ARMS', 'ARTERIAL_ARMS'].indexOf(subPart.code) >= 0 ? { marginBottom: '12px' } : null}>
                      {
                        subPart.note ? <ToolTip data={subPart.note}>
                          <label
                            className={clonedSelectedParts.indexOf(subPart.label) >= 0 ? "listing-wrapper active" : "listing-wrapper"}
                            style={isEdit ? editCode.includes(subPart.code) ? null : disbaleItemsStyle : null}
                            onClick={() => onShowDynamicModal(subPart)}>
                            <input type="radio" name="chest-xray" id={subPart.code}
                              checked={clonedSelectedParts.indexOf(subPart.label) >= 0 ? true : false}
                            />

                            <span>
                              {isEdit ? editCode.includes(subPart.code) ? null : 'diasble' : null}{subPart.label}
                              <Correct />
                            </span>
                          </label>
                        </ToolTip> : <label
                          className={clonedSelectedParts.indexOf(subPart.label) >= 0 ? "listing-wrapper active" : "listing-wrapper"}
                          style={isEdit ? editCode.includes(subPart.code) ? null : disbaleItemsStyle : null}
                          onClick={() => onShowDynamicModal(subPart)}>
                            <input type="radio" name="chest-xray" id={subPart.code}
                              checked={clonedSelectedParts.indexOf(subPart.label) >= 0 ? true : false}
                            />
                            <span>
                              {subPart.label}
                              <Correct />
                            </span>
                          </label>
                      }
                    </div>
                  </>
                  : subPart.optionItems && subPart.optionItems.length ?
                    <ul
                      className={clonedCodeList.indexOf(subPart.code) >= 0 ? "xray-options active" : "xray-options"}  >
                      <li>
                        <label className="options-listing-wrapper" >
                          <span>{subPart.label}</span>
                        </label>
                      </li>
                      {
                        subPart.optionItems.map(current => {
                          return current.radioButtons && current.radioButtons.length ?
                            current.radioButtons.map((radiobtn) => {
                              return <li>
                                <label
                                  className="options-listing-wrapper"
                                  onClick={() => onShowDynamicModal(subPart, radiobtn)}
                                  style={isEdit ? editCode.includes(subPart.code) ? null : disbaleItemsStyle : null}
                                >
                                  <input type="radio" name={subPart.label} id={radiobtn.code}
                                    checked={clonedCodeList.indexOf(radiobtn.code) >= 0 ? true : false} />
                                  <span>
                                    {radiobtn.label}
                                    <Correct />
                                  </span>
                                </label>
                              </li>
                            }) : null
                        })
                      }
                    </ul>
                    : null
              }) : null
          }
        </div>
      </div>
    </div>
  )
}
export default MainBodyPart