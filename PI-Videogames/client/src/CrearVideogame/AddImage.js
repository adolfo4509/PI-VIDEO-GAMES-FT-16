import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Nav from "../Nav/Nav";
import { postAllImagesVideogame } from "../Redux/actions";

const AddImage = () => {
  const [file, setfile] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const { videogameId } = useParams();

  useEffect(() => {
    dispatch(postAllImagesVideogame(videogameId));
  }, [dispatch, videogameId]);

  const onFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set("img", file);
    //console.log("este es formada", formData);
    var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
    if (!allowedExtensions.exec(file.name)) {
      alert(
        `"Please upload file having extensions .jpeg/.jpg/.png/.gif only, your file is ${file.name}`
      );
      file.value = "";
      return false;
    }
    dispatch(postAllImagesVideogame(videogameId, formData));
    alert("Successfully insert image");

    history.push("/home");
  };
  const InputChange = (e) => {
    setfile(e.target.files[0]);
  };
  return (
    <div className="form_videogame">
      <Nav />
      <form onSubmit={onFormSubmit}>
        <div className="add_imagen">
          <label> INSERTAR IMAGEN:</label>
          <input type="file" name="img" onChange={InputChange}></input>
        </div>
        <button className="button2" type="submit" disabled={!file}>
          Add Image
        </button>
      </form>
    </div>
  );
};

export default AddImage;
