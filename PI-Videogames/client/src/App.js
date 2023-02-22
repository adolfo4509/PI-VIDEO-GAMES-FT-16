import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import AddImage from "./CrearVideogame/AddImage";
import CreateVideogame from "./CrearVideogame/CreateVideogame";
import Detail from "./Detail/Detail";
import Home from "./Home/Home";
import Landing from "./Landing/landing";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route path="/home" component={Home} />
        <Route path="/videogame" component={CreateVideogame} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/game/:videogameId" component={AddImage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
