import React from 'react';
import { useTable, usePagination } from 'react-table';
import { Refresh } from '../../../../assets/images/pmr';
import DisplayNoData from '../../../../components/common/Table/NoData';
import Pagination from '../../../../components/common/Table/Pagination/Pagination';

const Table = ({ columns, data, onTableRefresh, isLoading }) => {

  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 15, pageIndex: 0 }
    },
    usePagination
  )

  return (
    <div>
      <div className='data_table_cotainer'>
        <table {...getTableProps({ className: 'data_table' })} >
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>
                    <div className='p_head_container'>
                      {column.render("Header")}
                      {!!column.hasRefresh &&
                        <Refresh onClick={onTableRefresh} />
                      }
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          {
            (!page || page.length === 0 || isLoading) ?
              <DisplayNoData loading={isLoading} /> :
              page.map((row, i) => {
                prepareRow(row);
                return (
                  <tbody {...getTableBodyProps()}>
                    <tr {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return (
                          <td {...cell.getCellProps()}>
                            <div className='patient_order_d'>
                              {cell.render("Cell")}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                );
              })}
        </table>
      </div>
      {
        !isLoading && !!rows && !!rows.length &&
        <div style={{ display: 'inline' }}>
          <Pagination
            total={rows.length}
            itemsCountPerPage={pageSize}
            activePage={pageIndex + 1}
            pagination={{
              showSizeChanger: true,
              pageSize: pageSize
            }}
            pageRangeDisplayed={5}
            onPageChange={val => gotoPage(Number(val - 1))}
            onSizeChange={val => setPageSize(Number(val))}
          />
        </div>
      }
    </div>
  );

}

export default Table;