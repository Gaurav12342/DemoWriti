import React from 'react'
import Columns from './Column'
import PropTypes from 'prop-types'

function ColumnMain({ columns, addedFilters, cols, setFilter, clearFilter, setSorter, isOnFilter, getFilterRenderUI, setOnFilter, filterDataSource, onTableReafresh }) {
    return (
        <thead>
            <tr>
                {
                    columns.length > 0 ? <>{
                        columns.map((obj, i) => <Columns
                            isOnFilter={isOnFilter}
                            setFilter={setFilter}
                            clearFilter={clearFilter}
                            setOnFilter={setOnFilter}
                            cols={cols}
                            setSorter={setSorter}
                            addedFilters={addedFilters}
                            filterDataSource={filterDataSource}
                            getFilterRenderUI={getFilterRenderUI}
                            onTableReafresh={onTableReafresh}
                            key={'col' + i} column={obj} />)
                    }
                    </> : null
                }
            </tr>
        </thead>)
}
export default ColumnMain
ColumnMain.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        columnClassname: PropTypes.string,
        style: PropTypes.object,
        dataIndex: PropTypes.string,
        render: PropTypes.func,
        title: PropTypes.string.isRequired
    })).isRequired
}
