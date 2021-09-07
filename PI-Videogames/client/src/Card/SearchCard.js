import React from "react";

const SearchCard = ({ name, image, genres, platforms, description }) => {
  return (
    <div>
      <div className="cards">
        <h4>Description:{description}</h4>
        <h4>Videogame: {name} </h4>
        <h4>Generos: {genres} </h4>
        <h4>Plataformas: {platforms} </h4>
        <img className="image" src={image} alt=" img not found" />
      </div>
    </div>
  );
};

export default SearchCard;
