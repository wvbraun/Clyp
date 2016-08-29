"use strict";

import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import Header from "../common/Header";
import ClypHero from "./ClypHero";
import ClypHomeTabs from "./ClypHomeTabs";
import * as clypActions from "../../actions/clypActions";

class ClypPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.saveTrack = this.saveTrack.bind(this);
    this.login = this.login.bind(this);
  }

  saveTrack(event) {
    this.props.actions.saveTrack(event[0])
      .then(() => {
        toastr.success("File uploaded successfully!");
      })
      .catch((err) => {
        toastr.error(err);
      });
  }

  login(user) {
    this.props.actions.loginUser(user)
      .catch((error) => {
        toastr.error(error);
      });
  }

  render() {
    const { tracks } = this.props;
    return (
      <div className="container-fluid">
        <Header onDrop={this.saveTrack} login={this.login} />
        <ClypHero />
        <ClypHomeTabs tracks={tracks} />
      </div>
    );
  }
}

ClypPage.propTypes = {
  tracks: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    tracks: state.tracks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(clypActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClypPage);
