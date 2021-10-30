const {
  GET_VIDEOGAME,
  FILTER_BY_GENRES,
  MOSTRAR_BY_GENRES,
  SEARCH_GAMES,
  ORDER_BY_NAME,
  MOSTRAR_BY_RATING,
  GET_GENRES,
  POST_VIDEOGAME,
  GET_PLATFORMS,
  GET_VIDEOGAME_DETAIL,
  FILTER_CREATE,
} = require("./actions");

const inicialState = {
  videogameLoad: [],
  allGenres: [],
  genres: [],
  platforms: [],
  videogameDetail: [],
  videogameCreated: [],
};

function rootReducer(state = inicialState, action) {
  switch (action.type) {
    case GET_VIDEOGAME:
      return {
        ...state,
        videogameLoad: action.payload,
      };
    case SEARCH_GAMES:
      return {
        ...state,
        videogameLoad: action.payload,
      };
    case FILTER_BY_GENRES:
      return {
        ...state,
        allGenres: action.payload,
      };
    case MOSTRAR_BY_GENRES:
      let filterByGenres = state.videogameLoad.filter((e) => {
        return [e.genres].join("").includes(action.payload);
      });
      return {
        ...state,
        videogameLoad: filterByGenres,
      };
    case ORDER_BY_NAME:
      let sortArr =
        action.payload === "Asc"
          ? state.videogameLoad.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              } else if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.videogameLoad.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });

      return {
        ...state,
        videogameLoad: sortArr,
      };
    case MOSTRAR_BY_RATING:
      let filterByRating =
        action.payload === "Mayor-rating"
          ? state.videogameLoad.sort((a, b) => {
              if (a.rating > b.rating) {
                return -1;
              } else if (b.rating > a.rating) {
                return 1;
              }
              return 0;
            })
          : state.videogameLoad.sort((a, b) => {
              if (a.rating > b.rating) {
                return 1;
              }
              if (b.rating > a.rating) {
                return -1;
              }
              return 0;
            });

      return {
        ...state,
        videogameLoad: filterByRating,
      };
    case POST_VIDEOGAME:
      return {
        ...state,
      };
    case GET_GENRES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_PLATFORMS:
      return {
        ...state,
        platforms: action.payload,
      };
    case GET_VIDEOGAME_DETAIL:
      return {
        ...state,
        videogameDetail: action.payload,
      };
    case FILTER_CREATE:
      const allvideogame = state.videogameLoad;
      const createdFilter =
        action.payload === "Created"
          ? allvideogame.filter((el) => el.createInDb)
          : allvideogame.filter((el) => !el.createInDb);

      return {
        ...state,
        videogameLoad:
          action.payload === "All" ? state.videogameLoad : createdFilter,
      };
    default:
      return state;
  }
}

export default rootReducer;
