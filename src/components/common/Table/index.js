import React, { useState, useEffect } from 'react'
import Columns from './Columns'
import PropTypes from 'prop-types'
import Rows from './Rows'
import Pagination from './Pagination/Pagination'
import DisplayNodata from './NoData';

const _ = require('lodash')
const sort = {
    ASC: 'ASC',
    DESC: 'DESC'
}
function Table(props) {

    const { columns, filter, datasource, pagination, onChange, resultCol, loading, onShowSizeChange,
        showResult, style, rowClassName, rowId, setStylesToColumn, renderSubTable } = props
    const [C_columns, setColumns] = useState([])
    const [D_dataSource, setDataSource] = useState([])
    const [filterChanged, setFilterChanged] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [P_Pagination, setPagination] = useState(null)
    const [isOnFilter, SetIsOnFilter] = useState(false)
    const [addedFilters, setAddedFilters] = useState({})
    const [range, setRange] = useState([])
    const [addedSorter, setAddedSorters] = useState({})

    useEffect(() => {
        setColumnsAndRows()
        setLoading(true)
        setDefaultPagination()
    }, [])

    useEffect(() => {
        if (isLoading) {
            setLoading(false)
        }
    }, [C_columns, D_dataSource])

    useEffect(() => {
        if (P_Pagination) {
            if (P_Pagination.total !== pagination.total) {
                setDefaultPagination()
            }
            else if (P_Pagination.page !== pagination.page) {
                setDefaultPagination()
            }
            else if (P_Pagination.limit !== pagination.limit) {
                setDefaultPagination()
            }
        }
    }, [pagination])

    useEffect(() => {
        if (!filterChanged && Object.keys(addedFilters).length > 0) {
            setFilterChanged(true)
        }
        upDateData()
    }, [addedFilters])

    useEffect(() => {
        upDateData()
    }, [addedSorter])

    useEffect(() => {
        upDateData()
    }, [loading])

    useEffect(() => {
        setData(datasource)
        setColumnsAndRows()
    }, [datasource])

    const upDateData = () => {
        if (!(D_dataSource && D_dataSource.length)) {
            setData(_.cloneDeep(datasource))
        }
        else {
            setData(D_dataSource)
        }
    }
    const setDefaultPagination = () => {
        if (Object.keys(pagination).length) {
            let tempRange = Array.from(Array(pagination.pageSize).keys())
            setRange(tempRange)
            setPagination({ current: 1, pageSize: pagination.pageSize, total: pagination.total })
        }
    }

    const setData = (dataSource) => {
        let dataItems = dataSource
        if (P_Pagination) {
            if ((P_Pagination.total !== pagination.total) ||
                (P_Pagination.pageSize !== pagination.pageSize)
                || P_Pagination.current !== pagination.current) {
                setPagination({ current: 1, pageSize: pagination.pageSize, total: pagination.total })
            }
        }
        setDataSource(dataItems)
    }

    const sortData = (data) => {
        if (data && data.length) {
            let tempDataSource = [].concat.apply([], data)
            Object.keys(addedSorter).map(key => {
                let sortedResult = tempDataSource.sort((a, b) => {
                    if (typeof a[key] === 'string') {
                        let s1 = a[key].toUpperCase()
                        let s2 = b[key].toUpperCase()
                        if (s1 < s2) {
                            return (addedSorter[key] === sort.ASC) ? -1 : 1
                        }
                        if (s1 > s2) {
                            return (addedSorter[key] === sort.ASC) ? 1 : -1
                        }
                        return 0
                    }
                    else {
                        return addedSorter[key] === sort.ASC ? a[key] - b[key] : b[key] - a[key]
                    }
                })
                tempDataSource = sortedResult
            })
            setData(tempDataSource)
        }
    }
    const setFilter = (isChecked, val, dataIndex) => {
        let temp = addedFilters[dataIndex]
        if (temp) {
            let index = temp.indexOf(val)
            if (isChecked) {
                if (index < 0) {
                    temp.push(val)
                }
            }
            else if (index >= 0) {
                temp.splice(index, 1)
            }
        }
        if (temp === undefined && isChecked) {
            temp = [val]
        }
        let tempfilter = { ...addedFilters, [dataIndex]: temp }
        setAddedFilters(prevState => ({ ...prevState, [dataIndex]: temp }))

        // setOnFilter(false)
        // handleTableChange(P_Pagination, tempfilter, addedSorter)
    }

    const setColumnsAndRows = () => {
        let tempColumns = []
        columns.forEach(obj => {
            let columnClassname, rowClassname
            if (obj.classname) {
                columnClassname = 'p_head ' + obj.classname
                rowClassname = 'patient_order_d ' + obj.classname
            }
            else {
                columnClassname = 'p_head'
                rowClassname = 'patient_order_d'
            }
            if (obj.width) {
                obj.style = { width: obj.width }
            }

           // obj.filters && obj.filters.map((filterData) => {
                // setFilter(filterData.val, filterData.text
                //     , filterData.defaultCheack);
                //setFilter(filterData.defaultChecked, filterData.value, obj.dataIndex);
                //console.log('filterData',filterData)
           // })
            tempColumns.push({ ...obj, columnClassname, rowClassname })
        })
        setColumns(tempColumns)
    }

    const clearFilter = (dataIndex) => {
        setLoading(true)
        setOnFilter(false)
        let tempAddedFilters = _.cloneDeep(addedFilters)
        let shouldClear = Object.keys(tempAddedFilters).length > 0
        if (tempAddedFilters[dataIndex]) {
            delete tempAddedFilters[dataIndex]
        }
        setAddedFilters(tempAddedFilters)
        if (pagination) {
            if (shouldClear) {
                let tempPagination = { ...P_Pagination, current: 1, total: datasource.length }
                setPagination(tempPagination)
                handleTableChange(tempPagination, tempAddedFilters, addedSorter)
            }
        }
        else {
            handleTableChange(null, tempAddedFilters, addedSorter)
        }
        setData(_.cloneDeep(datasource))
    }

    const setSorter = (key) => {
        let tempSorter = addedSorter
        if (tempSorter[key]) {
            tempSorter[key] = tempSorter[key] === sort.DESC ? sort.ASC : sort.DESC
        }
        else {
            tempSorter[key] = sort.ASC
        }
        setAddedSorters(tempSorter)
        let tempPagination = null
        if (pagination) {
            tempPagination = _.cloneDeep(P_Pagination)
            tempPagination.current = 1
            setPagination(tempPagination)
        }
        handleTableChange(tempPagination, addedFilters, tempSorter)
        sortData(D_dataSource)
    }

    const handleTableChange = (pagination, filter, sorter) => {
        if (onChange) {
            onChange(pagination, filter, sorter)
        }
    }
    const onPageChange = (pageNo) => {
        const { pageSize, total } = P_Pagination
        const tempPagination = {
            current: pageNo,
            pageSize,
            total
        }
        let tempRange = []
        for (let i = 0; i < pageSize; i++) {
            tempRange.push(i)
        }
        setRange(tempRange)
        setPagination(tempPagination)
        handleTableChange(tempPagination, addedFilters, addedSorter)
    }

    const setOnFilter = () => {
        if (isOnFilter) {
            if (filterChanged) {
                handleTableChange(P_Pagination, addedFilters, addedSorter)
                setFilterChanged(false)
            }
        }
        SetIsOnFilter(state => !state)
    }

    const handleTableReafresh = () => {
        clearState()
    }

    const clearState = () => {
        setDefaultPagination()
        SetIsOnFilter(false)
        setAddedFilters({})
        setAddedSorters({})

        handleTableChange({
            current: 1,
            pageSize: pagination.pageSize,
            total: pagination.total
        }, {})
    }

    const handleSizeChange = (val) => {
        if (typeof val === 'string') {
            val = parseInt(val)
        }
        setLoading(true)
        setPagination(prevPagination => ({
            ...prevPagination, pageSize: val
        }))
        if (pagination && pagination.onShowSizeChange) {
            pagination.onShowSizeChange(val)
        }
    }

    let currentPage = 1
    if (P_Pagination && P_Pagination.current && D_dataSource) {
        currentPage = P_Pagination.current
    }

    let pageRangeDisplayed = 1
    if (P_Pagination && P_Pagination.total && P_Pagination.total > P_Pagination.pageSize) {
        pageRangeDisplayed = parseInt(P_Pagination.total / P_Pagination.pageSize)
        let mod = (P_Pagination.total % P_Pagination.pageSize)
        if (mod > 0) {
            pageRangeDisplayed += 1
        }
    }
    return (
        <>
            <div className={props.noLRPad ? 'data_table_wrap no_lr_pad' : 'data_table_wrap'} style={style ? style : null}>
                <div className="data_table_cotainer">
                    <table className="data_table">
                        {
                            isLoading || isLoading ? <DisplayNodata loading={isLoading || isLoading} />
                                : <>
                                    <>
                                        <Columns {...props}
                                            columns={C_columns}
                                            setSorter={setSorter}
                                            addedFilters={addedFilters}
                                            isOnFilter={isOnFilter}
                                            setOnFilter={setOnFilter}
                                            setFilter={setFilter}
                                            clearFilter={clearFilter}
                                            filterDataSource={setOnFilter}
                                            onTableReafresh={handleTableReafresh}
                                        />
                                    </>
                                    {/* <div className="scroll_wrapper"> */}
                                    {
                                        loading || isLoading ?
                                            < DisplayNodata loading={loading || isLoading ? true : false} />
                                            :
                                            datasource && datasource.length ?
                                                D_dataSource && D_dataSource.length ?
                                                    <Rows columns={C_columns}
                                                        rowId={rowId}
                                                        showResult={showResult}
                                                        isData={datasource}
                                                        resultCol={resultCol}
                                                        renderSubTable={renderSubTable}
                                                        datasource={pagination ? D_dataSource : D_dataSource}
                                                        range={range}
                                                        rowClassName={rowClassName}
                                                        setStylesToColumn={setStylesToColumn} />
                                                    : null
                                                : <DisplayNodata />

                                    }
                                    {/* </div>  */}
                                </>
                        }
                    </table>
                </div>
            </div>
            {
                loading ? null :
                    D_dataSource && D_dataSource.length && P_Pagination ?
                        <div style={{ display: 'inline' }}>
                            <Pagination
                                total={P_Pagination.total}
                                pageRangeDisplayed={pageRangeDisplayed}
                                itemsCountPerPage={P_Pagination.pageSize}
                                activePage={P_Pagination.current}
                                onPageChange={onPageChange}
                                pagination={pagination}
                                onSizeChange={handleSizeChange}
                            />
                        </div> : null
            }
        </>
    )
}
export default Table
Table.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    datasource: PropTypes.arrayOf(PropTypes.object).isRequired,
    filter: PropTypes.shape({
        page: PropTypes.number.isRequired,
        limit: PropTypes.number.isRequired,
        filter: PropTypes.object
    }),
    pagination: PropTypes.shape({
        pageSize: PropTypes.number,
        total: PropTypes.number,
        showSizeChanger: PropTypes.bool,
        onShowSizeChange: PropTypes.func,
    })
}
