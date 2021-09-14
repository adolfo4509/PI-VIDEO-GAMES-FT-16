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

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);
  const Options = platforms.map((e, i) => {
    return (
      <option key={i} value={e.platforms}>
        {e.name}
      </option>
    );
  });
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
  // console.log("SOY SETINPUT=>", setInput());
  const handleSelectPlatforms = (e) => {
    setInput({
      ...input,
      platforms: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(input);

    await postVideogame(input);
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

  //console.log("========>", input);
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
                type="text"
                value={input.released}
                name="released"
                onChange={(e) => handleChange(e)}
              />
              {errors.released && <p>{errors.released}</p>}
            </div>
            <div className="datos">
              <label>Rating:</label>
              <input
                type="text"
                value={input.rating}
                name="rating"
                onChange={(e) => handleChange(e)}
              />
              {errors.rating && <p>{errors.rating}</p>}
            </div>
            <div className="datos">
              <label>Description:</label>
              <input
                type="text"
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
                  <option value={gen.name}>{gen.name}</option>
                ))}
              </select>
              <h4>{input.genres.map((e) => e.name + ", ")}</h4>
            </div>
            <div className="datos">
              <label>Platforms:</label>
              <select onChange={(e) => handleSelectPlatforms(e)}>
                {Options}
              </select>
              <h4>{input.platforms}</h4>
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
