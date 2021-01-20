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
      username: "",
      title: "",
      artist: "",
      genre: "",
      users: [],
    };
  }

  componentDidMount() {
    // axios
    //   .get("http://localhost:5000/users/")
    //   .then((res) => {
    //     if (res.data.length > 0) {
    //       this.setState({
    //         users: res.data.map((user) => user.username),
    //         username: res.data[0].username,
    //       });
    //     }
    //   })
    //   .catch((err) => console.log(err));
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
      username: this.state.username,
      title: this.state.title,
      artist: this.state.artist,
      genre: this.state.genre,
    };

    console.log(album);

    axios
      .post("http://localhost:5000/albums/add", album)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    window.location = "/";
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <h3>Add Album</h3>
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
