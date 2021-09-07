import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { searchVideogame, getVideogames } from "../Actions/actions";

export const Search = () => {
  const [inputValue, setInputValue] = useState("");
  // var videogameName = useSelector((state) => state.videoGameName);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchVideogame());
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
    dispatch(searchVideogame(e.target.value));
  };
  const handleClick = (e) => {
    setInputValue(e.target.value);
    dispatch(getVideogames());
  };
  return (
    <div>
      <fieldset className="search">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <input
              className="input_Search"
              placeholder="Insert name"
              type="text"
              autoComplete="off"
              value={inputValue}
              onChange={(e) => handleChange(e)}
            ></input>

            <button
              className="button_search"
              type="submit"
              onChange={(e) => handleClick(e)}
            >
              Search
            </button>
          </div>
        </form>
      </fieldset>
    </div>
  );
};
