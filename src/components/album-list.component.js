import React, { Component } from "react";
import axios from "axios";

const Album = props => (
    <tr>
        <td>{props.album.title}</td>
        <td>{props.album.artist}</td>
        <td>{props.album.genre}</td>
        <td>
            <a href="/" onClick={() => { props.deleteAlbum(props.album._id) }}>delete</a>
        </td>
    </tr>
)

export default class AlbumList extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.deleteAlbum = this.deleteAlbum.bind(this);

        this.state = {
            users: [],
            username: "undefined",
            albums: []
        };
    }

    componentDidMount() {
        axios.get("http://localhost:5000/users/")
            .then(res => {
                if (res.data.length > 0) {
                    this.setState({
                        users: res.data.map(user => user.username),
                        username: res.data[0].username
                    });
                }
            })
            .catch(err => console.log(err));
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    deleteAlbum(id) {
        axios.delete(`http://localhost:5000/albums/${id}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));

        this.setState({
            albums: this.state.albums.filter(album => album._id !== id)
        });
    }

    albumList() {
        axios.get("http://localhost:5000/albums/")
            .then(res => {
                this.setState({ 
                    albums: res.data.filter(album => album.username === this.state.username) 
                });
            })
            .catch(err => console.log(err));

        return this.state.albums.map(currAlbum => {
            return <Album album={currAlbum} 
                          deleteAlbum={this.deleteAlbum}
                          key={currAlbum._id}
                   />;
        });
    }

    render() {
        return (
            <div>
                {<this.props.globalThing message="hello world!!"/>}
                <form>
                    <div className="form-group">
                        <label>Username</label>
                        <select required
                            className="form-control" 
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                                {
                                    this.state.users.map(user => {
                                            return <option
                                                        key={user}
                                                        value={user}
                                                >
                                                        {user}
                                                </option>;
                                    })
                                }
                        </select>
                    </div>
                </form>
                <h3>{ this.state.username }'s Albums</h3>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th>Title</th>
                            <th>Artist</th>
                            <th>Genre</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.albumList() }
                    </tbody>
                </table>
            </div>
        )
    }
}