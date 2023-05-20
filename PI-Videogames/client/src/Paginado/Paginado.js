import React from "react";

import "./paginados.css";

export default function Paginado({ videogamePerPage, paginado, allvideogame }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allvideogame.length / videogamePerPage); i++) {
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
