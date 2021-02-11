import React, { useEffect } from 'react'
import Row from './Row'
import { Nodata } from '../../../../assets/images'
import { capitalizeStr } from '../../../../util/common'
import {
    Notes,
    Reminder
} from '../../../../assets/images/pmr/index';

function Rows(props) {
    const { renderSubTable, record, columns, index, getRenderUI, isData, showResult, resultCol, rowClassName, rowId, setStylesToColumn } = props
    const getkeyData = (key) => {
        if (record && record[key]) {
            return record[key]
        }
        else {
            return ''
        }
    }
    const getRenderProps = (curColumnData) => {
        if (curColumnData) {
            let renderProps
            let text = getkeyData(curColumnData.dataIndex)
            if (curColumnData.render) {
                renderProps = curColumnData.render(text, record, index)
            }
            else {
                renderProps = text
            }
            return renderProps
        }
        return null
    }
    return (
        <>
            <tbody>
                <tr className={rowId === index ? rowClassName : null}  >
                    {
                        isData && isData.length ?
                            columns.map((col, i) => {
                                return <Row key={'cell' + i} children={getRenderProps(col)} index={index} col={col} record={record} setStylesToColumn={setStylesToColumn} />
                            }) : <Nodata />
                    }
                </tr>{
                    showResult && resultCol && resultCol.length > 0 ?
                        <tr>
                            <td colSpan="12" className="no_pad">
                                <table style={{ width: "100%" }}>
                                    <tr>
                                        <>
                                            <td>
                                                <div className="patient_order_desc">
                                                    {
                                                        resultCol.map((ccol, i) => {
                                                            const key = typeof ccol === 'string' ? ccol : ccol.key;
                                                            const width = typeof ccol === 'object' ? ccol.width : 'auto';
                                                            return <>
                                                                {record && record[key] && record[key].length > 0 ?
                                                                    <div class="p_desc" style={{ width }}>
                                                                        <>
                                                                            <h4>{capitalizeStr(key)}</h4>
                                                                            <ol style={i > 0 ? { listStyleType: 'none' } : null}>
                                                                                {record[key].map((obj, i) => {
                                                                                    if (typeof obj === 'string') {
                                                                                        return <li>
                                                                                            {obj || '-'}
                                                                                        </li>
                                                                                    } else {
                                                                                        if (ccol.key === 'Actions') {
                                                                                            return <div>
                                                                                                {renderSubTable(obj, record)}
                                                                                            </div>
                                                                                        }
                                                                                    }
                                                                                })}
                                                                            </ol>
                                                                        </>
                                                                    </div>
                                                                    : null}
                                                            </>
                                                        })}
                                                </div>
                                            </td>

                                        </>

                                    </tr>
                                </table>
                            </td>
                        </tr> : null
                }
            </tbody>
        </>
    )
}
export default Rows
