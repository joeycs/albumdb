import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbar.component";
import AlbumsList from "./components/album-list.component";
import EditAlbum from "./components/edit-album.component";
import AddAlbum from "./components/add-album.component";
import Register from "./components/register.component";
// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <br/>
      <Route 
        exact
        path="/" 
        render={props => (
          <AlbumsList {...props} globalThing={props => (
            <p>{props.message}</p>
          )} />
        )} 
      />
      <Route path="/edit/:id" exact component={EditAlbum} />
      <Route path="/add" exact component={AddAlbum} />
      <Route path="/register" exact component={Register} />
    </Router>
  );
}

export default App;
