import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchVideogame } from "../Redux/actions.js";

export const Search = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
    handleSubmit(e.target.value);
  };
  const handleSubmit = (e) => {
    // e.preventDefault();
    dispatch(searchVideogame(e));
    setInput("");
  };
  return (
    <div className="paginado">
      <input
        className="search_input"
        type="text"
        autoComplete="off"
        placeholder="Insert Name"
        name="input"
        onChange={(e) => handleChange(e)}
      />
    </div>
  );
};
