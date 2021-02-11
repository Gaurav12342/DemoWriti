import React, { Component, useState, useEffect } from 'react';
import { PERMISSION_ACCESS_TYPE, TODOS } from '../../../constants/subscription'
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Move } from '../../../assets/images'


const DragHandle = SortableHandle(() => <div className="drag_icon"><Move /></div>)
const SortableItem = SortableElement(({ visibleAdd, x, mod, submod, handleChange }) => (
    <div className="row_group">
        <div className="title">
            <label className="filter_check">
                <input type="checkbox" name="type" disabled={!visibleAdd}
                    value={x.code}
                    checked={x.isSelect}
                    onChange={(e) => handleChange(submod, e, mod.module)} />
                <span className="checkbox"></span>
                <span className="lbl">{x.label || x.name}</span>
            </label>
        </div>
        {visibleAdd ? <DragHandle /> : null}
    </div>
));

const SortableList = SortableContainer(({ items, handleChange, mod, submod, visibleAdd }) => {
    return (
        <div>
            {items.map((x, i) => (
                <SortableItem key={x.code} index={i} useDragHandle={true}
                    visibleAdd={visibleAdd} mod={mod} submod={submod} x={x}
                    handleChange={handleChange} />
            ))}
        </div>
    );
});

const PermissionsList = props => {
    const { listData, saveLoader, onSetPermission, visibleAdd, onSelection, onSelectAll, isAll, onSortEnd,
        isView } = props

    const selection = (data, mod) => {
        let obj = {
            data: data, module: mod
        }
        onSelection(obj)
    }

    const handleChange = (data, e, mod) => {
        //mod is to identify submodule data
        let code = e.target.value
        let obj = {
            data: data, code: code, module: mod
        }
        onSetPermission(obj)
    };

    const sortEnd = (e, submod, mod) => {
        const { oldIndex, newIndex } = e
        let items = arrayMove(submod.actions, oldIndex, newIndex)
        items.map((x, i) => {
            x.sequence = i + 1
            return x
        })
        let index = mod.subModules.findIndex(x => x.subModule === submod.subModule)
        if (index > -1)
            mod.subModules[index].actions = items
        onSortEnd(mod)
    }

    return <>
        <div className="permissions_list_wrap">
            <div className={`permission_group select-all`} >
                <div className="permission_group_head">
                    <div className='title'>
                        {
                            !isView &&
                            <label className="filter_check">
                                <input type="checkbox" disabled={!visibleAdd} checked={isAll}
                                    onChange={onSelectAll} />
                                <span className="checkbox"></span>
                                <span className="lbl">Select All</span>
                            </label>
                        }
                    </div>
                </div>
            </div>
            {/* <input type="checkbox" indeterminate={true} /> */}
            {
                listData.map(mod => {
                    return <div key={mod.module}
                        className={`permission_group collapsed`} >
                        <div className="permission_group_head">
                            <div className='title'>
                                {
                                    !isView &&
                                    <label className="filter_check">
                                        <input type="checkbox" disabled={!visibleAdd} checked={mod.isSelect}
                                            onChange={(e) => selection(mod)} />
                                        <span className="checkbox"></span>
                                    </label>
                                }
                                <h4>{mod.moduleName}</h4>
                            </div>
                            <div className="apply_permission_container">
                                {mod.actions &&
                                    mod.actions.map((x, i) => {
                                        return <label className="filter_check" key={i}>
                                            <input type="checkbox" name="type" disabled={!visibleAdd}
                                                value={x.code}
                                                checked={x.isSelect}
                                                onChange={(e) => handleChange(mod, e)}
                                            />
                                            <span className="checkbox"></span>
                                            <span className="lbl">{x.label || x.name}</span>
                                        </label>
                                    })
                                }
                            </div>
                        </div>
                        {mod.subModules && mod.subModules.length ?
                            mod.subModules.map(submod => <div className="permission_group_row" key={submod.subModule}>
                                <div className="row_group">
                                    <div className={`title`}>
                                        {!isView &&
                                            <label className="filter_check">
                                                <input type="checkbox" checked={submod.isSelect} disabled={!visibleAdd}
                                                    onChange={(e) => selection(submod, mod.module)} />
                                                <span className="checkbox"></span>
                                            </label>
                                        }
                                        <h4>{submod.subModuleName}</h4>
                                    </div>
                                    <div className="apply_permission_container">
                                        {!TODOS.includes(submod.subModule) && submod.actions &&
                                            submod.actions.map((x, i) => {
                                                return <label className="filter_check" key={i}>
                                                    <input type="checkbox" name="type" disabled={!visibleAdd}
                                                        value={x.code}
                                                        checked={x.isSelect}
                                                        onChange={(e) => handleChange(submod, e, mod.module)} />
                                                    <span className="checkbox"></span>
                                                    <span className="lbl">{x.label || x.name}</span>
                                                </label>
                                            })
                                        }
                                    </div>
                                </div>
                                {
                                    // submod.permissionAccesstype === PERMISSION_ACCESS_TYPE.DATA &&
                                    TODOS.includes(submod.subModule) ?
                                        <div className='row_group_content expand'>
                                            <SortableList items={submod.actions}
                                                useDragHandle={true}
                                                shouldCancelStart={() => {
                                                    if (!visibleAdd)
                                                        return true
                                                    else return false
                                                }}
                                                onSortEnd={(e) => sortEnd(e, submod, mod)}
                                                visibleAdd={visibleAdd} mod={mod} submod={submod}
                                                handleChange={handleChange} />
                                        </div>
                                        : null
                                }
                            </div>
                            ) : null
                        }
                    </div>
                })
            }
        </div>
    </>
}
export default PermissionsList;