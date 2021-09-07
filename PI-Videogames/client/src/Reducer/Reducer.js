const {
  GET_VIDEOGAME,
  FILTER_BY_GENRES,
  MOSTRAR_BY_GENRES,
  SEARCH_GAMES,
} = require("../Actions/actions");

const inicialState = {
  videogameLoad: [],
  allGenres: [],
  videogameFilterByGenres: [],
  videoGameName: [],
};

function rootReducer(state = inicialState, action) {
  switch (action.type) {
    case GET_VIDEOGAME:
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
    case SEARCH_GAMES:
      return {
        ...state,
        videoGameName: action.payload.search,
      };
    default:
      return state;
  }
}

export default rootReducer;
