import React from "react";
import { Link } from "react-router-dom";

import "../App.css";
const Card = ({ name, image, genres, platforms, rating, id, released }) => {
  return (
    <div className="cards">
      <img className="image" src={image} alt=" img not found" />
      <Link to={`/detail/${id}`} className="link_cards">
        <h4 className="cards_h4">Videogame: {name} </h4>
        <h4 className="cards_h4">Generos: {genres} </h4>
        <h4 className="cards_h4">Plataformas: {platforms} </h4>
        <h4 className="cards_h4">Rating:{rating}</h4>
        <h4 className="cards_h4">Released: {released}</h4>
      </Link>
    </div>
  );
};

export default Card;
