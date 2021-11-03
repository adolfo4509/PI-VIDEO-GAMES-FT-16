import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail } from "../Redux/actions";
import Nav from "../Nav/Nav";
import("./detail.css");

const Detail = (props) => {
  const dispatch = useDispatch();
  const myVideogame = useSelector((e) => e.videogameDetail);
  useEffect(() => {
    dispatch(getVideogameDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);
  return (
    <div>
      <Nav />
      <div className="cards_details">
        {myVideogame.length > 0 ? (
          <div className="cards_details_">
            <h2>
              {" "}
              <span>Name:</span> {myVideogame[0].name}
            </h2>
            <img
              className="image_Detail"
              src={myVideogame[0].background_image}
              alt=" img not found"
            />
            <p className="description">
              <span>genres:</span> {myVideogame[0].genres}
            </p>
            <p className="description">
              <span>platform: </span>
              {myVideogame[0].platforms}
            </p>
            <p className="description">
              <span>rating:</span> {myVideogame[0].rating}
            </p>
            <p className="description">
              <span>released: </span>
              {myVideogame[0].released}
            </p>
            <p className="description1">
              <span>description:</span> {myVideogame[0].description}
            </p>
          </div>
        ) : (
          <p>landing...</p>
        )}
      </div>
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
