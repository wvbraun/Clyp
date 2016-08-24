"use strict";


import LoginApi from "../api/loginApi";
import types from "./actionTypes";

export function logUserInSuccess() {
  return { type: types.LOGIN_USER_SUCCESS };
}

export function logUserInFail() {
  return { type: types.LOGIN_USER_FAIL };
}

export function loginUser() {
  return (dispatch) => {
    return LoginApi.login()
      .then((jwt) => {
        debugger;
        dispatch(logUserInSuccess());
      })
      .catch((error) => {
        throw(error);
      });
  };
}
