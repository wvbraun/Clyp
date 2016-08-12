"use strict";

import fetch from "isomorphic-fetch";

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

  static logUserIn() {
    const form = new FormData();
    const settings = {
      method: 'POST',
      body: form
    };

    return new Promise((resolve, reject) => {
      fetch('/api/clyp/oauth2/token', settings)
        .then((response) => {
          return response.json();
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
}

export default ClypApi;
