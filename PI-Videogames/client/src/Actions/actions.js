import axios from "axios";
import {
  VIDEOGAMES_URL,
  GENRES_URL,
  VIDEOGAMENAME_URL,
} from "../Constantes/Constans";
export const GET_VIDEOGAME = "GET_VIDEOGAME";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const MOSTRAR_BY_GENRES = "MOSTRAR_BY_GENRES";
export const SEARCH_GAMES = " SEARCH_GAMES";

export const getVideogames = () => {
  return (dispatch) => {
    return axios.get(VIDEOGAMES_URL).then((videogames) => {
      dispatch({
        type: GET_VIDEOGAME,
        payload: videogames.data,
      });
    });
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
      console.log(error);
    }
  };
}
export function fileterByGenres(payload) {
  return {
    type: MOSTRAR_BY_GENRES,
    payload,
  };
}
export function searchVideogame() {
  return function (dispatch) {
    try {
      return axios.get(VIDEOGAMENAME_URL).then((videogames) => {
        dispatch({
          type: SEARCH_GAMES,
          payload: videogames.data,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };
}
