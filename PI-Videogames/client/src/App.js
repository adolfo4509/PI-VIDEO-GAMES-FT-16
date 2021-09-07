import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import Home from "./Home/Home";
import Landing from "./Landing/landing";
import Nav from "./Nav/Nav";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="App">
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/home" component={Home} />
      </div>
    </BrowserRouter>
  );
}

export default App;
