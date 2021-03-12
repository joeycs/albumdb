import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faMinusSquare } from "@fortawesome/free-regular-svg-icons";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const addIcon = <FontAwesomeIcon icon={faPlusSquare} />;
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
    <td className="album-info">
      {props.album.title}&nbsp;by&nbsp;
      {props.album.artist}
    </td>
    <td className="td-edit">
      <button
        className="btn-album"
        onClick={() => {
          props.editAlbum(props.album._id);
        }}
      >
        {editIcon}
      </button>
    </td>
    <td>
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
    this.addAlbum = this.addAlbum.bind(this);
    this.editAlbum = this.editAlbum.bind(this);
    this.markAlbum = this.markAlbum.bind(this);
    this.deleteAlbum = this.deleteAlbum.bind(this);
    this.getAlbums = this.getAlbums.bind(this);
    this.state = {
      albumsToListen: [],
      albumsListened: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user && this.props.user) this.getAlbums();
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

  addAlbum() {
    window.location = "/add";
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
          .then(this.getAlbums())
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
          <button className="btn-add" onClick={() => this.addAlbum()}>
            {addIcon}
          </button>
          <i className="caption album-info">To Listen</i>
          <table className="table table-borderless">
            <thead>
              <tr>
                <th></th>
                <th className="album-info"></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{this.toListenList()}</tbody>
          </table>
        </div>
        <div className="table-container">
          <i className="caption album-info">Listened</i>
          <table className="table table-borderless">
            <thead>
              <tr>
                <th></th>
                <th className="album-info"></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{this.listenedList()}</tbody>
          </table>
        </div>
      </div>
    );
  }

  render() {
    if (this.props.user) return this.userBody();
    return this.guestBody();
  }
}