"use strict";

import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ModalContainer, ModalDialog } from "react-modal-dialog";
import { Button } from "react-bootstrap";
import LoginForm from "./LoginForm";
import Input from "./TextInput";
import * as authActions from "../../actions/authActions";

class LoginModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: Object.assign({}, this.props.user),
      isModalOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ user: Object.assign({}, nextProps.user )});
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({
      user: Object.assign({}, this.props.user),
      isModalOpen: false
    });
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
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
        {this.state.isModalOpen &&
          <ModalContainer onClose={this.closeModal}>
            <ModalDialog onClose={this.closeModal}>
              <LoginForm
                user={this.state.user}
                onChange={this.updateUserState}
              />
            </ModalDialog>
          </ModalContainer>
        }
      </div>
    );
  }
}

LoginModal.propTypes = {
  user: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const user = { email: "", password: "" };

  return {
    user: user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
