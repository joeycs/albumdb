import React, { Component } from "react";
import axios from "axios";

const Album = (props) => (
  <tr>
    <td>{props.album.title}</td>
    <td>{props.album.artist}</td>
    <td>{props.album.genre}</td>
    <td>
      <a href={`/edit/${props.album._id}`}>edit</a>
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
    this.state = { albums: [] };
  }

  deleteAlbum(id) {
    axios
      .delete(this.props.uri + `/albums/${id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    this.setState({
      albums: this.state.albums.filter((album) => album._id !== id),
    });
  }

  albumList() {
    axios
      .get(this.props.uri + "/albums/")
      .then((res) => {
        this.setState({
          albums: res.data.filter(
            (album) => album.email === this.props.user.email
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
    let message = this.props.user
      ? `Hello, ${this.props.user.username}. Here are your albums! 🎵`
      : "Hi! Please log in. 🎵";

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
