import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
//import SearchCard from "../Card/SearchCard";
import Paginado from "../Paginado/Paginado";
import {
  getVideogames,
  selectGameGenres,
  fileterByGenres,
  searchVideogame,
} from "../Actions/actions";
import "./home.css";
import { Search } from "../Search/Search";

function Home() {
  // console.log("=========", allVideogame);
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
  useEffect(() => {
    dispatch(searchVideogame());
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

  return (
    <div className="container">
      <div className="select">
        <button
          className="cargar"
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Cargar de nuevo
        </button>
        <div>
          <Search />
        </div>
        <div>
          <h3>Filtrar por los Generos</h3>
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
          <select>
            <option>Videogame </option>
          </select>
        </div>
      </div>
      <Paginado
        className="paginado"
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
