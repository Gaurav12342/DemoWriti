import React, { Component } from 'react';
import { Modal, Button } from 'antd'
import './detailViewCss.css'
import STLRequest from './STLRequest'
import STLResponse from './STLResponse'
class DetailViewStl extends Component {

    handleCancel = () => {
        this.props.onCancel(false, null)
    }
    render() {
        const { data, isVisible, onCancel } = this.props
        // let xRayResult = [
        //     {
        //         id: "5f19467d7730f73ade17dda1",
        //         application: "DT1",
        //         dateTime: "2011-01-19 10:02:14",
        //         patient: {
        //             patId: "",
        //             patInternalId: "PATID1234",
        //             firstName: "SMITH",
        //             lastName: "JOHN",
        //         },
        //         visit: {
        //             visitNum: "",
        //             pointOfCare: "RR",
        //             preadmitNum: "",
        //             attendingDrId: "",
        //             referringDrId: "",
        //             referringDrLastName: "",
        //             referringDrFirstName: "",
        //             preAdmitTest: "",
        //             readmission: "",
        //         },
        //         order: {
        //             placerOrderNum: "533264",
        //             fillerOrderNum: "RR590441-533264",
        //             status: "ZZ",
        //             quantity: "",
        //             actionBy: "",
        //             expectedAvailabilityTime: "",
        //             expectedAvailabilityDate: "",
        //         },
        //         observationRequest: {
        //             serviceIdentifier: "X221",
        //             serviceText: "LEFT FIRST FINGER",
        //             priority: "RO",
        //             dateTime: null,
        //             endDateTime: null,
        //             dangerCode: "",
        //             specimenReceivedDateTime: null,
        //             bodySite: "HANDS AND WRISTS",
        //             siteModifier: "",
        //             resultUpdateDateTime: null,
        //             resultInterpreterId: "345344",
        //             resultInterpreterLastName: "RADLNAME",
        //             resultInterpreterFirstName: "RADFNAME",
        //         },
        //         observationResult: {
        //             valueType: "",
        //             resultValue: "LEFT THUMB:<br><br>There is no evidence of bone fracture or other abnormality<br><br>",
        //             referenceRange: "",
        //             abnormalFlag: "",
        //             status: "F",
        //             dateTime: "2006-05-04 00:00:",
        //             method: "",
        //         }
        //     }]
        // data.xRayResult = xRayResult
        return (
            <Modal maskClosable={false}
                width={750}
                className={data.title}
                visible={isVisible}
                onOk={this.handleCancel}
                onCancel={this.handleCancel}
                title={<div>
                    <strong>{data.title}</strong>
                    <strong className="request_no">{data.requestNo}</strong>
                </div>}
                footer={[
                    <>
                        <Button type="primary">Print</Button>
                        <Button key="submit" >
                            Download
                            </Button>
                    </>
                ]}
            >
                <div className="">
                    <STLRequest data={data}></STLRequest>
                    <STLResponse data={data}></STLResponse>
                </div>

            </Modal>
        );
    }
}

export default DetailViewStl;