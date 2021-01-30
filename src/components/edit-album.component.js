import axios from "axios";
import React, { Component } from "react";

export default class EditAlbum extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeArtist = this.onChangeArtist.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      id: this.props.match.params.id,
      title: "",
      artist: "",
      genre: "",
    };
  }

  componentDidMount() {
    axios
      .get(this.props.uri + `/albums/${this.state.id}`)
      .then((res) =>
        this.setState({
          title: res.data.title,
          artist: res.data.artist,
          genre: res.data.genre,
        })
      )
      .catch((err) => console.log(err));
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeArtist(e) {
    this.setState({
      artist: e.target.value,
    });
  }

  onChangeGenre(e) {
    this.setState({
      genre: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const album = {
      email: this.props.user.email,
      title: this.state.title,
      artist: this.state.artist,
      genre: this.state.genre,
    };

    axios
      .post(this.props.uri + `/albums/update/${this.state.id}`, album)
      .catch((err) => console.log(err));

    window.location = "/";
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h3>Edit album ✍🏾</h3>
        <div className="form-group">
          <label>Title</label>
          <input
            required
            className="form-control"
            value={this.state.title}
            onChange={this.onChangeTitle}
          />
        </div>
        <div className="form-group">
          <label>Artist</label>
          <input
            required
            className="form-control"
            value={this.state.artist}
            onChange={this.onChangeArtist}
          />
        </div>
        <div className="form-group">
          <label>Genre</label>
          <input
            required
            className="form-control"
            value={this.state.genre}
            onChange={this.onChangeGenre}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}
