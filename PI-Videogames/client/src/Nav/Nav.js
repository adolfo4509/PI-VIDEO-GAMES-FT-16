import React from "react";
import { Link } from "react-router-dom";
import Logo from "../img/logoHenry.png";
import "../App.css";
import { Search } from "../Search/Search";
import { useDispatch } from "react-redux";
import { getVideogames } from "../Redux/actions";
const Nav = () => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    dispatch(getVideogames());
  };
  return (
    <header className="App-header">
      <div className="logo">
        <Link exact to="/">
          <img
            id="App-logo"
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Logo-Henry"
          />
        </Link>
        <h1>Henry Videogames</h1>
      </div>
      <Search />
      <button value={""} className="boton_home" onClick={handleClick}>
        Recargar
      </button>
      <div className="navBar">
        <Link className="App-link" exact to="/home">
          <h3>Inicio</h3>
        </Link>
        <Link className="App-link" to="/videogame">
          <h3>Crear Videojuego</h3>
        </Link>
      </div>
    </header>
  );
};

export default Nav;
