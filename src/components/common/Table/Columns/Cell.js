import React from 'react'
import PropTypes from 'prop-types';
import { Filters } from '../../../../assets/images/resident-detail/index'
import { Sort, Refresh } from '../../../../assets/images/pmr/index'
import Popover from 'react-tiny-popover';
function Column(props) {
    const { column, getContent, isOnFilter, setOnFilter, setSorter, onTableReafresh } = props
    return (
        <>
            <th className="p_head" style={column.style ? column.style : null}>
                <div className="p_head_container">
                    <span>{column.title || ' '}</span>
                    {
                        column && column.showRefresh ? <div className="refresh">
                            <a>
                                <Refresh onClick={onTableReafresh} />
                            </a>
                        </div> : null
                    }
                    {/* {
                        column && column.showLessDetail ? <div className="refresh">
                            <a>
                                <DetailsLess />
                            </a>
                        </div> : null
                    } */}
                    {
                        column && column.filters && <Popover
                            containerStyle={{ top: '50px', overflow: 'visible' }}
                            isOpen={isOnFilter}
                            content={getContent}>
                            <Filters onClick={setOnFilter} />
                        </Popover>
                    }
                    {
                        column && typeof column.sorter === 'function' ?
                            <Sort onClick={() => setSorter(column.dataIndex)} /> : null
                    }
                </div>
            </th>
        </>
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
        filters: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number])
        })).length
    })
}