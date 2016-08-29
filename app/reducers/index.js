"use strict";

import { combineReducers } from "redux";
import auth from "./loginReducer";
import tracks from "./clypReducer";

const rootReducer = combineReducers({
  auth: auth,
  tracks: tracks
});

export default rootReducer;
