import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenres, getPlatforms } from "../Redux/actions";
import Nav from "../Nav/Nav";
import "./created.css";
import { useHistory } from "react-router";

const validate = (input) => {
  let errors = {};
  if (input.name === "") errors.name = "Campo requerido ingresa un nombre";
  if (input.released === "" || input.released === "mm/dd/aaaa")
    errors.released = "Campo requerido ingresa una fecha";
  if (input.rating === "") errors.rating = "Campo requerido ingresa un Rating";
  if (input.description === "")
    errors.description = "Campo requerido ingresa un descripción";
  return errors;
};

const CreateVideogame = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const genres = useSelector((e) => e.genres);
  const platforms = useSelector((e) => e.platforms);

  const history = useHistory();
  const [activarBoton, setActivarBoton] = useState(true);
  const [nombrePlataforma, setNombrePlataforma] = useState([]);
  const [gener, setGenero] = useState([]);
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    image: "",
    rating: "",
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
    let genero = document.getElementById("selectGeneros");
    setGenero(genero.options[genero.selectedIndex].text);
    setInput({
      ...input,
      genreId: [...input.genreId, genInt],
    });
  };

  const handleSelectPlatforms = (e) => {
    let temp = document.getElementById("selectPlataformas");

    setNombrePlataforma(temp.options[temp.selectedIndex].text);
    let platfInt = parseInt(e.target.value);
    setInput({
      ...input,
      platformId: [...input.platformId, platfInt],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    postVideogame(input);
    alert("Videogame creado con éxito");
    setInput({
      name: "",
      description: "",
      released: "",
      image: "",
      rating: "",
      genreId: [],
      platformId: [],
    });
    history.push("/home");

    e.target.reset();
  };

  return (
    <div className="created">
      <Nav />
      <div className="form_videogame">
        <h1>Crear videogame</h1>
        <form onSubmit={handleSubmit}>
          <div className="data_input">
            <div className="datos">
              <label>Name:</label>
              <input
                type="text"
                value={input.name}
                name="name"
                onChange={handleChange}
              />
              {errors.name && <p>{errors.name}</p>}
            </div>
            <div className="datos">
              <label>Released:</label>
              <input
                type="Date"
                value={input.released}
                name={"released"}
                onChange={handleChange}
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
                onChange={handleChange}
              />
              {errors.rating && <p>{errors.rating}</p>}
            </div>
            <div className="datos">
              <label>Description:</label>
              <input
                type="textarea"
                value={input.description}
                name="description"
                onChange={handleChange}
              />
              {errors.description && <p>{errors.description}</p>}
            </div>
            <div className="datos">
              <label>Genres:</label>
              <select id="selectGeneros" onChange={(e) => handleSelect(e)}>
                {genres &&
                  genres.map((gen) => (
                    <option key={gen.id} value={gen.id}>
                      {gen.name}
                    </option>
                  ))}
              </select>
              <h4>{gener}</h4>
            </div>
            <div className="datos">
              <label>Platforms:</label>
              <select id="selectPlataformas" onChange={handleSelectPlatforms}>
                {platforms.map((plat) => (
                  <option key={plat.name} value={plat.id} name={plat.name}>
                    {plat.name}
                  </option>
                ))}
              </select>
              <h4>{nombrePlataforma}</h4>
            </div>
          </div>
          {input.description === "" ||
          input.genreId === "" ||
          input.name === "" ||
          input.description === "" ||
          input.rating === "" ||
          input.platformId === "" ? (
            <button
              style={{
                border: "1px red solid",
                height: "35px",
                borderRadius: "5px",
                background: "grey",
                opacity: ".8",
                cursor: "pointer",
                color: "#fff",
                padding: "10px",
              }}
              disabled={activarBoton}
              type="submit"
            >
              Agregar Videogame
            </button>
          ) : (
            <button
              style={{
                border: "1px green solid",
                background: "cyan",
                height: "35px",
                borderRadius: "5px",
                color: "#fff",
                padding: "10px",
              }}
              disabled={!activarBoton}
              type="submit"
            >
              Agregar Videogame
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateVideogame;
