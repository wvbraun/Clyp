"use strict";

// i hate using jquery, need it for toastr atm.
import * as $ from "jquery";
import React, { PropTypes } from "react";
import Header from "./common/Header";

// import { connect } from "react-redux";

        //<Header />

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
