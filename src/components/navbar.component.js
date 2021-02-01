import React, { Component } from "react";

export default class NavBar extends Component {
  guestNav() {
    return (
      <div className="navbar-nav">
        <a className="nav-item nav-link" href="/login">
          Log In
        </a>
        <a className="nav-item nav-link" href="/register">
          Register
        </a>
      </div>
    );
  }

  userNav() {
    return (
      <div className="navbar-nav">
        <a className="nav-item nav-link" href="/add">
          Add Album
        </a>
        <a className="nav-item nav-link" href="/login">
          Log Out
        </a>
      </div>
    );
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">
          AlbumDB
        </a>
        <div className="navbar-expand">
          {this.props.user ? this.userNav() : this.guestNav()}
        </div>
      </nav>
    );
  }
}
