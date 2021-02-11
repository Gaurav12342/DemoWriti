import React from 'react';
import PropTypes from 'prop-types';
import { Etar, Consent, Emar, VerbalOrder, Ebox, DrugRecord, CarePlan, Xray, ChangeSticker } from '../../assets/images/resident-detail/todo/index';
// import { TODO_ICONS } from '../../constants/prescription'
import { TodoIcons } from './index'
import { SUB_MODULE, ACTIONS, MODULE } from '../../constants/subscription';
import { canPerformAction, isModuleAccessible } from '../../util/common';
import { Spin } from '../../components/common';
import { TODO_ICONS, TODO_CATEGORY, SUB_CATEGORY } from '../../constants/todo'
import { getMappedTodoKey, getIcons } from '../../util/todo'

// const getIcons = (record) => {
//     let subcat = getMappedTodoKey(record.type)
//     if (subcat)
//         return require('../../assets/images/dashboard/' + TODO_ICONS[subcat])
//     else
//         return require('../../assets/images/dashboard/drugs.svg')
// }
const List = (props) => {
    const { todos, loading, dashboardCount, onSetActiveSubCategory, activeSubCategory } = props

    const validationParams = {
        moduleId: MODULE.RX_ORDER,
        subModuleId: SUB_MODULE.RX_ORDER_TODO,
        checkSubAction: ACTIONS.CONSENT_OBTAINED.CODE
    }
    const validationParams1 = {
        moduleId: MODULE.RX_ORDER,
        subModuleId: SUB_MODULE.RX_ORDER_TODO,
        checkSubAction: ACTIONS.CHANGE_STICKER.CODE
    }

    return <>
        <div className="todo-listblock">
            <h2 className="title">To Dos</h2>
            {/* <span className="green" style={{ paddingLeft: '20px' }}>
                {dashboardCount}
            </span> */}
            {/* <span className="red">33</span> do not remove this comment */}
        </div>
        <div className="todo-list">
            {
                loading ? <Spin spinning={loading} str="center" />
                    : todos.map(todo => <a className={`media online ${todo.type === activeSubCategory?.type ? ' active' : ''}`}
                        onClick={() => onSetActiveSubCategory(todo)}>
                        <div className="contact-profile">
                            <img src={getIcons(todo)} />
                        </div>
                        <div className="media-body">
                            <h3 className="name">{todo.label}</h3>
                            <span className="green">{todo.value}</span>
                            {/* <span className="red">02</span> do not remove this comment*/}
                        </div>
                    </a>
                    )
            }
            {/* {
                isModuleAccessible(MODULE.TODO) && canPerformAction(validationParams) ?
                    <a href="#" className="media online">
                        <div className="contact-profile">
                            <Consent className="consent" />
                        </div>
                        <div className="media-body">
                            <h3 className="name">Consent</h3>
                            <span className="green">10</span>
                            <span className="red">01</span>
                        </div>
                    </a> : null
            } */}
            {/* 
            {
                isModuleAccessible(MODULE.TODO) && canPerformAction(validationParams1) ?
                    <a href="#" className="media online">
                        <div className="contact-profile">
                            <ChangeSticker className="cs" />
                        </div>
                        <div className="media-body">
                            <h3 className="name">Change Sticker</h3>
                            <span className="green">23</span>
                            <span className="red">02</span>
                        </div>
                    </a> : null
            } */}

        </div>

    </>
}
export default List
List.defaultProps = {
    isPrimaryFilter: false
}
List.propTypes = {
    isPrimaryFilter: PropTypes.bool,
    onChangeListview: PropTypes.func
}