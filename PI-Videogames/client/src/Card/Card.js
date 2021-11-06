import React from "react";
import { Link } from "react-router-dom";

import "../App.css";
const Card = ({ name, image, genres, platforms, rating, id, released }) => {
  const renderImage = () => {
    if (image) {
      if (typeof id === "string" && id.length > 10) {
        return (
          <img
            className="image"
            src={require(`../assets/imageVideogame/${image}`).default}
            alt=" img not found no jodas"
          />
        );
      }
      return <img className="image" src={image} alt=" img not found" />;
    } else {
      return <Link to={`/game/${id}`}>Insertar imagen</Link>;
    }
  };
  return (
    <div className="cards">
      {renderImage()}
      <Link to={`/home/${id}`} className="link_cards">
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
