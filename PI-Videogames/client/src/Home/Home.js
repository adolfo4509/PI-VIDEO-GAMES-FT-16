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


  


  useEffect(() => {
    
    if (allVideogame.length === 0) {
      console.log(process.env.NODE_ENV
)
    dispatch(getVideogames());
    dispatch(selectGameGenres());
  }
  }, [allVideogame.length, dispatch]);
  
  return (
    <div className="container">
    

      <Paginado allvideogame={allVideogame} />
    </div>
  );
}

export default Home;
