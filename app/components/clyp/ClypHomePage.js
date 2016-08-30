"use strict";

import React, { PropTypes } from "react";
import { connect } from "react-redux";
import ClypHero from "./ClypHero";
import ClypHomeTabs from "./ClypHomeTabs";

class ClypPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { tracks } = this.props;
    return (
      <div className="container-fluid">
        <ClypHero />
        <ClypHomeTabs tracks={tracks} />
      </div>
    );
  }
}

ClypPage.propTypes = {
  tracks: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    tracks: state.tracks
  };
}

export default connect(mapStateToProps)(ClypPage);
