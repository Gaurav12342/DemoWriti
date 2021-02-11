import React, { } from 'react';
import { Dialog, Button } from '../../../components/common';

const DetailView = (props) => {
    const { visible, onCancel, detail, } = props
    const { homeData, homeAreaData } = detail

    return (
        <Dialog
            visible={visible}
            title={homeData ? `${homeData.facilityName}(${homeData.facId})` : ''}
            onCancel={onCancel}
            cancelText='Close'
            isClose={true}
            width={650}
        >
            {
                homeData ?
                    <div className="detail-view form_row">
                        <div className="col-6">
                            <label>Phone : </label>{homeData ? homeData.phone : ''}
                        </div>
                        <div className="col-6">
                            <label>Fax : </label>{homeData ? homeData.fax : ''}
                        </div>

                        <div className="col-12">
                            <label>Address : </label>
                            <div>
                                <div>{homeData.addressLine1 || ''} </div>
                                <div>{homeData.addressLine2 || ''}</div>
                                <div>
                                    {homeData.city || ''} , {homeData.state || ''} , {homeData.country || ''} , {homeData.postalCode || ''}
                                </div>
                            </div>
                        </div>

                        {
                            homeData.mappedAs ?
                                <div className="col-12">
                                    <hr></hr>
                                    <label>Mapped Floors</label>
                                    <table style={{ width: '550px', marginTop: '15px' }} >
                                        <tr>
                                            <th >PointClickCare Facility</th>
                                            <th >Writi Home</th>
                                        </tr>
                                        <tr>
                                            <td>{homeData.facilityName || '-'}</td>
                                            <td>{homeData && homeData.mappedWith ? homeData.mappedWith.name : '-'}</td>
                                        </tr>
                                    </table>
                                    <table style={{ width: '550px', marginTop: '10px' }}>
                                        <tr>
                                            <th>PointClickCare Floor</th>
                                            <th>Writi HomeArea</th>
                                        </tr>
                                        {
                                            homeAreaData.map(homeArea => {
                                                return <tr>
                                                    <td>{homeArea.floorDesc || '-'}</td>
                                                    <td>{homeArea && homeArea.mappedWith ? homeArea.mappedWith.name : '-'}</td>
                                                </tr>
                                            })
                                        }
                                    </table>
                                </div> : null
                        }
                    </div>
                    : <div>
                        <p className="text-center">No detail found</p>
                    </div>
            }
        </Dialog>
    );
}

export default DetailView; 