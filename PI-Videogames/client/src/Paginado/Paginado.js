import React from "react";
import { useSelector } from "react-redux";

export default function Paginado({ videogamePerPage, paginado }) {
  const allVideogame = useSelector((state) => state.videogameLoad);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allVideogame.length / videogamePerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <p>Páginas</p>
      <nav className="nav_paginado">
        {pageNumbers &&
          pageNumbers.map((number, id) => (
            <p className="App-link" onClick={() => paginado(number)} key={id}>
              {number}
            </p>
          ))}
      </nav>
    </div>
  );
}
