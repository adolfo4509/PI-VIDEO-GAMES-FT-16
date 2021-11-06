import React from "react";
import { Link } from "react-router-dom";
import Logo from "../img/logoHenry.png";
import "../App.css";
import { Search } from "../Search/Search";
const Nav = () => {
  return (
    <header className="App-header">
      <div className="logo">
        <img
          id="App-logo"
          src={Logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Logo-Henry"
        />
        <h1>Henry Videogames</h1>
      </div>
      <Search />
      <div className="navBar">
        <Link className="App-link" exact to="/home">
          <h3>Home</h3>
        </Link>
        <Link className="App-link" to="/videogame">
          <h3>Create Videogame</h3>
        </Link>
      </div>
    </header>
  );
};

export default Nav;
