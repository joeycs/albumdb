import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./navbar.component";
import AlbumList from "./album-list.component";
import EditAlbum from "./edit-album.component";
import AddAlbum from "./add-album.component";
import Register from "./register.component";
import LogInOut from "./log-in-out.component";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: `http://localhost:${process.env.REACT_APP_SERVER_PORT}`,
      user: undefined,
    };
  }

  async componentDidMount() {
    try {
      const res = await fetch(this.state.uri + `/user/`, {
        credentials: "include",
      });
      const json = await res.json();

      let user = {
        email: json.token.email,
        username: json.token.preferred_username || json.registration.username,
      };

      if (user.email && user.username) this.setState({ user: user });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <Router>
        <Navbar user={this.state.user} />
        <br />
        <Route
          exact
          path="/"
          render={(props) => (
            <AlbumList {...props} uri={this.state.uri} user={this.state.user} />
          )}
        />
        <Route
          exact
          path="/edit/:id"
          render={(props) => (
            <EditAlbum {...props} uri={this.state.uri} user={this.state.user} />
          )}
        />
        <Route
          exact
          path="/add"
          render={(props) => (
            <AddAlbum {...props} uri={this.state.uri} user={this.state.user} />
          )}
        />
        <Route
          exact
          path="/login"
          render={(props) => (
            <LogInOut {...props} uri={this.state.uri} user={this.state.user} />
          )}
        />
        <Route
          exact
          path="/register"
          render={(props) => <Register {...props} uri={this.state.uri} />}
        />
      </Router>
    );
  }
}
