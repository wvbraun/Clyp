"use strict";

import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import ClypHero from "./ClypHero";
import ClypHomeTabs from "./ClypHomeTabs";
import Header from "../common/Header";
import * as clypActions from "../../actions/clypActions";

class ClypPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.saveTrack = this.saveTrack.bind(this);
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

  render() {
    const { tracks } = this.props;
    return (
      <div className="container-fluid">
        <Header onDrop={this.saveTrack} />
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