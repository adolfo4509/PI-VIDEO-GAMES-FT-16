import React from "react";
import { useSelector } from "react-redux";

export default function Paginado({ breadsPerPage, paginado }) {
  const allVideogame = useSelector((state) => state.videogameLoad);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(allVideogame.length / breadsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="otor">
      <nav>
        <ul className="paginado">
          {pageNumbers &&
            pageNumbers.map((number) => (
              <a className="App-link" onClick={() => paginado(number)}>
                {number}
              </a>
            ))}
        </ul>
      </nav>
    </div>
  );
}
