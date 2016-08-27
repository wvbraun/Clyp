"use strict";

import initialState from "./initialState";
import types from "../actions/actionTypes";

export default function clypReducer(state = initialState.tracks, action) {
  switch (action.type) {
    case types.LOAD_TRACKS_SUCCESS:
      return action.tracks;

    case types.CREATE_TRACK_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.track)
      ];


    /*case types.UPDATE_COURSE_SUCCESS:
      return [
        ...state.filter((course) => course.id !== action.course.id),
        Object.assign({}, action.course)
      ];
    */

    default:
      return state;
  }
}
