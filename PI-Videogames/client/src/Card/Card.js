import React from "react";
import "../App.css";
const Card = ({ name, image, genres, platforms }) => {
  return (
    <div className="cards">
      <h4>Videogame: {name} </h4>
      <h4>Generos: {genres} </h4>
      <h4>Plataformas: {platforms} </h4>
      <img className="image" src={image} alt=" img not found" />
    </div>
  );
};

export default Card;
