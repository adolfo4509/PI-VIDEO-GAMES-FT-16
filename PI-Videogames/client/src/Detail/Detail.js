import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail } from "../Redux/actions";
import Nav from "../Nav/Nav";
import("./detail.css");

const Detail = (props) => {
  const { id } = props.match.params;
  const [limpio, setLimpio] = useState(true);
  const dispatch = useDispatch();
  const [muestraPopUp, setMuestraPopUp] = useState(false);
  const myVideogame = useSelector((e) => e.videogameDetail);

  const popUp = () => {
    return (
      <>
        <div
          style={{
            position: "absolute",

            backdropFilter: "blur(4px)",
            width: "100vw",
            height: "100vh",
          }}
        >
          <p
            style={{
              color: "green",
              fontSize: "22px",
              position: "relative",
              justifyContent: "center",
              alignContent: "center",
              display: "flex",
              lineHeight: "570px",
            }}
          >
            VideoGame Not Found
          </p>
        </div>
      </>
    );
  };
  console.log("mi juego", myVideogame);
  useEffect(() => {
    dispatch(getVideogameDetail(id));
    if (myVideogame.length > 0) {
      setTimeout(() => {
        setLimpio(false);
        setMuestraPopUp(false);
      }, 1200);
    } else {
      setLimpio(false);
      setMuestraPopUp(true);
    }
  }, [dispatch, id]);
  return (
    <div>
      <Nav />
      {muestraPopUp ? popUp() : ""}
      <div className="cards_details">
        {limpio ? (
          <p>landing...</p>
        ) : (
          <div className="cards_details_">
            <h2>
              {" "}
              <span>Name:</span> {myVideogame[0]?.name}
            </h2>
            <img
              className="image_Detail"
              src={myVideogame[0]?.background_image}
              alt=" img not found"
            />
            <p className="description">
              <span>genres:</span> {myVideogame[0]?.genres}
            </p>
            <p className="description">
              <span>platform: </span>
              {myVideogame[0]?.platforms}
            </p>
            <p className="description">
              <span>rating:</span> {myVideogame[0]?.rating}
            </p>
            <p className="description">
              <span>released: </span>
              {myVideogame[0]?.released}
            </p>
            <p className="description1">
              <span>description:</span> {myVideogame[0]?.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
