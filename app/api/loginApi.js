"use strict";

import fetch from "isomorphic-fetch";

class LoginApi {
  static login(user) {
    user = Object.assign({}, user);
    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify(user)
    };

    return new Promise((resolve, reject) => {
      fetch("/api/clyp/login", settings)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          debugger;
        })
        .catch((error) => {
          throw(error);
        });
    });
  }
}

export default LoginApi;
