import React, { Component, useEffect } from "react";
import { Button, Select, Icon, Input, Row, Col } from 'antd'
import UtilService from '../../../../services/util';
import { TODO_STATUS } from '../../../../constants/Common';

const Option = { Select }
const InputGroup = Input.Group;

const Header = props => {
    const { detail, todo, performToDo } = props

    return (
        <React.Fragment>
            {detail && todo &&
                <Row gutter={16}>
                    <Col span={24}>
                        <div className="gx-module-side-header">
                            <div className="">
                                <p className="gx-mb-0">DOB :{' '}
                                    {
                                        detail.residentId.dob ?
                                            <> {UtilService.displayDateByFormat(detail.residentId.dob)}{' '}
                                                ({UtilService.getAgeByDOB(detail.residentId.dob)} years)</>
                                            : '-'
                                    }
                                </p>
                                {/* <p className="gx-mb-0" style={{ marginTop: '5px' }}>Room No :  {detail.residentId.patientInfoId.nhRoom || '-'}</p> */}
                            </div>
                            <div className="gx-description gx-text-center">
                                <h3 style={{ textTransform: 'capitalize' }}>{detail.residentId.name} ({detail.orderNumber}) </h3>
                            </div>
                            <div className="rightSideBtns">
                                <div style={{ float: 'left', margin: '5px' }}>
                                    {"X-Ray Result"}
                                </div>
                                <Button type="primary"
                                    // disabled={(detail.isEditMode) ? false : !detail.isSave}
                                    onClick={performToDo}>
                                    {todo && todo.status === TODO_STATUS["COMPLETED"] ? 'UNDO' : 'ACK'}
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            }
        </React.Fragment>
    )
}
export default Header