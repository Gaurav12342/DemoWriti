import React, { useState, useEffect } from 'react';
import { createForm, formShape } from 'rc-form';
import { Trash, Edit, PlusBtn } from '../../../assets/images/resident-detail/index';
import { Search, ConfirmPopup, Spin } from '../../../components/common'
import InfiniteScroll from 'react-infinite-scroller';

const PermissionsSidebar = (props) => {
    const { listData, onDelete, onEdit, onSelect, onInfiniteOnLoad, onAdd, edit, detail, listLoader,
        hasMore, loading, onSearch, isRole
    } = props
    const [selected, setSelected] = useState()
    const [record, setRecord] = useState()
    const [visible, setVisible] = useState(false)
    let scrollParentRef = null
    const str = isRole ? 'Role Permission' : 'Subscription'

    const handleInfiniteOnLoad = (page) => {
        // let arr = [...residentData]
        // arr = arr.concat(data1)
        // if (arr.length === 18)
        //     setHasMore(false)
        // setResidentData(arr)
        onInfiniteOnLoad()
    }

    const handleEdit = (e, data) => {
        e.stopPropagation();
        onEdit(data)
    }

    const handleDelete = (e, data) => {
        e.stopPropagation();
        setRecord(data)
        setVisible(true)
    }

    const handleSelect = (data) => {
        onSelect(data)
    }

    const handleSearch = (val) => {
        onSearch(val)
    }

    return (<>
        <div className="permissions_sidebar">
            <div className="search_wrap">
                <form>
                    <div className="form_group">
                        <Search style={{ width: '100%' }}
                            placeholder={`Search ${str}`}
                            onChange={(e) => handleSearch(e.target.value)}
                            allowClear
                        />
                    </div>
                </form>
            </div>
            {/* <div className="permission_group_wrapper"> */}
            <div className="permission_group_wrapper" ref={(ref) => scrollParentRef = ref}>
                {
                    listLoader ? <Spin spinning={listLoader} str='center' />
                        : listData && listData.length ?
                            <InfiniteScroll
                                pageStart={0}
                                initialLoad={false}
                                loadMore={handleInfiniteOnLoad}
                                hasMore={hasMore && !listLoader && !loading}
                                // loader={loaddetailing ? <Spin spinning={loading} str='center autoheight' /> : null}
                                useWindow={false}
                                threshold={20}
                                getScrollParent={() => scrollParentRef}
                            >
                                {
                                    listData.map(x => {
                                        return <div key={x._id}
                                            onClick={() => handleSelect(x)}
                                            className={`group_content ${detail && detail._id === x._id ? ' active' : ''} 
                                ${edit && detail && detail._id === x._id ? ' edit_mode' : ''}`}>
                                            <p>{x.name}</p>
                                            <div className="group_opt">
                                                {
                                                    edit && detail && detail._id === x._id ? null :
                                                        <>
                                                            <a onClick={(e) => handleEdit(e, x)}>
                                                                <Edit />
                                                            </a>
                                                            <a onClick={(e) => handleDelete(e, x)}>
                                                                <Trash />
                                                            </a>
                                                        </>
                                                }
                                            </div>
                                        </div>
                                    })
                                }
                                {loading ? <Spin spinning={loading} str='center autoheight' /> : null}
                            </InfiniteScroll> :
                            <p className="text-center">No Data</p>
                }
            </div>
            <div className="add_permission" onClick={onAdd}>
                <PlusBtn />
                <h3>Add {str}</h3>
            </div>
        </div>
        {visible &&
            <ConfirmPopup style={{ width: '550px' }}
                visible={visible}
                title={`Are you sure, you want to delete subscription ${record.name} ?`}
                onOk={() => {
                    onDelete(record)
                    setVisible(false)
                    setRecord(null)
                }}
                onCancel={() => setVisible(false)} />
        }
    </>);
}
export default PermissionsSidebar;