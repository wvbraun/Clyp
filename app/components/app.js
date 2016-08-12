"use strict";

import * as $ from "jquery";
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import Header from "./common/Header";
// import Auth0Lock from "auth0-lock";
import * as clypActions from "../actions/clypActions";

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.saveTrack = this.saveTrack.bind(this);
  }

  saveTrack(event) {
    const track = event[0];
    this.props.actions.saveTrack(track)
      .then(() => {
        toastr.success("File uploaded successfully!");
      })
      .catch((err) => {
        toastr.error(err);
      });
  }


  render() {
    return (
      <div>
        <Header onDrop={this.saveTrack} />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(clypActions, dispatch)
  };
}

export default connect(mapDispatchToProps)(App);
