import React from 'react'
import NoData from '../../../containers/ResidentDetail/View/noData'
import Spin from 'rc-spinner'
import './NoData.css'
function DisplayNoData({ loading }) {
    return (<tbody><tr>
        <td colSpan="100%">
            <div className="content">
                <div className="inner">
                    {
                        loading ? <Spin color='#309ed1' height={40} /> : <NoData />
                    }
                </div>
            </div>
        </td>
    </tr>
    </tbody>
    )
}
export default DisplayNoData
