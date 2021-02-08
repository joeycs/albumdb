import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRecordVinyl } from "@fortawesome/free-solid-svg-icons";

const homeIcon = <FontAwesomeIcon icon={faRecordVinyl} />;

export default class NavBar extends Component {
  guestNav() {
    return (
      <>
        <a className="nav-item nav-link" href="/login">
          Log In
        </a>
        <a className="nav-item nav-link" href="/register">
          Register
        </a>
      </>
    );
  }

  userNav() {
    return (
      <>
        <a className="nav-item nav-link" href="/login">
          Log Out
        </a>
      </>
    );
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="/">
          <span className="logo">{homeIcon} AlbumDB</span>
        </a>
        <div className="navbar-expand">
          <div className="nav nav-pills">
            {this.props.user ? this.userNav() : this.guestNav()}
          </div>
        </div>
      </nav>
    );
  }
}
