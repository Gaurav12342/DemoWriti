import React, { Component } from 'react'
import './detailViewCss.css'
function STLRequest(props) {
    let { data } = props
    console.log('request data', data)
    return (
        <fieldset className="my-fieldset request">
            <legend className="custom-legend" >Request</legend>
            <ul className="listDotes">
                {
                    data.selectedOptions && Object.keys(data.selectedOptions).length ?
                        Object.keys(data.selectedOptions).map((key, i) => {

                            return <li style={{ listStyleType: 'none' }}>
                                {
                                    data.selectedOptions[key].isClickable ?
                                        <span>
                                            <span className="key"><strong>{i + 1}.{key}</strong></span><br />
                                            <span className="key-option">{data.selectedOptions[key].items}</span>
                                            
                                        </span>
                                        : <div >
                                            <span className="key"><strong>{i + 1}.{key}</strong></span><br />
                                            <span>
                                                {
                                                    Object.keys(data.selectedOptions[key]).map((subKey, j) => {
                                                        return <span>
                                                            <span className="subkey">{j + 1}.{subKey}</span><br />
                                                            <span className="subkey-option">{data.selectedOptions[key][subKey].optionItems}</span>
                                                            <br />
                                                        </span>
                                                    })
                                                }

                                            </span>

                                        </div>
                                }
                            </li>
                        }) : null
                }
            </ul>
        </fieldset>
    )
}
export default STLRequest