import React, { Component } from "react";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: undefined,
      username: undefined,
      password: undefined,
    };
  }

  onChangeEmail(e) {
    this.setState({ email: e.target.value });
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    let userData = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    };

    window.location =
      this.props.uri + `/register?userData=${JSON.stringify(userData)}`;
  }

  render() {
    return (
      <div className="component-body">
        <form onSubmit={this.onSubmit}>
          <h3>Register</h3>
          <p>
            <i>After registering, you will be redirected to the login page.</i>
          </p>
          <div className="form-group">
            <label>Email</label>
            <input
              required
              className="form-control"
              onChange={this.onChangeEmail}
            />
            <label>Username</label>
            <input
              required
              className="form-control"
              onChange={this.onChangeUsername}
            />
            <label>Password</label>
            <input
              required
              className="form-control"
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
