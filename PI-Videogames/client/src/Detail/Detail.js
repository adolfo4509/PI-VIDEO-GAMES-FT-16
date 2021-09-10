import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail } from "../Redux/actions";
import Nav from "../Nav/Nav";

const Detail = (props) => {
  const dispatch = useDispatch();
  const myVideogame = useSelector((e) => e.videogameDetail);

  useEffect(() => {
    dispatch(getVideogameDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);
  return (
    <div className="cards">
      <Nav />
      {myVideogame.length > 0 ? (
        <div>
          <h1>soy {myVideogame[0].name}</h1>
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
