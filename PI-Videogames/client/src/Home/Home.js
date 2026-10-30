import  {  useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Paginado from "../Paginado/Paginado";
import {
  getVideogames,
  selectGameGenres,
  
} from "../Redux/actions";
import "./home.css";



function Home() {
  
  var allVideogame = useSelector((state) => state.videogameLoad);
 
  const dispatch = useDispatch();


  let preloadInitial = window.onload = function () {
    if (allVideogame.length === 0) {
      dispatch(getVideogames());
    }
  };


  useEffect(() => {
    dispatch(selectGameGenres());
    preloadInitial();
  }, []);
  
  return (
    <div className="container">
    

      <Paginado allvideogame={allVideogame} />
    </div>
  );
}

export default Home;
