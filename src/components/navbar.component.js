import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons';

const homeIcon = <FontAwesomeIcon icon={faRecordVinyl} />;

export default class NavBar extends Component {
  guestNav() {
    return (
      <div className="nav nav-pills">
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
      <div className="nav nav-pills">
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
      <nav className="navbar navbar-expand-lg">
        <a className="navbar-brand" href="/">
          <span className="logo">{homeIcon} AlbumDB</span>
        </a>
        <div className="navbar-expand">
          {this.props.user ? this.userNav() : this.guestNav()}
        </div>
      </nav>
    );
  }
}
