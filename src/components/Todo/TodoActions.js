import React, { useState, useEffect, useMemo } from 'react';
import {
  Etar,
  Consent,
  Ebox,
  DrugRecord,
  CarePlan,
  Xray,
  ChangeSticker,
} from '../../assets/images/resident-detail/todo/index';
import { Notes, Reminder } from '../../assets/images/pmr/index';
import { AddNote, Check, View, Call } from '../../assets/images/todo/index';
import POADetail from './POADetail';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap.css';
import {
  TODO_CATEGORY,
  SUB_CATEGORY,
  STATUS,
  MAP_TODOS,
} from '../../constants/todo';
import { SUB_MODULE } from '../../constants/subscription';
import {
  displayDateTime,
  displayDate,
  displayTime,
  currentDate,
} from '../../util/moment';
import { getTodoName, getIcons } from '../../util/todo';
import Confirm from '../common/ConfirmPopup';
import Todo from '../../containers/Todo';
import { NoteUpsert, NoteList } from '../NotesPopup';
import ReminderForm from '../common/Reminder';
import { Spin, Button } from '../common';

import {
  canPerformAction,
  isModuleAccessible,
  checkArrayOfModuleAccessible,
  isDrOrNp,
  getUserNameWithDesignation,
} from '../../util/common';
import { MODULE, ACTIONS } from '../../constants/subscription';
import NotesModal from '../../components/NotesPopup/List';
import ReminderModal from '../../components/ReminderPopup/List';
import { performTodo } from '../../services/api/routes/prescriptionTodo';
const { PMR, NURSE_REVIEW_1, NURSE_REVIEW_2 } = SUB_CATEGORY.MED_REVIEW;
const Actions = (props) => {
  const {
    todoList: propTodoList,
    onPerformTodo,
    category,
    onTodoUpdate,
    loading,
    authUser,
    detail: propDetail,
  } = props;

  let detail = { ...propDetail };
  if (!detail.residentId) {
    detail.residentId = { ...detail.patientId };
  }

  useEffect(() => {
    let tempTodoList = propTodoList
    if (category === TODO_CATEGORY['MED_REVIEW']) {
      tempTodoList = propTodoList.filter(d => ![PMR, NURSE_REVIEW_1, NURSE_REVIEW_2].includes(d.subCategory))
    }
    tempTodoList = tempTodoList.filter(x => {
      let todosParams = {
        moduleId: MODULE.RX_ORDER,
        subModuleId: SUB_MODULE.RX_ORDER_TODO,
        checkSubAction: x.subCategory,
        actionKey: 'value'
      };
      if (category === TODO_CATEGORY['MED_REVIEW']) {
        todosParams.moduleId = MODULE.PMR
        todosParams.subModuleId = SUB_MODULE.PMR_TODO
      }
      if (canPerformAction(todosParams)) {
        return x
      }
    })
    setTodoList(tempTodoList)
  }, [propTodoList])

  const [addNote, setAddNote] = useState(false);
  const [note, setNote] = useState(false);
  const [reminder, setReminder] = useState(false);
  const [reminderObj, setReminderObj] = useState(null);
  const [noteObj, setNoteObj] = useState(null);
  const [notesModal, setNotesModal] = useState(false);
  const [notesFilterOptions, setNotesFilterOptions] = useState({});
  const [reminderFilterOptions, setReminderFilterOptions] = useState({});
  const [reminderModal, setReminderModal] = useState(false);
  const [prescriptionOrderIds, setPrescriptionOrderIds] = useState('');
  const [todoList, setTodoList] = useState([]);
  const currentModalData = React.useRef();

  const todoType =
    category === TODO_CATEGORY['PRESCRIPTION']
      ? SUB_CATEGORY.PRESCRIPTION
      : category === TODO_CATEGORY['MED_REVIEW']
        ? SUB_CATEGORY.MED_REVIEW
        : null;

  const disableStyle = {
    pointerEvents: 'none',
    opacity: '0.5'
  }

  const canPerformTodo = useMemo(() => {
    const performTodoParams = {
      moduleId: MODULE.TODO,
      actiontoCheck: ACTIONS.YES_NA.CODE,
    };
    if (isModuleAccessible(MODULE.TODO) && canPerformAction(performTodoParams)) {
      return true
    }
  }, [category])

  const canUndoTodo = useMemo(() => {
    const performTodoParams = {
      moduleId: MODULE.TODO,
      actiontoCheck: ACTIONS.UNDO.CODE,
    };
    if (isModuleAccessible(MODULE.TODO) && canPerformAction(performTodoParams)) {
      return true
    }
  }, [category])

  const text = (todo) => (
    <span className='tooltip-desc'>
      <p className='desc-1'>
        {todo.subCategory === todoType['VERBAL_ORDER'] &&
          todo.completedBy._id !== detail.physicianId?._id
          ? 'Co-Signed'
          : ''}{' '}
        By{' '}
        {
          getUserNameWithDesignation(todo.completedBy)
        }{' '}
        at {displayDateTime(todo.completedAt)}
      </p>
    </span>
  );

  const performTodo = (todo, type, notApplicable) => {

    if (isAllowTodo(todo, type === 'check' ? 'yes' : ''))
      return
    let request = {
      todoId: todo._id,
      undo: type === 'undo',
      date: displayDate(Date.now()),
      time: displayTime(Date.now()),
      notApplicable: notApplicable || false,
      checkType: todo.subCategory,
    };
    if (category == TODO_CATEGORY.MED_REVIEW) {
      request = {
        ...request,
        pmrId: detail._id,
        todoType: todo.subCategory,
      }
      delete request.todoId
      delete request.checkType
    }
    if (type === 'undo') {
      Confirm({
        visible: true,
        title: `Are you sure you want to undo '${getTodoName(
          todo.category,
          todo.subCategory
        )}'?`,
        onOk: onPerformTodo(request),
      });
    } else {
      onPerformTodo(request);
    }
  };

  const visibleAddNote = (visible, data) => {
    if (visible) {
      setNoteObj({});
    } else setNoteObj(null);
    if (data) onTodoUpdate(data);
    setAddNote(visible);
  };

  const visibleNote = (visible, data) => {
    if (visible) {
      setNoteObj({});
    } else setNoteObj(null);
    if (data) onTodoUpdate(data);
    setNote(visible);
  };

  const visibleReminder = (visible, data) => {
    if (visible) {
      setReminderObj({});
    } else setReminderObj(null);
    if (data) onTodoUpdate(data);
    setReminder(visible);
  };

  const isAllowTodo = (todo, str) => {
    let allowed = true;
    //check verbal order condition in N/A and UNDO
    if (str !== 'yes' && MAP_TODOS['VERBAL_ORDER'].includes(todo.subCategory))
      allowed = false;
    if (str === 'yes' && MAP_TODOS['VERBAL_ORDER'].includes(todo.subCategory)) {
      //verbal order for YES and NURSE login
      allowed = !!isDrOrNp(authUser)
    }
    if (todo.excludedParticipants?.length > 0) {
      //for excluded participants do not allow 
      allowed = !todo.excludedParticipants.find(x => {
        return x.userId === authUser._id && x.active
      })
    }
    return !allowed; //disable on return true (allowed flag should be false)
  };

  const createNotesModal = (record) => {
    let obj = {
      prescriptionOrderId:
        category == TODO_CATEGORY.PRESCRIPTION ? detail?._id : undefined,
      pmrId: category == TODO_CATEGORY.MED_REVIEW ? detail?._id : undefined,
      category: category,
      subCategory: record.subCategory,
    };
    let options = {
      query: {
        find: { ...obj },
        populate: [{ addedBy: [] }],
      },
    };
    if (category == TODO_CATEGORY.PRESCRIPTION) {
      setPrescriptionOrderIds({ prescriptionOrderId: detail._id });
    } else if (category == TODO_CATEGORY.MED_REVIEW) {
      setPrescriptionOrderIds({ pmrId: detail._id });
    }
    currentModalData.current = { ...record };
    setNotesFilterOptions(options);
    setNotesModal(true);
  };

  const visibleNotesModal = (visible, record, str, noteCount = null) => {
    setNotesModal(visible);
    setNotesFilterOptions({});
    if (!visible && str !== 'cancel') fetch();
    if (noteCount != null) {
      let clonedTodos = [...todoList]
      clonedTodos = clonedTodos.map(tl => {
        if (tl.subCategory === currentModalData.current.subCategory) {
          tl.notesCount = noteCount;
        }
        return tl;
      });
      setTodoList(clonedTodos)
    }

  };

  const visibleReminderModal = (visible, record, str, remCount = null) => {
    setReminderModal(visible);
    setReminderFilterOptions({});
    if (!visible && str !== 'cancel') fetch();
    if (remCount != null) {
      let clonedTodos = [...todoList]
      clonedTodos = clonedTodos.map(tl => {
        if (tl.subCategory === currentModalData.current.subCategory) {
          tl.reminderCount = remCount;
        }
        return tl;
      });
      setTodoList(clonedTodos)
    }
  };

  const createReminderModal = (record) => {
    let obj = {
      prescriptionOrderId:
        category == TODO_CATEGORY.PRESCRIPTION ? detail?._id : undefined,
      pmrId: category == TODO_CATEGORY.MED_REVIEW ? detail?._id : undefined,
      category: category,
      subCategory: record.subCategory,
    };
    let options = {
      query: {
        find: { ...obj },
        populate: [{ addedBy: [] }],
      },
    };

    if (category == TODO_CATEGORY.PRESCRIPTION) {
      setPrescriptionOrderIds({ prescriptionOrderId: detail._id });
    } else if (category == TODO_CATEGORY.MED_REVIEW) {
      setPrescriptionOrderIds({ pmrId: detail._id });
    }
    currentModalData.current = { ...record };
    setReminderFilterOptions(options);
    setReminderModal(true);
  };

  return (
    <>
      <div className='listing-top'>
        {loading ? (
          <Spin spinning={loading} str='center' />
        ) : (
            <ul>
              {todoList.map((todo) => (
                <li key={todo._id} className='active'>
                  <a>
                    <div className='left'>
                      <img src={getIcons(todo.subCategory)} />
                      <span className='title'>
                        {getTodoName(category, todo.subCategory)}
                      </span>
                      {todo.subCategory === todoType.CONSENT_OBTAINED ? (
                        <POADetail poaDetail={null} />
                      ) : null}
                    </div>
                    <div className='middle'>
                      {todo.status === STATUS.COMPLETED ? (
                        <>
                          {todo.completedBy ? (
                            <Tooltip placement='top' overlay={text(todo)}>
                              <span className='check'>
                                <Check />
                              </span>
                            </Tooltip>
                          ) : null}
                          {
                            canUndoTodo ?
                              <span
                                className='undo'
                                style={isAllowTodo(todo) ? disableStyle : null}
                                onClick={() => performTodo(todo, 'undo')}
                              >
                                undo
                              </span>
                              : null
                          }
                        </>
                      ) : (
                          <>
                            {
                              canPerformTodo ?
                                <>
                                  <span
                                    className='yes'
                                    style={isAllowTodo(todo, 'yes') ? disableStyle : null}
                                    onClick={() => performTodo(todo, 'check')}
                                  >
                                    yes
                                  </span>
                                  <span
                                    className='null'
                                    style={isAllowTodo(todo) ? disableStyle : null}
                                    onClick={() => performTodo(todo, 'check', true)}
                                  >
                                    N/A
                                  </span>
                                </>
                                : null
                            }
                          </>
                        )}
                    </div>
                    <div className='right'>
                      {/* <span className='add-note' onClick={() => visibleAddNote(true)}>
                                            <AddNote />
                                            <span >Add Notes</span>
                                        </span> */}
                      <span
                        className='note'
                        onClick={() => createNotesModal(todo)}
                      >
                        <Notes />
                        <span>Notes</span>
                        {todo.notesCount ? (
                          <span className='tot'>{todo.notesCount}</span>
                        ) : null}
                      </span>
                      <span
                        className='reminder'
                        onClick={() => createReminderModal(todo)}
                      >
                        <Reminder />
                        <span>reminder</span>
                        {todo.reminderCount ? (
                          <span className='tot'>{todo.reminderCount}</span>
                        ) : null}
                      </span>
                    </div>
                  </a>
                </li>
              ))}
              {/* {
                    isModuleAccessible(MODULE.TODO) && canPerformAction(validationParams1) ?
                        <li>
                            <a href=''>
                                <div className='left'>
                                    <ChangeSticker className='cs' />
                                    <span className='title'>Chanx`xge Sticker</span>
                                </div>
                                <div className='middle'>
                                    <span className='yes'>yes</span>
                                    <span className='null'>N/A</span>
                                </div>
                                <div className='right'>
                                    <span className='add-note'>
                                        <AddNote />
                                        <span>Add Notes</span>
                                    </span>
                                    <span className='note'>
                                        <Notes />
                                        <span>Notes</span>
                                        <span className='tot'>05</span>
                                    </span>
                                    <span className='reminder'>
                                        <Reminder />
                                        <span>reminder</span>
                                        <span className='tot'>05</span>
                                    </span>
                                </div>
                            </a>
                        </li>
                        : null
                } */}
            </ul>
          )
        }
      </div >

      {addNote && (
        <NoteUpsert
          visible={addNote}
          options={noteObj}
          onUpdate={(data) => visibleAddNote(false, data)}
          onCancel={() => visibleAddNote(false)}
        />
      )}
      {
        note && (
          <NoteList
            visible={note}
            options={noteObj}
            onCancel={() => visibleNote(false)}
          />
        )
      }
      {
        reminder && (
          <ReminderForm
            visible={reminder}
            options={reminderObj}
            onOk={(data) => visibleReminder(false, data)}
            onCancel={() => visibleReminder(false)}
          />
        )
      }

      {
        notesModal && (
          <NotesModal
            visible={notesModal}
            filterOptions={notesFilterOptions}
            onCancel={noteCount => visibleNotesModal(false, null, 'cancel', noteCount)}
            onOk={() => visibleNotesModal(false)}
            isUpsertList={true}
            modalTitle={`View Note - ${detail.orderNumber || detail.pmrId}`}
            xRayNumber={detail.orderNumber || detail.pmrId}
            addData={{
              ...prescriptionOrderIds,
              residentId: detail.residentId?._id,
              category: category,
              subCategory: currentModalData.current.subCategory,
            }}
          />
        )
      }

      {
        reminderModal && (
          <ReminderModal
            visible={reminderModal}
            filterOptions={reminderFilterOptions}
            onCancel={remCount => visibleReminderModal(false, null, 'cancel', remCount)}
            onOk={() => visibleReminderModal(false)}
            isUpsertList={true}
            modalTitle={`View Reminder - ${detail.orderNumber || detail.pmrId}`}
            xRayNumber={detail.orderNumber || detail.pmrId}
            addData={{
              ...prescriptionOrderIds,
              residentId: detail.residentId?._id,
              category: category,
              subCategory: currentModalData.current.subCategory,
            }}
          />
        )
      }
    </>
  );
};
export default Actions;
