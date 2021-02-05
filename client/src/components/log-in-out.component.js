import React, { Component } from "react";

export default class LogInOut extends Component {
  render() {
    let path = this.props.user ? "/logout" : "/login";

    window.location = this.props.uri + path;

    return <div className="component-body"></div>;
  }
}