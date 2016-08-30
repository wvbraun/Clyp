"use strict";

import CryptoJS from "crypto-js";
import ClypApi from "../api/clypApi";
import types from "./actionTypes";

export function loadTracksSuccess(tracks) {
  return { type: types.LOAD_TRACKS_SUCCESS, tracks };
}

export function loadTracksFail(tracks) {
  return { type: types.LOAD_TRACKS_FAIL, tracks};
}

export function createTrackSuccess(track) {
  return { type: types.CREATE_TRACK_SUCCESS, track };
}

export function createTrackFail(track) {
  return { type: types.CREATE_TRACK_FAIL, track};
}

export function deleteTrackSuccess(track) {
  return { type: types.DELETE_TRACK_SUCCESS, track };
}

export function deleteTrackFail(track) {
  return { type: types.DELETE_TRACK_FAIL, track };
}

function requestLogin(creds) {
  return {
    type: types.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds: creds
  };
}

function recieveLogin(user) {
  return {
    type: types.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  };
}

function loginError(message) {
  return {
    type: types.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message: message
  };
}

function requestLogout() {
  return {
    type: types.LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

function receiveLogout() {
  return {
    type: types.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

function logoutError(message) {
  return {
    type: types.LOGOUT_FAILURE,
    isFetching: false,
    isAuthenticated: true,
    message: message
  };
}

// TODO: this is a hacky workaround for user.error
export function loginUser(creds) {
  return (dispatch) => {
    dispatch(requestLogin(creds));

    return ClypApi.login(creds)
      .then((user) => {
        if (user.err) {
          const error = user.err.error;
          dispatch(loginError(error));
        } else {
          localStorage.setItem("access_token", user.access_token);
          dispatch(recieveLogin(user));
        }
      })
      .catch((err) => {
        throw(err);
      });
  };
}

export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem("access_token");
    dispatch(receiveLogout());
  };
}

export function loadTracks() {
  return (dispatch) => {
    return ClypApi.getAllTracks()
      .then((tracks) => {
        dispatch(loadTracksSuccess(tracks));
      })
      .catch((error) => {
        throw(error);
      });
  };
}

export function saveTrack(track) {
  return (dispatch) => {
    return ClypApi.saveTrack(track)
      .then((savedTrack) => {
        dispatch(createTrackSuccess(savedTrack));
      })
      .catch((error) => {
        throw(error);
      });
  };
}
