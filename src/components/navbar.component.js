import React, { Component } from "react";
// hey, look at this change over here
// another change to test new branch

export default class NavBar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="/">AlbumDB</a>
                <div className="navbar-expand">
                    <div className="navbar-nav">
                        <a className="nav-item nav-link active" href="/">Home</a>
                        <a className="nav-item nav-link" href="/add">Add Album</a>
                        <a className="nav-item nav-link" href="/register">Register</a>
                    </div>
                </div>
            </nav>
        )
    }
}