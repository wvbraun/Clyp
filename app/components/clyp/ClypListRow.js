"use strict";

import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "react-bootstrap";
import Iframe from "react-iframe";
import FontAwesome from "react-fontawesome";
import * as clypActions from "../../actions/clypActions";

const styles = {
  width: '100%',
  height: '160px',
  borderWidth: '0px'
};

class ClypListRow extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.deleteTrack = this.deleteTrack.bind(this);
  }

  deleteTrack() {

  }

  render() {
    const { track } = this.props;
    return (
      <tr>
        <td>
          <div className="audio-card">
            <div className="pull-right">
              <Button>
                <FontAwesome
                  name="times"
                />
              </Button>
            </div>
            <iframe src={`${track.Url}/widget`} style={styles}></iframe>
          </div>
        </td>
      </tr>
    );
  }
}

ClypListRow.propTypes = {
  track: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(clypActions, dispatch)
  };
}

export default connect(mapDispatchToProps)(ClypListRow);
