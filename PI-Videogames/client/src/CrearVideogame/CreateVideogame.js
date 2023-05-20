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
  console.log("las plataformas desde el formulario", platforms);
  const history = useHistory();

  const [activarBoton, setActivarBoton] = useState(true);
  const [nombrePlataforma, setNombrePlataforma] = useState([]);
  const [show, setShow] = useState(false);

  const [genero, setGenero] = useState({ name: "" });
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
    background_image: "",
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
    let genero = document.getElementById("selectGeneros");
    let generoNombre = genero.options[genero.selectedIndex].text;
    setGenero({ ...genero, name: generoNombre });

    setInput({
      ...input,
      genreId: [...input.genreId, e.target.value],
    });
  };

  const handleSelectPlatforms = (e) => {
    let temp = document.getElementById("selectPlataformas");

    setShow(true);
    setNombrePlataforma(temp.options[temp.selectedIndex].text);

    setInput({
      ...input,
      platformId: [...input.platformId, e.target.value],
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
  const deleletePlatfor = (e) => {
    let span = document.getElementById("idSpan");
    let elimanar = document.getElementById("idH4");
    elimanar.removeChild(span);
    let borrar = input;
    setNombrePlataforma("");
    let cerrar = e.target;
    // innerHTML
    //borrar.removeChild(cerrar);

    console.log("hay que eliminarlo", e.target);
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
            <div>
              <label htmlFor="idImagen">Image</label>
              <input
                onChange={handleChange}
                value={input.background_image}
                name={"background_image"}
                type="text"
              />
            </div>
            <div className="datos">
              <label>Genres:</label>
              <select
                id="selectGeneros"
                name="genreId"
                onChange={(e) => handleSelect(e)}
              >
                {genres &&
                  genres.map((gen) => (
                    <option key={gen.id} value={gen.id}>
                      {gen.name}
                    </option>
                  ))}
              </select>
              <label htmlFor="selectGeneros">{genero.name}</label>
            </div>
            <div className="datos">
              <label>Plataformas:</label>
              <select
                id="selectPlataformas"
                name="platformId"
                onChange={(e) => handleSelectPlatforms(e)}
              >
                {platforms.map((plat) => (
                  <option key={plat.id} value={plat.id} name={plat}>
                    {plat.name}
                  </option>
                ))}
              </select>

              {show ? (
                <h4
                  id="idH4"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "5px",
                    alignItems: "center",
                  }}
                >
                  {nombrePlataforma}
                  <div
                    id="idSpan"
                    //value={nombrePlataforma}
                    style={{
                      background: "cyan",
                      height: "25px",
                      width: "25px",
                      borderRadius: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      border: "1px solid red",
                    }}
                    onClick={deleletePlatfor}
                  >
                    <span>X</span>
                  </div>
                </h4>
              ) : (
                ""
              )}
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
