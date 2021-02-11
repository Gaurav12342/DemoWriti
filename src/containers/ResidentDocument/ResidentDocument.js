import React, { Component, memo, useState } from 'react';
import RequestVisitPopup from '../View/popup/request-visit-popup';
import VVRequestDetail from '../View/popup/v-v-request-detail';
import VVAttachment from '../View/popup/v-v-attachments-popup';
import { Refresh, View, Notes, MoreDots, Audit, Reminder } from '../../../assets/images/pmr/index';
import { FirstPage, LastPage, Next, Prev } from '../../../assets/images/index';
import { Filters, Edit, Clarification, CancelVisit, Print } from '../../../assets/images/resident-detail/index';

import '../../../../node_modules/rc-datepicker/lib/style.css';
import { DatePickerInput, } from "../../../../node_modules/rc-datepicker";
import ReactPaginate from '../../../components/common/ReactPaginate';
import Pagination from '../../../components/common/Pagination';

const DigitalBinderTab = () => {

    const [modalState, setModalState] = useState({
        requestModal: false,
        requestDetailModal: false,
        requestAttachmentModal: false
    })

    const toggleModal = (key) => {
        setModalState(mState => ({
            requestModal: false,
            requestDetailModal: false,
            requestAttachmentModal: false,
            [key]: !mState[key]
        }))
    }

    return (
        <div className="resi_treat_content_wrap virtual_visit pmr_tab xray_tab digital_tab">
            <form action="">
                <div className="form_wrap">
                    <div className="components">
                        <div className="ui input">
                            <DatePickerInput
                                displayFormat="DD/MM/YYYY"
                                returnFormat="YYYY-MM-DD"
                                className="my-react-component"
                                defaultValue={new Date()}
                                showOnInputClick
                                placeholder="placeholder"
                                locale="de"
                                iconClassName="calendar icon"
                            />
                        </div>
                    </div>
                    <div className="components search">
                        <input
                            type="text"
                            placeholder="Search By Physician"
                            className="inputForm"
                            onChange={(e) => console.log(e)}
                        />
                    </div>
                    <div className="components">
                        <select className="inputForm select" placeholder="">
                            <option value=""> Search by Rx No. </option>
                            <option value=""> RX1234 </option>
                            <option value=""> RX1234 </option>
                            <option value=""> RX1234 </option>
                        </select>
                    </div>
                </div>
            </form>
            <div className="responsive_scroll_wrap">
                <div className="patient_order_wrap">
                    <div className="patient_order_head">
                        <div className="p_head sr">
                            <div className="p_head_container">
                                <span>Sr. No.</span>
                            </div>
                        </div>
                        <div className="p_head ph">
                            <div className="p_head_container">
                                <span>Type</span>
                                <Filters />
                            </div>
                        </div>


                        <div className="p_head pr">
                            <div className="p_head_container">
                                <span>
                                    Physician
                                </span>
                            </div>
                        </div>
                        <div className="p_head dd">
                            <div className="p_head_container">
                                <span>Date & Time</span>
                            </div>
                        </div>
                        <div className="p_head st">
                            <div className="p_head_container">
                                <span>Status</span>
                                <Filters />
                            </div>
                        </div>

                        <div className="p_head ac">
                            <div className="p_head_container j-space-between">
                                <span>Actions</span>
                                <div className="refresh">
                                    <a>
                                        <Refresh />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        Array(6).fill('').map((v, i) => (
                            <div className="patient_order_detail" >
                                <div className="patient_order_content">
                                    <div className="patient_order_d sr">
                                        <span>01</span>
                                    </div>
                                    <div className="patient_order_d ph">
                                        <span>Rx Order - 123456</span>
                                    </div>

                                    <div className="patient_order_d pr">
                                        <span> Dr. Osvaldo Ardiles </span>
                                    </div>
                                    <div className="patient_order_d dd">
                                        <span> 01st May 2020 | 09:53 am </span>

                                    </div>
                                    {/* <Tags>Submitted</Tags> */}
                                    <div className="patient_order_d st ">
                                        {
                                            i % 2 === 0 ?
                                                <span className="o_status submitted"> Submitted </span>
                                                :
                                                <span className="ph-r-t pink-color"> Edited </span>
                                        }
                                    </div>
                                    <div className="patient_order_d ac">
                                        <div className="actions">
                                            <a onClick={() => toggleModal('requestModal')}>
                                                <View />
                                                <p>View</p>
                                            </a>
                                            <a>
                                                <Notes />
                                                <p>Notes</p>
                                                <span className="notes tot">05</span>
                                            </a>
                                            <a>
                                                <Reminder />
                                                <p>Reminder</p>
                                                <span className="rem tot green-bg">05</span>
                                            </a>
                                            <a>
                                                <Edit />
                                                <p>Edit</p>
                                            </a>


                                            <a className="more">
                                                <MoreDots />
                                                <div className="more_wrap">
                                                    <a>
                                                        <CancelVisit />
                                                        <span>Cancel Rx</span>
                                                    </a>
                                                    <a>
                                                        <Audit />
                                                        <span>Audit</span>
                                                    </a>
                                                    <a>
                                                        <Print />
                                                        <span>Archive</span>
                                                    </a>
                                                    <a>
                                                        <Clarification />
                                                        <span>Clarification</span>
                                                    </a>

                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="pagination_wrap">
                <div className="showing"> Showing 01 to 06 of 1000 entries </div>
                <ReactPaginate totalItemsCount={5} />
                {/* <div className="pagination">
                    <a><FirstPage /></a>
                    <a><Prev /></a>
                    <a className="active_page">01</a>
                    <a>02</a>
                    <a>03</a>
                    <a>04</a>
                    <a>05</a>
                    <a><Next /></a>
                    <a><LastPage /></a>
                </div> */}
            </div>

            {modalState.requestModal &&
                <RequestVisitPopup
                    visible={modalState.requestModal}
                    onClosed={() => toggleModal('requestModal')}
                />
            }
            {modalState.requestDetailModal &&
                <VVRequestDetail
                    visible={modalState.requestDetailModal}
                    onClosed={() => toggleModal('requestDetailModal')}
                />
            }
            {modalState.requestAttachmentModal &&
                <VVAttachment
                    visible={modalState.requestAttachmentModal}
                    onClosed={() => toggleModal('requestAttachmentModal')}
                />
            }
        </div>
    )
}

export default memo(DigitalBinderTab);