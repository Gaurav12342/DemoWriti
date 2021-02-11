import React from 'react'
import { IMAGING_RESULT_STATUS } from '../../../constants/xray'
import {displayDate} from '../../../util/moment'
import ReactHtmlParser from 'react-html-parser'

function STLResponse(props) {
    let { data } = props
    console.log('response data', props)
    return (<div>
        {
            data.xRayResult.length > 0 ?
                <fieldset className="my-fieldset">
                    <legend className="custom-legend">Response</legend>
                    {
                        data.xRayResult.map(resObj =>
                            <>
                                <ul>
                                    <table className="result_table">
                                        <tbody>
                                        <tr>
                                            <td><strong>Filler Order Number:</strong>{resObj.order ? resObj.order.fillerOrderNum : ''}</td>
                                            <td><strong> Status:</strong>{resObj.observationResult && resObj.observationResult.status && IMAGING_RESULT_STATUS.hasOwnProperty(resObj.observationResult.status) ?
                                                IMAGING_RESULT_STATUS[resObj.observationResult.status] : '-'}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Expected Availability Date: </strong>{resObj.order && resObj.order.expectedAvailabilityDate ?
                                               displayDate(resObj.order.expectedAvailabilityDate) : '-'}</td>
                                            <td><strong>Result Inspector:</strong>{`${resObj.observationRequest && resObj.observationRequest.resultInterpreterLastName ? resObj.observationRequest.resultInterpreterLastName : ''} ${resObj.observationRequest && resObj.observationRequest.resultInterpreterFirstName ? resObj.observationRequest.resultInterpreterFirstName : '' || ''}`}</td>
                                        </tr>
                                        <tr colSpan="2">
                                            <td><hr /></td>
                                        </tr>
                                        <tr className="custom_tr" colSpan="2">
                                            {
                                                resObj.observationResult && resObj.observationResult.status && resObj.observationResult.status === 'F' || resObj.observationResult.status === '' && resObj.observationResult.resultValue ?

                                                    <td>{ReactHtmlParser(resObj.observationResult.resultValue)}</td>
                                                    : null
                                            }
                                        </tr>
                                        </tbody>
                                    </table>
                                </ul>
                            </>
                        )
                    }
                </fieldset>
                : null
        }
    </div>)
}
export default STLResponse