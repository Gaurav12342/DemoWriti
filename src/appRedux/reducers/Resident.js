import {
  CLOSE_NEW_RESIDENT, OPEN_NEW_RESIDENT, SIGNOUT_USER_SUCCESS,
  RESET_RESIDENT, SET_CURRENT_RESIDENT, UPDATE_OPEN_RESIDENT
} from "../ActionTypes";
import { produce, original } from 'immer'
import keys from 'lodash/keys'
import last from 'lodash/last'
import first from 'lodash/first'

const initialState = {
  openedResidents: {},
  currentResidentId: ''
};

const residents = produce((state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SIGNOUT_USER_SUCCESS: {
      return {
        ...initialState
      }
    }
    case OPEN_NEW_RESIDENT:
      if (!state.openedResidents[payload._id]) {
        if (keys(state.openedResidents).length === 5) {
          delete state.openedResidents[first(keys(state.openedResidents))]
          state.openedResidents[payload._id] = payload;
        } else
          state.openedResidents[payload._id] = payload;
      }
      state.currentResidentId = payload._id
      return state

    case UPDATE_OPEN_RESIDENT:
      state.openedResidents[state.currentResidentId][payload.tabkey] = payload.response
      return state

    case CLOSE_NEW_RESIDENT:
      delete state.openedResidents[payload.id];
      state.currentResidentId = last(keys(state.openedResidents))
      return state

    case SET_CURRENT_RESIDENT:
      return {
        ...state,
        currentResidentId: payload
      }

    case RESET_RESIDENT:
      return {
        ...initialState
      }

    default:
      return state
  }
})

export default residents;
