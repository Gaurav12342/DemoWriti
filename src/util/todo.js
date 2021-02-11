import React from 'react';
import {
  MAP_TODOS,
  TODO_CATEGORY,
  SUB_CATEGORY,
  TODO_NAME,
  TODO_ICONS,
  DEVICE_VIEW,
} from '../constants/todo';
import { isDrOrNp, getUserNameWithDesignation } from '../util/common';
import {
  USER_TYPE,
  SUB_NURSE_TYPE,
  DESIGNATION_TYPE,
  USER_DESIGNATION_TYPE,
} from '../constants/User';
import {
  MED_REVIEW_TODO_TYPES,
  PMR_PROCESS_TYPE,
  MED_REVIEW_NAME,
} from '../constants/pmr';
import { displayDateTime } from '../util/moment';
import routes from '../routes/constant'

export const getTodoName = (category, subcat) => {
  let todos, todoName;
  if (category === TODO_CATEGORY.PRESCRIPTION) {
    todos = SUB_CATEGORY.PRESCRIPTION;
  } else if (category === TODO_CATEGORY.MED_REVIEW) {
    todos = SUB_CATEGORY.MED_REVIEW;
  }
  if (todos) {
    Object.keys(todos).map((x) => {
      if (todos[x] === subcat) {
        todoName = TODO_NAME[x].replace(/_/g, ' ');
      }
    });
    return todoName
  } else return '';
},
  getMappedTodoKey = (subcat) => {
    let name;
    Object.keys(MAP_TODOS).map((key) => {
      if (MAP_TODOS[key].includes(subcat)) name = key;
    });
    return name;
  },
  getPath = (attachment) => {
    let image = attachment.find((x) => !x.revision),
      path = '';
    if (image) path = image.path;
    else path = attachment[0].path;
    return path;
  },
  getIcons = (type) => {
    let subcat = getMappedTodoKey(type);
    if (subcat && TODO_ICONS[subcat])
      return require('../assets/images/dashboard/' + TODO_ICONS[subcat]);
    else return '';
    // return require('../assets/images/dashboard/drugs.svg')
  },
  getDeviceView = (queryObj, authUser) => {
    if (!queryObj || !authUser) return;
    let { subCategory, viewType } = queryObj;
    if (!subCategory || !viewType) return;
    let deviceView =
      (MAP_TODOS['PMR'].includes(subCategory) ||
        MAP_TODOS['MEDS_CHECK'].includes(subCategory) ||
        MAP_TODOS['VERBAL_ORDER'].includes(subCategory)) &&
        isDrOrNp(authUser)
        ? true
        : false;
    if (deviceView && viewType === DEVICE_VIEW['PENDING']) {
      viewType = DEVICE_VIEW['PRIMARY'];
    } else if (
      !deviceView &&
      (viewType === DEVICE_VIEW['PRIMARY'] ||
        viewType === DEVICE_VIEW['SECONDARY'])
    ) {
      viewType = DEVICE_VIEW['PENDING'];
    }
    return { deviceView, viewType };
  },
  getTodoRedirectUrl = (options, pageName) => {
    let pathname, searchUrl = "", path
    if (options.todoCategory === TODO_CATEGORY.PRESCRIPTION) {
      pathname = routes.todo.path;
      searchUrl = `?category=${options.todoCategory}&subCategory=${options.subCategory}&viewType=1${options.orderNumber ? `&orderNumber=${options.orderNumber}` : ''}`;
      path = pathname + searchUrl
    } else if (options.todoCategory === TODO_CATEGORY.MED_REVIEW) {
      searchUrl = `?category=${options.todoCategory}&subCategory=${options.subCategory}&viewType=1${options.orderNumber ? `&orderNumber=${options.orderNumber}` : ''}`;

      if (options.subCategory === SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_1 ||
        options.subCategory === SUB_CATEGORY.MED_REVIEW.NURSE_REVIEW_2 ||
        options.subCategory === SUB_CATEGORY.MED_REVIEW.PMR) {
        pathname = routes.pmrTodo.path;
        path = pathname + searchUrl
      } else {
        pathname = routes.medReviewTodo.path;
        path = pathname + searchUrl
        // return {
        //   pathname: pathname,
        //   state: {
        //     category: TODO_CATEGORY.MED_REVIEW,
        //     subCategory: options.subCategory,
        //     viewType: 1,
        //     orderNumber: options.orderNumber
        //   }
        // }
      }
    }

    return path
  }

export const displayPmrProcess = (val, view) => {
  if (typeof val !== 'object') return;
  let todoType;
  Object.keys(SUB_CATEGORY.MED_REVIEW).map((todo) => {
    if (SUB_CATEGORY.MED_REVIEW[todo] === val.type) {
      todoType = getTodoName(TODO_CATEGORY.MED_REVIEW, val.type)
      return (<div>
        <span style={{ textTransform: 'capitalize' }}>{todoType} </span>
      </div>
      );
    }
  });
  const completedByName = getUserNameWithDesignation(val.completedBy)
  return (
    <div>
      {view === 'list'
        ? val.processType === PMR_PROCESS_TYPE.INITIATED
          ? `Initiated by ${completedByName}`
          : `Completed by ${completedByName} at
            ${displayDateTime(val.completedAt)}`
        : val.processType === PMR_PROCESS_TYPE.INITIATED
          ? `${todoType} is Initiated by ${completedByName}`
          : `${todoType} is Completed by ${completedByName} at
              ${displayDateTime(val.completedAt)}`}
    </div>
  );
};
