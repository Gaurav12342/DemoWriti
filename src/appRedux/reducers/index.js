import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router'
import Settings from "./Settings";
import Auth from "./Auth";
import Common from "./Common";
import Resident from './Resident'
// import VirtualVisit from "./VirtualVisit";


const appReducer = (history) => {
  console.log("reducers -> history", history)

  return combineReducers({
    router: connectRouter(history),
    settings: Settings,
    auth: Auth,
    commonData: Common,
    resident: Resident
    // virtualVisit: VirtualVisit
  })
}

const reducers = (state, action) => {
  // console.log(1000, "rootReducer -> action", state, action)
  // const { auth } = state;
  // console.log("rootReducer -> auth", auth)
  // // when a logout action is dispatched it will reset redux state
  // if (action && action.type === 'SIGNOUT_USER_SUCCESS') {
  //   state = undefined;
  // }

  return appReducer(state, action);
};

export default reducers;
