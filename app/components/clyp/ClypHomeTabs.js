"use strict";

import React, { PropTypes } from "react";
import ClypList from "./ClypList";
import { Tabs, Tab, Row, Col, Nav, NavItem } from "react-bootstrap";

const ClypTabs = ({ tracks }) => {
  return (
    <div className="tabs-wrapper row">
      <Tabs defaultActiveKey={1} id="tabs">
        <Tab eventKey={1} title="Featured">
          <ClypList tracks={tracks} />
        </Tab>
        <Tab eventKey={2} title="Trending">
          <p>Trending</p>
        </Tab>
        <Tab eventKey={3} title="Recent">
          <p>Recent</p>
        </Tab>
      </Tabs>
    </div>
  );
};

ClypTabs.propTypes = {
  tracks: PropTypes.array.isRequired
};

export default ClypTabs;
