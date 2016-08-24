"use strict";

import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import toastr from "toastr";
import HomeHero from "./HomeHero";
import HomeTabs from "./HomeTabs";
import * as clypActions from "../../actions/clypActions";

class HomePage extends React.Component {
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
        <HomeHero />
        <HomeTabs tracks={tracks} />
      </div>
    );
  }
}

HomePage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
