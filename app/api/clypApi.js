"use strict";

import fetch from "isomorphic-fetch";
import formurlencoded from "form-urlencoded";

const paths = {
  baseUrl: "/api/clyp"
};

class ClypApi {
  static getAllTracks() {
    return new Promise((resolve, reject) => {
      fetch('/api/clyp/tracks')
        .then((response) => {
          return response.json();
        })
        .then((tracks) => {
          resolve(Object.assign([], tracks));
        })
        .catch((error) => {
          throw(error);
        });
    });
  }

  static saveTrack(track) {
    const form = new FormData();
    form.append('audioFile', track);
    const settings = {
      method: 'POST',
      body: form
    };

    return new Promise((resolve, reject) => {
      fetch('/api/clyp/upload', settings)
        .then((response) => {
          return response.json();
        })
        .then((savedTrack) => {
          resolve(Object.assign({}, savedTrack));
        })
        .catch((error) => {
          throw(error);
        });
    });
  }

  static deleteTrack(track) {
    track = Object.assign({}, track);
    const settings = {
      method: 'DELETE',
      body: JSON.stringify(track)
    };

    return new Promise((resolve, reject) => {
      fetch('/api/clyp/tracks/:id', settings)
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          throw(error);
        });
    });
  }

  static login(user) {
    user = Object.assign({}, user);
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: formurlencoded({
        "grant_type": "password",
        "username": user.email,
        "password": user.password
      })
    };

// TODO: fix issue with resolve.. i want to reject
// if user.error, but even when i reject it is getting
// accepted in the Promise.then clypAction
    return new Promise((resolve, reject) => {
      fetch("/api/clyp/login", settings)
        .then((response) => {
          return response.json();
        })
        .then((user) => {
          resolve(Object.assign({}, user));
        })
        .catch((err) => {
          throw(err);
        });
    });
  }
}

export default ClypApi;
