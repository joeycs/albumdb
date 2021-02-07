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
    this.attemptLogin = this.attemptLogin.bind(this);
    this.state = {
      uri: "https://album-db-server.herokuapp.com",
      user: undefined,
      attemptingLogin: false,
    };
  }

  attemptLogin() {
    this.setState({ attemptingLogin: true });
  }

  componentDidMount() {
    if (this.state.attemptingLogin) {
      fetch(this.state.uri + `/user/`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          let user = {
            email: res.token.email,
            username: res.token.preferred_username || res.registration.username,
          };
          this.setState({ user: user });
        })
        .catch((err) => console.log(err));

      this.setState({ attemptingLogin: false });
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
            <LogInOut
              {...props}
              attemptLogin={this.attemptLogin()}
              uri={this.state.uri}
              user={this.state.user}
            />
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
