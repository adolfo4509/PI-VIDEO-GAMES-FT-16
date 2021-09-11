import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenres, getPlatforms } from "../Redux/actions";
import Nav from "../Nav/Nav";
import "./created.css";

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
  //console.log(platforms);
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    image: "",
    rating: "",
    genres: [],
    platforms: [],
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
    setInput({
      ...input,
      genres: [...input.genres, e.target.value],
    });
  };

  const handleSelectPlatforms = (e) => {
    setInput({
      ...input,
      platforms: [...input.platforms, e.target.value],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postVideogame(input));
    alert("Videogame creado con exito");
    setInput({
      name: "",
      description: "",
      released: "",
      image: "",
      rating: "",
      genres: [],
      platforms: [],
    });
  };
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);
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
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={input.name}
                name="name"
                onChange={(e) => handleChange(e)}
              />
              {errors.name && <p>{errors.name}</p>}
            </div>
            <div>
              <label>Released:</label>
              <input
                type="text"
                value={input.released}
                name="released"
                onChange={(e) => handleChange(e)}
              />
              {errors.released && <p>{errors.released}</p>}
            </div>
            <div>
              <label>Rating:</label>
              <input
                type="text"
                value={input.rating}
                name="rating"
                onChange={(e) => handleChange(e)}
              />
              {errors.rating && <p>{errors.rating}</p>}
            </div>
            <div>
              <label>Genres:</label>
              <select onChange={(e) => handleSelect(e)}>
                {genres.map((gen) => (
                  <option value={gen.genres}>{gen.genres}</option>
                ))}
              </select>
              <h4>{input.genres.map((e) => e + ",")}</h4>
            </div>
            <div>
              <label>Platforms:</label>
              <select onChange={(e) => handleSelectPlatforms(e)}>
                {platforms.map((gen) => (
                  <option value={gen.platforms}>{gen.platforms}</option>
                ))}
              </select>
              <h4>{input.platforms.map((e) => e + ",")}</h4>
            </div>
            <div>
              <label>image:</label>
              <input
                type="url"
                value={input.image}
                name="image"
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <br />
          <button type="submit">Agregar Videogame</button>
        </form>
      </div>
    </div>
  );
};

export default CreateVideogame;
/**
  'PlayStation 5',   'PlayStation 4',   'PlayStation 3',
  'Xbox 360',        'PC',              'Xbox One',
  'Xbox Series S/X', 'Nintendo Switch', 'macOS',
  'Linux',           'Android',         'iOS',
  'Xbox',            'PS Vita',         'Web',
  'Wii U',           'Nintendo 3DS',    'PlayStation 2',

 */
