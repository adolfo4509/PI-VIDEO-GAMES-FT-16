import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import {
  getVideogames,
  selectGameGenres,
  fileterByGenres,
  orderByName,
  orderByRating,
  filterCreate,
} from "../Redux/actions";
import "./home.css";

import FlaechaArriba from "../utilities/Arrows/FlechaAbajo";
import FlechaAbajo from "../utilities/Arrows/FlechaAbajo";
import FlechaArriba from "../utilities/Arrows/FlechaArriba";

function Home() {
  var allGenres = useSelector((state) => state.allGenres);
  var allVideogame = useSelector((state) => state.videogameLoad);
  const [, setOrden] = useState();
  const [abajo, setabajo] = useState(true);
  const [abajoDes, setabajoDes] = useState(true);
  const dispatch = useDispatch();


  let temp = window.onload = function () {
    if (allVideogame.length === 0) {
      dispatch(getVideogames());
    }
  };


  useEffect(() => {
    dispatch(selectGameGenres());
    temp();
  }, [dispatch]);
  const onMouseDown = (e) => {
    const { name, value } = e.target;

    if (name === "generos") {
      setabajo(false);
    }
    if (value === "Asc") {
      setabajoDes(false);
    } else {
      setabajoDes(true);
    }
  };
  const onFocus = (e) => {
    let name = e.target.name;
    if (name === "ascDes") {
      setabajoDes(true);
    }
    if (name === "generos") {
      setabajo(true);
    }
  };
  const handleOnChange = (e) => {
    const { value } = e.target;
    e.preventDefault();
    if (value !== "Asc") {
      setabajoDes(true);
    }
    setabajo(true);
    dispatch(fileterByGenres(value));
  };
  function handleSortAsc(e) {
    const { value } = e.target;

    setabajoDes(true);
    e.preventDefault();
    dispatch(orderByName(value));
  }
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));

    setOrden(e.target.value);
  }
  const handleOrderCreated = (e) => {
    let creados = e.target.value;
    e.preventDefault();
    if (creados === "Created") {
      dispatch(filterCreate(e.target.value));
    } else {
      dispatch(getVideogames());
    }
    setOrden(e.target.value);
  };
  return (
    <div className="container">


      <div className="select">
        <div>
          <p>Filtrar por Generos</p>
          <select
            onChange={handleOnChange}
            onMouseDown={onMouseDown}
            onBlur={onFocus}
            name="generos"
          >
            <option>Selecciona una opción</option>
            {allGenres.map(({ name }) => {
              return (
                <option key={name} value={name}>
                  {name}
                </option>
              );
            })}
          </select>
          {abajo ? (
            <div div className="flecha_abajo_">
              <FlechaAbajo />
            </div>
          ) : (
            <div className="flecha_arriba_">
              <FlechaArriba />
            </div>
          )}
        </div>
        <div>
          <p>Filtrar en Orden </p>
          <select
            onChange={handleSortAsc}
            className="filter_select"
            onMouseDown={onMouseDown}
            onBlur={onFocus}
            name="ascDes"
          >
            <option className="ordenar" value="Asc">
              Ascendente
            </option>
            <option className="ordenar" value="des">
              Descendente
            </option>
          </select>
          {abajoDes ? (
            <div div className="flecha_abajo_des">
              <FlechaAbajo />
            </div>
          ) : (
            <div className="flecha_arriba_des">
              <FlechaArriba />
            </div>
          )}
        </div>
        <div>
          <p>Rating</p>
          <select onChange={(e) => handleSort(e)} className="filter_select">
            <option className="ordenar" value="Mayor-rating">
              Mayor Rating
            </option>
            <option className="ordenar" value="Menor-ratin">
              Menor Rating
            </option>
          </select>
        </div>
        <div>
          <p>Videojuego Creados</p>
          <select onChange={(e) => handleOrderCreated(e)}>
            className="filter_select"
            <option className="ordenar" value="All">
              Videogame existente
            </option>
            <option className="ordenar" value="Created">
              Agregado por nosotros
            </option>
          </select>
        </div>
      </div>

      <Paginado allvideogame={allVideogame} />
    </div>
  );
}

export default Home;
