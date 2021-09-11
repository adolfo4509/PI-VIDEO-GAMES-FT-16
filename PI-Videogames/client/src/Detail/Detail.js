import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail } from "../Redux/actions";
import Nav from "../Nav/Nav";
import("./detail.css");

const Detail = (props) => {
  const dispatch = useDispatch();
  const myVideogame = useSelector((e) => e.videogameDetail);
  //console.log("detalles", myVideogame);
  useEffect(() => {
    dispatch(getVideogameDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);
  return (
    <div className="cards_details">
      <Nav />
      {myVideogame.length > 0 ? (
        <div>
          <h1>Name: {myVideogame[0].name}</h1>
          <img
            className="image"
            src={myVideogame[0].background_image}
            alt=" img not found"
          />
          <p>genres: {myVideogame[0].genres}</p>
          <p>platform: {myVideogame[0].platforms}</p>
          <p>rating: {myVideogame[0].rating}</p>
          <p>released: {myVideogame[0].released}</p>
          <p>description: {myVideogame[0].description}</p>
        </div>
      ) : (
        <p>landing...</p>
      )}
    </div>
  );
};

export default Detail;
/** 
 Ruta de detalle de videojuego: debe contener
 Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
 Descripción
 Fecha de lanzamiento
 Rating
 Plataformas
 */
