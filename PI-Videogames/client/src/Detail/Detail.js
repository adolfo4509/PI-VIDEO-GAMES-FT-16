import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogameDetail } from "../Redux/actions";
import Nav from "../Nav/Nav";
import("./detail.css");

const Detail = (props) => {
  const { id } = props.match.params;

  const dispatch = useDispatch();
  const [muestraPopUp, setMuestraPopUp] = useState(true);
  const myVideogame = useSelector((e) => e.videogameDetail);

  const popUp = () => {
    return (
      <>
        {muestraPopUp ? (
          <p>landing...</p>
        ) : (
          <div
            style={{
              position: "fixed",
              background: "rgba(136,136,136,49%)",
              backdropFilter: "blur(4px)",
              width: "100vw",
              height: "100vh",
            }}
          >
            <div
              style={{
                width: "250px",
                height: "200px",
                background: "rgba(255,255,255,30%)",
                alignContent: "center",
                margin: "auto",
                display: "flex",
                lineHeight: "300px",
              }}
            >
              <p
                style={{
                  color: "red",
                  display: "flex",
                  alignItems: "center",
                  lineHeight: "250px",
                  fontSize: "22px",
                }}
              >
                {myVideogame.message}
              </p>
            </div>
          </div>
        )}
      </>
    );
  };
  
  useEffect(() => {
    dispatch(getVideogameDetail(id));
    if (myVideogame?.length === 0 || myVideogame?.length > 0) {
      setTimeout(() => {
        setMuestraPopUp(false);
      }, 1200);
    } else if (myVideogame?.message === "Videogame not found") {
      setMuestraPopUp(false);
    }
  }, [ id]);
  return (
    <div>
      <Nav />

      <div className="cards_details">
        {muestraPopUp ? (
          popUp()
        ) : (
          <div className="cards_details_">
          {!myVideogame.message ? myVideogame?.map(
              ({
                name,
                background_image,
                genres,
                platforms,
                rating,
                released,
                description,
              }) => {
                return (
                  <>
                    <h2>Name:  <p>{name}</p></h2>
                    <img
                      className="image_Detail"
                      src={background_image}
                      alt=" img not found"
                    />
                    <h2>
                    Genres:
                     <p> { genres }</p>
                    </h2>
                    <h2 className="description">
                    Platform:
                      <p>  {platforms}</p>
                     
                    </h2>
                    <h2 className="description">
                      <p>rating: {rating}</p> 
                    </h2>
                    <h2 className="description">
                    Released: 
                      <p> {released} </p>
                     
                    </h2>
                    <h2 className="description1">
                    Description:
                      <p> {description}</p> 
                    </h2>
                  </>
                );
              }
            ):<p>{myVideogame.message}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
