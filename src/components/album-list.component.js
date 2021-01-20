import React, { Component } from "react";
import axios from "axios";

const Album = (props) => (
  <tr>
    <td>{props.album.title}</td>
    <td>{props.album.artist}</td>
    <td>{props.album.genre}</td>
    <td>
      <a
        href="/"
        onClick={() => {
          props.deleteAlbum(props.album._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class AlbumList extends Component {
  constructor(props) {
    super(props);

    this.deleteAlbum = this.deleteAlbum.bind(this);

    this.state = {
      user: undefined,
      albums: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/user/", {
      credentials: "include", // fetch won't send cookies unless you set credentials
    })
      .then((res) => res.json())
      .then((res) =>
        this.setState({
          user: res.user,
        })
      );

    // axios
    //   .get("http://localhost:5000/user/")
    //   .then((res) => res.json())
    //   .then((res) => {
    //     this.setState({
    //       user: res.user,
    //     });
    //   })
    //   .catch((err) => console.log(err));
  }

  deleteAlbum(id) {
    axios
      .delete(`http://localhost:5000/albums/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    this.setState({
      albums: this.state.albums.filter((album) => album._id !== id),
    });
  }

  albumList() {
    axios
      .get("http://localhost:5000/albums/")
      .then((res) => {
        this.setState({
          albums: res.data.filter(
            (album) => album.username === this.state.username
          ),
        });
      })
      .catch((err) => console.log(err));

    return this.state.albums.map((currAlbum) => {
      return (
        <Album
          album={currAlbum}
          deleteAlbum={this.deleteAlbum}
          key={currAlbum._id}
        />
      );
    });
  }

  render() {
    let message = this.state.user
      ? `${this.state.user.username}'s albums!`
      : "Hi! Please log in.";

    return (
      <div>
        <span></span>
        <h3>{message}</h3>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>{this.albumList()}</tbody>
        </table>
      </div>
    );
  }
}
