import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenres, getPlatforms } from "../Redux/actions";
import Nav from "../Nav/Nav";
import "./created.css";

const validate = (input) => {

  let errors = {
    name: "",
    released: "",
    rating: "",
    description: "",
    background_image: "",
  };
  if (input.name.length < 1 || input.name.length > 15) {
    errors.name =
      "Campo requerido ingresa un nombre Valido no mayor a 5 caracteres y ,ayor a 1 caracter";
  } else if (input.released === "" || input.released === "mm/dd/aaaa") {
    errors.released = "Campo requerido ingresa una fecha";
  } else if (
    parseFloat(input.rating) > 5 ||
    parseFloat(input.rating) < 0 ||
    input.name.length < 1 ||
    input.name.length > 15
  ) {
    errors.rating = "Ingresa un Rating menor a 5 y mayor o igual a 0";
  } else if (input.description === "") {
    errors.description = "Campo requerido ingresa un descripción";
  }

  return errors;
};
const CreateVideogame = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const genres = useSelector((e) => e.genres);
  const platforms = useSelector((e) => e.platforms);
  const [mensaje, setMensaje] = useState("");
  const [mostrarPopUp, setMostrarPopUp] = useState(false);
  const [activarBoton, setActivarBoton] = useState(true);
  const [nombrePlataforma, setNombrePlataforma] = useState([]);
  const [show, setShow] = useState(false);

  const [generos, setGeneros] = useState([]);
  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    genreId: [],
    platformId: [],
    background_image:
      "https://th.bing.com/th/id/OIP.4jewR4iZLbQc4u7-lAKnZwHaEK?pid=ImgDet&rs.jpg",
  });

  const handleChange = (e) => {
    let plataformas = document.getElementById("selectPlataformas");
    let genero = document.getElementById("selectGeneros");
    let generoNombre = genero?.options[genero?.selectedIndex].text;
    const { name, value } = e.target;

    if (name === "platformId") {
      setInput({
        ...input,
        [name]: input.platformId.concat(parseInt(value)),
      });
    } else if (name === "genreId") {
      setInput({
        ...input,
        [name]: input.genreId.concat(parseInt(value)),
      });
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }

    setErrors(
      validate({
        ...input,
        [name]: value,
      })
    );
    if (name === "genreId") {
      setGeneros(generos + " " + generoNombre);
    }

    if (name === "platformId") {
      setNombrePlataforma(
        nombrePlataforma +
        " " +
        plataformas.options[plataformas.selectedIndex].text
      );
    }
    setShow(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    postVideogame(input);
    const { data } = await postVideogame(input);
    setMensaje(data.message);
    setMostrarPopUp(true);
    setInput({
      name: "",
      description: "",
      released: "",
      background_image: "",
      rating: "",
      genreId: [],
      platformId: [],
    });

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
  };
  const cerrarModal = () => {
    setMostrarPopUp(false);
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
              {errors.name ? <p>{errors.name}</p> : ""}
            </div>
            <div className="datos">
              <label>Released:</label>
              <input
                type="Date"
                value={input.released}
                name={"released"}
                onChange={handleChange}
              />
              {errors.released ? <p>{errors.released}</p> : ""}
            </div>
            <div className="datos">
              <label>Rating:</label>
              <input
                step="0.1"
                type="number"
                value={input.rating}
                name="rating"
                onChange={handleChange}
              />
              {errors.rating ? <p>{errors.rating}</p> : ""}
            </div>
            <div className="datos">
              <label>Description:</label>
              <input
                type="textarea"
                value={input.description}
                name="description"
                onChange={handleChange}
              />
              {errors.description ? <p>{errors.description}</p> : ""}
            </div>
            {mostrarPopUp ? (
              <div className="popUp">
                <div className="popUpHijo">
                  <label onClick={cerrarModal} className="cerraPopUp">
                    X
                  </label>
                  <span className="span">{mensaje}</span>
                </div>
              </div>
            ) : (
              ""
            )}

            <div>
              <label htmlFor="idImagen">Image</label>
              <input
                onChange={handleChange}
                value={input.background_image}
                name="background_image"
                type="text"
              />
              {errors.background_image ? <p>{errors.background_image}</p> : ""}
            </div>
            <div className="datos">
              <label>Genres:</label>
              <select id="selectGeneros" name="genreId" onChange={handleChange}>
                {genres &&
                  genres.map((gen) => (
                    <>
                      <option value="" hidden>
                        Selecciona
                      </option>
                      <option key={gen.id} value={gen.id}>
                        {gen.name}
                      </option>{" "}
                    </>
                  ))}
              </select>
              <label htmlFor="selectGeneros">{generos}</label>
            </div>
            <div className="datos">
              <label>Plataformas:</label>
              <select
                id="selectPlataformas"
                name="platformId"
                onChange={handleChange}
              >
                {platforms.map((plat) => (
                  <>
                    <option value="" hidden>
                      Selecciona
                    </option>
                    <option key={plat.id} value={plat.id} name={plat}>
                      {plat.name}
                    </option>
                  </>
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
            input.genreId.length === 0 ||
            input.name === "" ||
            input.description === "" ||
            input.rating === "" ||
            input.platformId.length === 0 ? (
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
