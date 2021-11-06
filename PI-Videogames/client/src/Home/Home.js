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
import Nav from "../Nav/Nav";

function Home() {
  var allGenres = useSelector((state) => state.allGenres);
  var allVideogame = useSelector((state) => state.videogameLoad);
  const [orden, setOrden] = useState();

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamePerPage] = useState(15);
  const indexOfLastvideogame = currentPage * videogamePerPage;
  const indexOfFirtsvideogame = indexOfLastvideogame - videogamePerPage;
  const currentBreads = allVideogame.slice(
    indexOfFirtsvideogame,
    indexOfLastvideogame
  );
  var images;
  const paginado = (pageNum) => {
    setCurrentPage(pageNum);
  };

  useEffect(() => {
    dispatch(getVideogames()); //se hace un dispatch con la accion como parametro
  }, [dispatch]);
  useEffect(() => {
    dispatch(selectGameGenres());
  }, [dispatch]);
  useEffect(() => {
    dispatch(filterCreate());
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
  function handleSortAsc(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }
  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByRating(e.target.value));
    setCurrentPage(1);
    setOrden(e.target.value);
  }
  const handleOrderCreated = (e) => {
    e.preventDefault();

    dispatch(filterCreate(e.target.value));
    setOrden(e.target.value);
  };
  return (
    <div className="container">
      <Nav />
      <button
        className="cargar"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Regresar
      </button>
      <div className="select">
        <div>
          <p>Filtrar por Generos</p>
          <select className="select-css" onChange={(e) => handleOnChange(e)}>
            <option>Selecciona una opción</option>
            {allGenres.map(({ ID, name }) => {
              return (
                <option key={ID} value={name}>
                  {name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <p>Filtrar en Orden </p>
          <select onChange={(e) => handleSortAsc(e)} className="filter_select">
            <option className="ordenar" value="Asc">
              Ascendente
            </option>
            <option className="ordenar" value="des">
              Descendente
            </option>
          </select>
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

      <Paginado
        videogamePerPage={videogamePerPage}
        allvideogame={allVideogame}
        paginado={paginado}
      />

      <div className="cards_breads">
        {currentBreads &&
          currentBreads.map((d) => {
            if (typeof d.id === "string" && d.id.length > 10) {
              images = d.image[0];
            } else {
              images = d.image;
            }
            return (
              <Card
                id={d.id}
                name={d.name}
                genres={d.genres}
                platforms={d.platforms}
                released={d.released}
                rating={d.rating}
                description={d.description}
                image={images}
                key={d.id}
              ></Card>
            );
          })}
      </div>
      <Paginado
        videogamePerPage={videogamePerPage}
        allvideogame={allVideogame}
        paginado={paginado}
      />
    </div>
  );
}

export default Home;
