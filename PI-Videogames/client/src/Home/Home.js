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
} from "../Redux/actions";
import "./home.css";
import Nav from "../Nav/Nav";

function Home() {
  var allGenres = useSelector((state) => state.allGenres);
  var allVideogame = useSelector((state) => state.videogameLoad);
  const [, setOrden] = useState();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [breadsPerPage] = useState(15);
  const indexOfLastBreads = currentPage * breadsPerPage;
  const indexOfFirtsBreads = indexOfLastBreads - breadsPerPage;
  const currentBreads = allVideogame.slice(
    indexOfFirtsBreads,
    indexOfLastBreads
  );

  //Declaramos una constante paginado como funcion
  const paginado = (pageNum) => {
    setCurrentPage(pageNum);
  };

  useEffect(() => {
    dispatch(getVideogames()); //se hace un dispatch con la accion como parametro
  }, [dispatch]);
  useEffect(() => {
    dispatch(selectGameGenres());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    setOrden(e.target.value);
    dispatch(getVideogames(e.target.value));
  };
  const handleOnChange = (e) => {
    e.preventDefault();
    setOrden(e.target.value);
    dispatch(fileterByGenres(e.target.value));
  };
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
    //console.log(orderByName());
  }
  return (
    <div className="container">
      <Nav />
      <button
        className="cargar"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Cargar de nuevo
      </button>
      <div className="select">
        <h3>Filtrar por Generos</h3>
        <select className="select-css" onChange={(e) => handleOnChange(e)}>
          <option>Selecciona una opción</option>
          {allGenres.map(({ ID, genres }) => {
            return (
              <option key={ID} value={genres}>
                {genres}
              </option>
            );
          })}
        </select>
        <h3>Filtrar en Orden </h3>
        <select onChange={(e) => handleSort(e)}>
          <option className="ordenar" value="asc">
            Ascendente
          </option>
          <option className="ordenar" value="des">
            Descendente
          </option>
          <option className="ordenar" value="rating">
            Mayor Rating
          </option>
          <option className="ordenar" value="Menor-ratin">
            Menor Rating
          </option>
        </select>
        <select>
          <option>Videogame existente</option>
          <option>Agregado por nosotros</option>
        </select>
      </div>

      <Paginado
        breadsPerPage={breadsPerPage}
        allvideogame={allVideogame}
        paginado={paginado}
      />

      <div className="cards_breads">
        {currentBreads &&
          currentBreads.map((d) => {
            return (
              <Card
                name={d.name}
                genres={d.genres}
                platforms={d.platforms}
                released={d.released}
                rating={d.rating}
                description={d.description}
                image={d.image}
                key={d.id}
              ></Card>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
