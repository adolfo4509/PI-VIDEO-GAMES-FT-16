import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import AddImage from "./CrearVideogame/AddImage";
import CreateVideogame from "./CrearVideogame/CreateVideogame";
import Detail from "./Detail/Detail";
import Home from "./Home/Home";
import Landing from "./Landing/landing";
import Layout from "./Layout";

function App() {
  
  return (
    <>
    <BrowserRouter>
      <Layout>
        <div className="App">
          
            <Route exact path="/" component={Landing} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/videogame" component={CreateVideogame} />
            <Route exact path="/detail/:id" component={Detail} />
            <Route exact path="/game/:videogameId" component={AddImage} />
          
        </div>
      </Layout>
    </BrowserRouter>
    </>
  );
}

export default App;
