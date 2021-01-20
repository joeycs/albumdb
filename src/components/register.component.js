import React, { Component } from "react";
import axios from "axios";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = { username: "" };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    // const user = { username: this.state.username };

    // axios
    //   .post("http://localhost:5000/users/add", user)
    //   .then((res) => (document.getElementById("debug").innerHTML = res.data))
    //   .catch(
    //     (err) =>
    //       (document.getElementById("debug").innerHTML = "username taken 🙅")
    //   );

    this.setState({
      username: "",
    });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h3>Register</h3>
        <div className="form-group">
          <label>Username</label>
          <input
            required
            className="form-control"
            value={this.state.title}
            onChange={this.onChangeUsername}
          />
          <p id="debug"></p>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}
