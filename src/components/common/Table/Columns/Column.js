import React from 'react'
import PropTypes from 'prop-types';
import Cell from './Cell'


function Column(props) {
    const { column, setSorter, isOnFilter, setOnFilter, addedFilters, onTableReafresh, setFilter, clearFilter,
        filterDataSource } = props

    const getContent = () => {
        return getFilterRenderUI(column)
    }
    const isSelected = (value, key) => {
        if (addedFilters && addedFilters[key] && addedFilters[key].length && addedFilters[key].indexOf(value) >= 0) {
            return true
        }
        return false
    }
    const getFilterRenderUI = (column) => {
        return (<div className="tab_filer" style={{ marginTop: '35px', marginLeft: '250px' }}>
            <ul>
                {
                    column.filters.map((cur, i) => (<li key={'filterKey' + i}>
                        <label className="filter_check" >
                            <input type="checkbox"
                                id={cur.value}
                                defaultChecked={isSelected(cur.value, column.dataIndex)}
                                onClick={(e) => setFilter(e.target.checked, cur.value, column.dataIndex)} />
                            <span className="checkbox"></span>
                            <span className="lbl">{cur.text}</span>
                        </label>
                    </li>))
                }
            </ul>
            <div className="filter_opt">
                <span onClick={() => clearFilter(column.dataIndex)}>Reset</span>
                <button className="btn btn-sm primary-btn" onClick={filterDataSource}>OK</button>
            </div>
        </div>
        )
    }
    return (
        <Cell
            getContent={getContent}
            isOnFilter={isOnFilter}
            setOnFilter={setOnFilter}
            setSorter={setSorter}
            onTableReafresh={onTableReafresh}
            {...props} />
    )
}
export default Column
Column.defaultProps = {
    column: {}
}
Column.prototype = {
    column: PropTypes.shape({
        title: PropTypes.string,
        classname: PropTypes.string,
        style: PropTypes.object,
        dataIndex: PropTypes.string.isRequired,
        filters: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
            defaultChecked: PropTypes.bool,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number])
        })).length
    })
}