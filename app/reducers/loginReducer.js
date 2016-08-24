"use strict";

import types from "../actions/actionTypes";
import initialState from "./initialState";
import jwtDecode from  "jwt-decode";

export default function loginReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.LOGIN_USER_SUCCESS:
      return jwtDecode(action.jwt);

    default:
      return state;
  }
}
