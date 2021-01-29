import React, { Component } from "react";

export default class LogInOut extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let message = this.props.user ? "sign out" : "sign in";
    let path = this.props.user ? "/logout" : "/login";

    return <a href={this.props.uri + path}>{message}</a>;
  }
}
