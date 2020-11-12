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

        this.deleteAlbum = this.deleteAlbum.bind(this);
        this.state = {albums: []};
    }

    componentDidMount() {
        axios.get("http://localhost:5000/albums/")
            .then(res => {
                this.setState({ albums: res.data });
            })
            .catch(err => console.log(err));
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
                <h3>Albums</h3>
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