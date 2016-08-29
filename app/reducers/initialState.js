"use strict";

export default {
  tracks: [],
  auth: {
    isFetching: false,
    isAuthenticated: localStorage.getItem("access_token") ? true : false
  }
};
