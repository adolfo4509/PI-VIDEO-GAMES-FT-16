import React, { useState,useEffect } from "react";

import "./paginados.css";
import Card from "../Card/Card";

export default function Paginado({ allvideogame }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [disable, setDisabled] = useState(false);
  const pageSize = 14;

  // Función para calcular la página actual
  const currentData = allvideogame.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );
const totalPages = Math.ceil(allvideogame.length / pageSize);
  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((currentPage) => currentPage + 1);
      setDisabled(false);

    }
  };
  useEffect(() => {
    if (currentPage === totalPages - 1) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [currentPage, totalPages]);

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((currentPage) => currentPage - 1);
      setDisabled(false);
    }
  };
  const showNextPrevButtons = () => {
    return (
      <div className="paginado">
        <span className={!disable && currentPage > 0 ? "App-link1" : "App-link1-disabled"} onClick={prevPage} disabled={disable}>
          ...Prev
        </span>
        <span>Página {currentPage + 1}</span>
        <span className={!disable && currentPage < totalPages - 1 ? "App-link2" : "App-link2-disabled"} onClick={nextPage} disabled={disable}>
          Next...
        </span>
      </div>
    );
  };
  return (
    
      <div className="contendor">
        <div className="paginado">

          {showNextPrevButtons()}
         
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
          {showNextPrevButtons()}
        </div>
      </div>
   
  );
}
