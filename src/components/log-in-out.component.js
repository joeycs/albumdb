import React, { Component } from "react";

export default class LogInOut extends Component {
  render() {
    let message = this.props.user ? "Proceed to Logout" : "Proceed to Login";
    let path = this.props.user ? "/logout" : "/login";

    window.location = this.props.uri + path;

    return <div className="component-body"></div>;
  }
}
