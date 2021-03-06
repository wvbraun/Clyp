"use strict";

import React, { PropTypes } from "react";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import { Button, Modal } from "react-bootstrap";
import LoginForm from "./LoginForm";
import toastr from "toastr";
import Input from "./TextInput";

class Login extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {
        email: "",
        password: ""
      },
      showModal: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
    this.onLoginClick = this.onLoginClick.bind(this);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  onLoginClick(event) {
    event.preventDefault();
    this.props.onLoginClick(this.state.user);
    this.toggleModal();
  }

  updateUserState(event) {
    let user = this.state.user;
    const field = event.target.name;
    user[field] = event.target.value;
    this.setState({ user: user });
  }

  render() {
    const { errorMessage } = this.props;
    return (
      <div>
        <Button onClick={this.toggleModal}>
          LOG IN
        </Button>
        <Modal show={this.state.showModal} onHide={this.toggleModal}>
          <Modal.Body>
            <LoginForm
              user={this.state.user}
              onChange={this.updateUserState}
              onClick={this.onLoginClick}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

Login.propTypes = {
  onLoginClick: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
};

export default Login;
