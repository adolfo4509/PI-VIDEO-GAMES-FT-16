import React from "react";
import { useSelector } from "react-redux";
import "./paginados.css";

export default function Paginado({ videogamePerPage, paginado }) {
  const allVideogame = useSelector((state) => state.videogameLoad);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allVideogame.length / videogamePerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <nav className="nav_paginado1">
        {pageNumbers &&
          pageNumbers.map((number, id) => (
            <p className="App-link1" onClick={() => paginado(number)} key={id}>
              {number}
            </p>
          ))}
      </nav>
    </div>
  );
}
