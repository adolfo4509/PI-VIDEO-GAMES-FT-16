import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenres, getPlatforms } from "../Redux/actions";
import Nav from "../Nav/Nav";
import "./created.css";
import { useHistory } from "react-router";

const validate = (input) => {
  let errors = {};
  if (!input.name) {
    errors.name = "Campo requerido ingresa un nombre";
  } else if (!input.released) {
    errors.released = "Campo requerido ingresa una fecha";
  } else if (!input.rating) {
    errors.rating = "Campo requerido ingresa un Rating";
  }
  return errors;
};

const CreateVideogame = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const genres = useSelector((e) => e.genres);
  const platforms = useSelector((e) => e.platforms);
  const history = useHistory();
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    image: "",
    rating: null,
    genreId: [],
    platformId: [],
  });
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleSelect = (e) => {
    let genInt = parseInt(e.target.value);
    setInput({
      ...input,
      genreId: [...input.genreId, genInt],
    });
  };

  const handleSelectPlatforms = (e) => {
    let platfInt = parseInt(e.target.value);
    setInput({
      ...input,
      platformId: [...input.platformId, platfInt],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.name === "") {
      alert("Ingresa un Videogame");
    } else {
      postVideogame(input);
      alert("Videogame creado con exito");
      setInput({
        name: "",
        description: "",
        released: "",
        image: "",
        rating: null,
        genreId: [],
        platformId: [],
      });
      history.push("/home");
    }
  };

  return (
    <div className="created">
      <Nav />
      <div className="form_videogame">
        <h1>Crear videogame</h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="data_input">
            <div className="datos">
              <label>Name:</label>
              <input
                type="text"
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
              />
              {errors.name && <p>{errors.name}</p>}
            </div>
            <div className="datos">
              <label>Released:</label>
              <input
                type="Date"
                value={input.released}
                name="released"
                onChange={(e) => handleChange(e)}
              />
              {errors.released && <p>{errors.released}</p>}
            </div>
            <div className="datos">
              <label>Rating:</label>
              <input
                step="0.1"
                type="number"
                value={input.rating}
                name="rating"
                min="0"
                onChange={(e) => handleChange(e)}
              />
              {errors.rating && <p>{errors.rating}</p>}
            </div>
            <div className="datos">
              <label>Description:</label>
              <input
                type="textarea"
                value={input.description}
                name="description"
                onChange={(e) => handleChange(e)}
              />
              {errors.description && <p>{errors.description}</p>}
            </div>
            <div className="datos">
              <label>Genres:</label>
              <select onChange={(e) => handleSelect(e)}>
                {genres.map((gen) => (
                  <option value={gen.id}>{gen.name}</option>
                ))}
              </select>
              <h4>{input.genreId}</h4>
            </div>
            <div className="datos">
              <label>Platforms:</label>
              <select onChange={(e) => handleSelectPlatforms(e)}>
                {platforms.map((plat) => (
                  <option value={plat.id}>{plat.name}</option>
                ))}
              </select>
              <h4>{input.platformId}</h4>
            </div>
          </div>
          <button type="submit">Agregar Videogame</button>
        </form>
      </div>
    </div>
  );
};

export default CreateVideogame;
