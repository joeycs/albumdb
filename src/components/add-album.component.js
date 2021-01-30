import React, { Component } from "react";
import axios from "axios";

export default class AddAlbum extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeArtist = this.onChangeArtist.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: "",
      artist: "",
      genre: "",
    };
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
      .post(this.props.uri + `/albums/add`, album)
      .catch((err) => console.log(err));

    window.location = "/";
  }

  guestBody() {
    return <h3>Please log in to add an album! 💿</h3>;
  }

  userBody() {
    return (
      <form onSubmit={this.onSubmit}>
        <h3>Add Album 💿</h3>
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

  render() {
    if (this.props.user) return this.userBody();
    else return this.guestBody();
  }
}
