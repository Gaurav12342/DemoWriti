import React, { Component } from 'react';
import { Button } from '../../../components/common/index'
import Modal from '../../../components/common/Popup/index'
import STLRequest from './STLRequest'
import STLResponse from './STLResponse'
import { IMAGING_DIAGNOSTIC_STATUS } from '../../../constants/xray';
import { Toast } from '../../../components/common/index';
import { getXrayPDF } from '../../../services/api/routes/x_ray';
import axios from '../../../services/api/config'
class DetailViewStl extends Component {

    state = {
        downloadButton: false
    }
    handleCancel = () => {
        this.props.onCancel(false, null)
    }
    downLoadXrayPdf = () => {
        this.setState({
            downloadButton: true
        })

        axios({ ...getXrayPDF, data: { xrayid: this.props.data.id } }).then(data => {
            if (data.statusText === "OK") {
                let a = document.createElement('a');
                a.download = "x-ray-result.pdf";
                a.href = data.data.data[0].path
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                this.setState({
                    downloadButton: false
                })
            }
            else {
                Toast.error('Something went wrong ')
                this.setState({
                    downloadButton: false
                })
            }

        }).catch(error => {
            this.setState({
                downloadButton: false
            })
        })




    }
    render() {
        const { data, isVisible, onCancel } = this.props

        return (
            <Modal
                maskClosable={false}
                width={750}
                visible={isVisible}
                onOk={this.handleCancel}
                onCancel={this.handleCancel}
                title={<div>
                    <span>{data.title}</span>
                    <span className="request_no">{data.requestNo}</span>
                </div>}
                footer={[
                    <>
                        <Button className='screen-btn gray-btn' type="primary">Print</Button>
                        {
                            data.status === IMAGING_DIAGNOSTIC_STATUS.COMPLETED ?
                                <Button className='screen-btn' key="submit"
                                    loading={this.state.downloadButton}
                                    onClick={this.downLoadXrayPdf}>
                                    Download
                            </Button> : null
                        }
                    </>
                ]}>
                <div >
                    <STLRequest data={data}></STLRequest>
                    <STLResponse data={data}></STLResponse>
                </div>
            </Modal>
        );
    }
}

export default DetailViewStl;