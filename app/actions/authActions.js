"use strict";


import ClypApi from "../api/clypApi";
import types from "./actionTypes";

export function logUserInSuccess() {
  return { type: types.LOGIN_USER_SUCCESS };
}

export function logUserInFail() {
  return { type: types.LOGIN_USER_FAIL };
}

export function logUserIn() {
  return (dispatch) => {
    return ClypApi.logUserIn()
      .then(() => {
        dispatch(logUserInSuccess());
      })
      .catch((error) => {
        throw(error);
      });
  };
}
