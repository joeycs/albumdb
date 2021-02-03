import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faMinusSquare } from "@fortawesome/free-regular-svg-icons";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const editIcon = <FontAwesomeIcon icon={faEdit} />;
const markIcon = <FontAwesomeIcon icon={faSquare} />;
const markedIcon = <FontAwesomeIcon icon={faCheckSquare} />;
const deleteIcon = <FontAwesomeIcon icon={faMinusSquare} />;
const musicIcon = <FontAwesomeIcon icon={faMusic} />;

const Album = (props) => (
  <tr className={props.album.listened ? "markedAlbum" : "unmarkedAlbum"}>
    <td>
      <button
        className="btn-album"
        onClick={() => {
          props.markAlbum(props.album._id);
        }}
      >
        {props.album.listened ? markedIcon : markIcon}
      </button>
    </td>
    <td className="album-info align-text-top">
      {props.album.title}&nbsp;by&nbsp;
      {props.album.artist}
    </td>
    <td className="align-text-top">
      <button
        className="btn-album btn-edit"
        onClick={() => {
          props.editAlbum(props.album._id);
        }}
      >
        {editIcon}
      </button>
      <button
        className="btn-album"
        onClick={() => {
          props.deleteAlbum(props.album._id);
        }}
      >
        {deleteIcon}
      </button>
    </td>
  </tr>
);

export default class AlbumList extends Component {
  constructor(props) {
    super(props);
    this.editAlbum = this.editAlbum.bind(this);
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

  editAlbum(id) {
    window.location = `/edit/${id}`;
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
      albumsToListen: this.state.albumsToListen.filter(
        (album) => album._id !== id
      ),
      albumsListened: this.state.albumsListened.filter(
        (album) => album._id !== id
      ),
    });
  }

  toListenList() {
    return this.state.albumsToListen.map((album) => {
      return (
        <Album
          album={album}
          editAlbum={this.editAlbum}
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
          editAlbum={this.editAlbum}
          markAlbum={this.markAlbum}
          deleteAlbum={this.deleteAlbum}
          key={album._id}
        />
      );
    });
  }

  guestBody() {
    return (
      <div className="component-body">
        <h4>Hi, please log in or register to begin {musicIcon}</h4>
      </div>
    );
  }

  userBody() {
    return (
      <div className="component-body">
        <h4>Welcome, {this.props.user.username}</h4>
        <div className="table-container">
          <i className="caption">To Listen</i>
          <table className="table table-borderless">
            <tbody>{this.toListenList()}</tbody>
          </table>
        </div>
        <div className="table-container">
          <i className="caption">Listened</i>
          <table className="table table-borderless">
            <tbody>{this.listenedList()}</tbody>
          </table>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.user) {
      this.getAlbums();
      return this.userBody();
    }

    return this.guestBody();
  }
}
