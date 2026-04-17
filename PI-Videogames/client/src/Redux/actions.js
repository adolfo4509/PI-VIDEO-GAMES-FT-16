import apiClient from "../services/axiosConfig";

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
      var json = await apiClient.get("videogames/videogames");
      return dispatch({
        type: GET_VIDEOGAME,
        payload: json.data,
      });
    } catch (error) {
      console.log("Error fetching videogames:", error);
    }
  };
};
export function selectGameGenres() {
  return async function (dispatch) {
    try {
      var data = await apiClient.get("genres/genres");
      return dispatch({
        type: FILTER_BY_GENRES,
        payload: data.data,
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
      var json = await apiClient.get(`videogames/videogame/${name}`);
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
      return apiClient.get("genres/genres").then((videogames) => {
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
  const temp = await apiClient.post("videogames/videogame", payload);
  return temp;
}

export const getPlatforms = () => {
  return async (dispatch) => {
    return apiClient.get("platforms/plataforms").then((videogames) => {
      dispatch({
        type: GET_PLATFORMS,
        payload: videogames.data,
      });
    });
  };
};

export const getVideogameDetail = (id) => {
  return async (dispatch) => {
    try {
      const json = await apiClient.get(`videogames/videogames/${id}`);
      dispatch({
        type: GET_VIDEOGAME_DETAIL,
        payload: json.data,
      });
    } catch (error) {
      return error;
    }
  };
};

export function filterCreate(payload) {
  return { type: FILTER_CREATE, payload };
}

export const postAllImagesVideogame = (id, payload) => {
  return async () => {
    try {
      await apiClient.post(`image?image_Videogame=${id}`, payload);
    } catch (err) {
      console.error(err);
    }
  };
};
