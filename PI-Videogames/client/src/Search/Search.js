import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchVideogame } from "../Redux/actions.js";

export const Search = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      return alert("Ingrese un videogame");
    } else {
      return dispatch(searchVideogame(input));
    }
  };
  return (
    <div className="paginado">
      <input
        className="search_input"
        type="text"
        autoComplete="off"
        placeholder="Inser Name"
        name="input"
        onChange={(e) => handleChange(e)}
      />
      <button
        className="button_search"
        type="submit"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Search
      </button>
    </div>
  );
};
