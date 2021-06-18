import GameUI from "./GameUI";
import Home from "./Home";
import Lobby from "./Lobby";
import FourOhFour from "./404";
import LoginPage from "./LoginPage/LoginPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/lobby/:id" component={Lobby} />
          <Route path="/decktest" component={GameUI} />
          <Route path="*" component={FourOhFour} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
