"use strict";

import * as $ from "jquery";
import { connect } from "react-redux";
import { loginUser } from "../actions/clypActions";
import Header from "./common/Header";
import React, { PropTypes } from "react";

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { dispatch, isAuthenticated, errorMessage } = this.props;
    return (
      <div>
        <Header
          dispatch={dispatch}
          isAuthenticated={isAuthenticated}
          errorMessage={errorMessage}
        />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string
};

function mapStateToProps(state) {
  const { auth } = state;
  const { isAuthenticated, errorMessage } = auth;
  return {
    isAuthenticated,
    errorMessage
  };
}

export default connect(mapStateToProps)(App);
