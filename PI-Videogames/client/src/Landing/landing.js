import React from "react";
import { Link } from "react-router-dom";
import "./landing.css";
const Landing = () => {
  return (
    <div className="landing">
      <div className="spiner1"></div>
      <div>
        <h3> Landing...</h3>
      </div>
      <div className="spinner"></div>
      <Link to="/home">
        <div className="boton">
          <button className="button">Ingresar</button>
        </div>
      </Link>
    </div>
  );
};

export default Landing;
