import React from "react";
import GameUI from "../GameUI/GameUI";
import Home from "../Home/Home";
import Lobby from "../Lobby/Lobby";
import FourOhFour from "../404/404";
import LoginPage from "../LoginPage/LoginPage";
import Navbar from "../Navbar/Navbar";
import About from "../About/About"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "../theme/Theme";
import "./app.css";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <div className="App">
        
        <BrowserRouter>
        <Navbar></Navbar>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/login" component={LoginPage} />
            <Route path="/lobby/:id" component={Lobby} />
            <Route path="/decktest" component={GameUI} />
            <Route path="*" component={FourOhFour} />
          </Switch>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
