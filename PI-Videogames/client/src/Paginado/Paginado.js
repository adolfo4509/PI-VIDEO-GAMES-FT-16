import React, { useState } from "react";

import "./paginados.css";
import Card from "../Card/Card";

export default function Paginado({ allvideogame }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [disable, setDisabled] = useState(false);
  const pageSize = 14;

  // Función para calcular la página actual
  const currentData = allvideogame.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const nextPage = () => {
    if (currentPage < pageSize) {
      setCurrentPage((currentPage) => currentPage + 1);
      setDisabled(false);

    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((currentPage) => currentPage - 1);
      setDisabled(false);
    }
  };
  return (
    <nav className="nav_paginado">
      <div className="contendor">
        <div className="paginado">


          <span onClick={prevPage} disabled={disable}>
            ...Prev
          </span>
          <span>Página {currentPage}</span>
          <span onClick={nextPage} disabled={disable}>
            Next...
          </span>
        </div>
        <div className="cards_breads">
          {currentData.length > 0 ? (
            currentData?.map((d) => {
              return (
                <Card
                  id={d.id}
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
            })
          ) : (
            <p
              style={{
                display: "flex",
                textAlign: "center",
                position: "absolute",
              }}
            >
              Recarga la página no hay video Juegos con este género
            </p>
          )}
        </div>
        <div className="paginado-abajo">
          <span onClick={prevPage} disabled={disable}>
            ...Prev
          </span>
          <span>Página {currentPage}</span>
          <span onClick={nextPage} disabled={disable}>
            Next...
          </span>
        </div>
      </div>
    </nav>
  );
}
