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
  
  var allVideogame = useSelector((state) => state.videogameLoad);
 
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
  
  return (
    <div className="container">
    

      <Paginado allvideogame={allVideogame} />
    </div>
  );
}

export default Home;
