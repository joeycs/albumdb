import React, { Component } from "react";

export default class LogInOut extends Component {
  // componentDidMount() {
  //   let message = this.props.user ? "sign out 🔒" : "sign in 🔓";
  //   let path = this.props.user ? "/logout" : "/login";

  //   window.location.href = this.props.uri + path;
  // }

  render() {
    let message = this.props.user ? "Proceed to Logout 🔒" : "Proceed to Login 🔓";
    let path = this.props.user ? "/logout" : "/login";

    return <a href={this.props.uri + path}>{message}</a>;

    // return <></>;
  }
}
