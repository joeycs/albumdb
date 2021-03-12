import React, { Component } from "react";

export default class LogInOut extends Component {
  componentDidMount() {
    setTimeout(() => {
      let path = this.props.user ? "/logout" : "/login";
      window.location = this.props.uri + path;
    }, 3000);
  }

  render() {
    return (
      <div className="component-body">
        <i>{this.props.user ? "Logging out" : "Redirecting to authentication service"}</i>
      </div>
    );
  }
}
