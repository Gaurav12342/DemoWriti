import React from 'react'
import ReactPaginate from "../../ReactPaginate"
import SizeChanger from '../SizeChanger'
function Pagination(props) {
    const { activePage, total, onPageChange, onSizeChange, pageRangeDisplayed, itemsCountPerPage, pagination } = props
    return < div className="pagination_wrap custom"  >
        <ReactPaginate
            activePage={activePage}
            totalItemsCount={total}
            pageRangeDisplayed={pageRangeDisplayed > 5 ? 5 : pageRangeDisplayed}
            itemsCountPerPage={itemsCountPerPage}
            onChange={(pageNo) => onPageChange(pageNo)}
        />
        {
            pagination && pagination.showSizeChanger ?
                <div className="size-changer">
                    <SizeChanger
                        currentLimit={pagination.pageSize}
                        onSizeChange={onSizeChange}
                    /></div> : null
        }

    </div >
}
export default Pagination
