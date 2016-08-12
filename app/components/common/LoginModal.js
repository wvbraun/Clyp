"use strict";

import React, { PropTypes } from "react";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import { Button } from "react-bootstrap";
import Input from "./TextInput";

class LoginModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: { email: "", password: "" },
      isModalOpen: false,
      dirty: false
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.setUserState = this.setUserState.bind(this);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  setUserState() {
    let _user = Object.assign({}, this.state.user);
    this.setState({ dirty: true });
    const field = event.target.name;
    const value = event.target.value;
    _user[field] = value;
    return this.setState({ user: _user });
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggleModal}>
          LOG IN
        </Button>

        {this.state.isModalOpen &&
          <ModalContainer onClose={this.toggleModal}>
            <ModalDialog onClose={this.toggleModal}>
              <form>
                <Input
                  name="email"
                  label="Email Address"
                  onChange={this.setUserState}
                />
                <Input
                  name="password"
                  label="Password"
                  onChange={this.setUserState}
                />
              </form>
            </ModalDialog>
          </ModalContainer>
        }
      </div>
    );
  }
}

export default LoginModal;
