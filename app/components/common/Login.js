"use strict";

import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import { Button, Modal } from "react-bootstrap";
import LoginForm from "./LoginForm";
import toastr from "toastr";
import Input from "./TextInput";
import * as authActions from "../../actions/authActions";

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {
        username: "",
        password: ""
      },
      showModal: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
    this.login = this.login.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ user: Object.assign({}, nextProps.user )});
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  login(event) {
    event.preventDefault();
    debugger;
    this.props.actions.loginUser(this.state.user)
      .catch((error) => {
        toastr.error(error);
      });
  }

  updateUserState(event) {
    let user = this.state.user;
    const field = event.target.name;
    user[field] = event.target.value;
    return this.setState({ user: user });
  }

  render() {
    return (
      <div>
        <Button onClick={this.openModal}>
          LOG IN
        </Button>
        <Modal show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Body>
            <LoginForm
              user={this.state.user}
              onChange={this.updateUserState}
              onClick={this.login}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

Login.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapDispatchToProps)(Login);
