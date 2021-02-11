import React from 'react'
import Rows from './Rows'
import PropTypes from 'prop-types'
function RowsMain(props) {
    const { columns, datasource, range, isData, showResult, resultCol, rowId, renderSubTable } = props
    // console.log("TCL: RowsMain -> datasource", datasource

    return (<>{
        datasource && datasource.length > 0 ? datasource.map((currentRow, i) => <Rows key={'row' + i}
            rowId={rowId}
            index={range && range[i] ? range[i] : i}
            isData={isData}
            resultCol={resultCol}
            renderSubTable={renderSubTable}
            showResult={showResult}
            record={currentRow}
            {...props} />) : null
    }</>)
}
export default RowsMain
RowsMain.protoTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        columnClassname: PropTypes.string,
        style: PropTypes.object,
        dataIndex: PropTypes.string.isRequired,
        render: PropTypes.func,
        title: PropTypes.string.isRequired
    })).isRequired,
    datasource: PropTypes.arrayOf(PropTypes.object)
}
