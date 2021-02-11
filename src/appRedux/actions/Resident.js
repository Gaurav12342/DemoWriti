import { store } from './../../App'
import { OPEN_NEW_RESIDENT, CLOSE_NEW_RESIDENT, RESET_RESIDENT, UPDATE_OPEN_RESIDENT } from './../ActionTypes'

export const openResident = (payload) => {
  store.dispatch({
    type: OPEN_NEW_RESIDENT,
    payload
  })
}

export const updateOpenResident = (payload) => {
  store.dispatch({
    type: UPDATE_OPEN_RESIDENT,
    payload
  })
}

export const closeResident = (payload) => {
  store.dispatch({
    type: CLOSE_NEW_RESIDENT,
    payload
  })
}

export const resetResident = () => {
  store.dispatch({
    type: RESET_RESIDENT
  })
} 