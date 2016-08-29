"use strict";

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

export function logUserInSuccess(jwt) {
  return { type: types.LOGIN_USER_SUCCESS, jwt };
}

export function logUserInFail() {
  return { type: types.LOGIN_USER_FAIL };
}

export function loginUser(user) {
  return (dispatch) => {
    return ClypApi.login(user)
      .then((user) => {
        const jwt = user.access_token;
        localStorage.set("jwt", jwt);
        dispatch(logUserInSuccess(jwt));
      })
      .catch((error) => {
        throw(error);
      });
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
