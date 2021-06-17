import GameContainer from './GameContainer';
import Home from './Home';
import Lobby from './Lobby';
import FourOhFour from './404';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path='/lobby/:id' component={Lobby}/>
          <Route path='/decktest' component={GameContainer}/>
          <Route path='*' component={FourOhFour}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
