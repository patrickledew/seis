import React from "react";
import GameUI from "../GameUI/GameUI";
import Home from "../Home/Home";
import Lobby from "../Lobby/Lobby";
import FourOhFour from "../404/404";
import LoginPage from "../LoginPage/LoginPage";
import LobbyNew from "../New-Lobby/Lobby";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "../theme/Theme";
import "./app.css";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LoginPage} />
            <Route path="/lobby/:id" component={Lobby} />
            <Route path="/decktest" component={GameUI} />
            <Route path="/new-lobby" component={LobbyNew}/>
            <Route path="*" component={FourOhFour} />
            
          </Switch>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
