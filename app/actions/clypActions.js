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

  /*
  export function deleteTrack(track) {
    return (dispatch) => {
      return ClypApi.deleteTrack(track)
        .then(())
    }
  }
  */
}
