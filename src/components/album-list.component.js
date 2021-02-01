import React, { Component } from "react";
import axios from "axios";

const Album = (props) => (
  <tr>
    <td>{props.album.title}</td>
    <td>{props.album.artist}</td>
    <td>{props.album.genre}</td>
    <td>
      <a href={`/edit/${props.album._id}`}>edit</a>
      &nbsp;
      <a
        //href="/"
        onClick={() => {
          props.markAlbum(props.album._id);
        }}
      >
        check/uncheck
      </a>
      &nbsp;
      <a
        //href="/"
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
    this.markAlbum = this.markAlbum.bind(this);
    this.deleteAlbum = this.deleteAlbum.bind(this);
    this.getAlbums = this.getAlbums.bind(this);
    this.state = {
      albumsToListen: [],
      albumsListened: [],
    };
  }

  getAlbums() {
    axios
      .get(this.props.uri + "/albums/")
      .then((res) => {
        let albums = res.data.filter(
          (album) => album.email === this.props.user.email
        );

        this.setState({
          albumsToListen: albums.filter((album) => !album.listened),
          albumsListened: albums.filter((album) => album.listened),
        });
      })
      .catch((err) => console.log(err));
  }

  markAlbum(id) {
    let newAlbum = undefined;

    axios
      .get(this.props.uri + `/albums/${id}`)
      .then(
        (res) =>
          (newAlbum = {
            email: this.props.user.email,
            listened: !res.data.listened,
            title: res.data.title,
            artist: res.data.artist,
            genre: res.data.genre,
          })
      )
      .then(() => {
        axios
          .post(this.props.uri + `/albums/update/${id}`, newAlbum)
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  deleteAlbum(id) {
    axios
      .delete(this.props.uri + `/albums/${id}`)
      .catch((err) => console.log(err));

    this.setState({
      albumsToListen: this.state.albumsToListen.filter((album) => album._id !== id),
      albumsListened: this.state.albumsListened.filter((album) => album._id !== id),
    });
  }

  toListenList() {
    return this.state.albumsToListen.map((album) => {
      return (
        <Album
          album={album}
          markAlbum={this.markAlbum}
          deleteAlbum={this.deleteAlbum}
          key={album._id}
        />
      );
    });
  }

  listenedList() {
    return this.state.albumsListened.map((album) => {
      return (
        <Album
          album={album}
          markAlbum={this.markAlbum}
          deleteAlbum={this.deleteAlbum}
          key={album._id}
        />
      );
    });
  }

  render() {
    let message = "Hi! Please log in. 🎵";

    if (this.props.user) {
      message = `Hello, ${this.props.user.username}. Here are your albums! 🎵`;
      this.getAlbums();
    }

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
          <tbody>{this.toListenList()}</tbody>
        </table>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th>Title</th>
              <th>Artist</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>{this.listenedList()}</tbody>
        </table>
      </div>
    );
  }
}
