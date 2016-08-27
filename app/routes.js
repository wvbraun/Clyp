"use strict";

import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "./components/app";
import ClypHomePage from "./components/clyp/ClypHomePage";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ClypHomePage} />
  </Route>
);
