import axios from "axios";
import {
  VIDEOGAMES_URL,
  GENRES_URL,
  VIDEOGAMENAME_URL,
  BASE_PLATAFORMS,
  VIDEOGAMEID_URL,
  VIDEOGAME_CREATE_URL,
  IMAGES_URL,
} from "../Constantes/Constans";
export const GET_VIDEOGAME = "GET_VIDEOGAME";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const MOSTRAR_BY_GENRES = "MOSTRAR_BY_GENRES";
export const SEARCH_GAMES = " SEARCH_GAMES";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const MOSTRAR_BY_RATING = "MOSTRAR_BY_RATING";
export const GET_GENRES = "GET_GENRES";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const GET_VIDEOGAME_DETAIL = "GET_VIDEOGAME_DETAIL";
export const FILTER_CREATE = "FILTER_CREATE";

export const getVideogames = () => {
  return async (dispatch) => {
    try {
      var json = await axios.get(VIDEOGAMES_URL);
      return dispatch({
        type: GET_VIDEOGAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export function selectGameGenres() {
  return async function (dispatch) {
    try {
      return axios.get(GENRES_URL).then((videogames) => {
        dispatch({
          type: FILTER_BY_GENRES,
          payload: videogames.data,
        });
      });
    } catch (error) {
      console.log("Es un error", error);
    }
  };
}
export function fileterByGenres(payload) {
  return {
    type: MOSTRAR_BY_GENRES,
    payload,
  };
}
export function searchVideogame(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(VIDEOGAMENAME_URL + name);
      dispatch({
        type: SEARCH_GAMES,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}
export function orderByRating(payload) {
  return { type: MOSTRAR_BY_RATING, payload };
}
export function getGenres() {
  return async function (dispatch) {
    try {
      return axios.get(GENRES_URL).then((videogames) => {
        dispatch({
          type: GET_GENRES,
          payload: videogames.data,
        });
      });
    } catch (error) {
      console.log("Es un error", error);
    }
  };
}
export async function postVideogame(payload) {
  console.log("desde la accion post", payload);
  await axios.post(VIDEOGAME_CREATE_URL, payload);
}

export const getPlatforms = () => {
  return async (dispatch) => {
    return axios.get(BASE_PLATAFORMS).then((videogames) => {
      dispatch({
        type: GET_PLATFORMS,
        payload: videogames.data,
      });
    });
  };
};
export const getVideogameDetail = (id) => {
  console.log("desde la accion este es el ID", id);
  return async (dispatch) => {
    try {
      const json = await axios.get(VIDEOGAMEID_URL + id);
      dispatch({
        type: GET_VIDEOGAME_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      console.log("desde la accion es el error", error);
    }
  };
};
export function filterCreate(payload) {
  return { type: FILTER_CREATE, payload };
}
export const postAllImagesVideogame = (id, payload) => {
  return async () => {
    try {
      await axios.post(`${IMAGES_URL}?image_Videogame=${id}`, payload);
    } catch (err) {
      console.error(err);
    }
  };
};
