import { API_MODULE, BASE_URL } from './common';
import { method } from 'lodash';

const baseURL = BASE_URL[API_MODULE.PMR];
const baseURLTodo = BASE_URL[API_MODULE.TODO];

export const upsertPmrGroup = {
  method: 'POST',
  url: '/admin/pmr-schedule-group/upsert',
  baseURL,
},
  addFavouriteMeds = {
    method: 'POST',
    url: '/admin/medication-favourite/add',
    baseURL,
  },
  upsert = {
    method: 'POST',
    url: 'admin/prescription/upsert',
    baseURL,
  },
  getPmrGroup = {
    method: 'GET',
    url: '/admin/pmr-schedule-group',
    baseURL,
  },
  updatePmrGroup = {
    method: 'PUT',
    url: '/admin/pmr-schedule-group/partially-update',
    baseURL,
  },
  moveResident = {
    method: 'POST',
    url: '/admin/pmr-schedule-group/move-resident',
    baseURL,
  },
  getPmrGroupResidentList = {
    method: 'POST',
    url: 'admin/pmr-schedule-group/resident-list',
    baseURL,
  },
  getAllRxOrders = {
    method: 'POST',
    url: 'admin/prescription/list',
    baseURL,
  },
  pmrGroupPaginate = {
    method: 'POST',
    url: '/admin/pmr-schedule-group/paginate',
    baseURL,
  },
  pmrList = {
    method: 'POST',
    url: '/admin/pmr/list',
    baseURL,
  },
  getTodoList = {
    method: 'POST',
    url: '/admin/pmr/todo/list',
    baseURL,
  },
  getPmrDetail = {
    method: 'POST',
    url: '/admin/pmr/',
    baseURL,
  },
  medicationAdd = {
    method: 'POST',
    url: '/admin/pmr/medication-add',
    baseURL,
  },
  ackNurse = {
    method: 'POST',
    url: 'admin/pmr/nurse-ack-edit',
    baseURL,
  },
  ackDoctor = {
    method: 'POST',
    url: 'admin/pmr/dr-ack-edit',
    baseURL,
  },
  performTodo = {
    method: 'POST',
    url: 'admin/perform/pmr-todo',
    baseURL: baseURLTodo,
  },
  upsertCausion = {
    method: 'POST',
    url: 'admin/pmr-order-alert/upsert',
    baseURL,
  },
  deleteCausion = {
    method: 'POST',
    url: 'admin/pmr-order-alert/destorye',
    baseURL,
  },
  nurseAllAck = {
    method: 'POST',
    url: 'admin/pmr/nurse-ack-all',
    baseURL,
  };
