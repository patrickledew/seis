import GameContainer from './GameContainer';
import Home from './Home';
import Lobby from './Lobby';
import {BrowserRouter, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Home}/>
        <Route path='/lobby/:id' component={Lobby}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
