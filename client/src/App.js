import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/landingPage/LandingPage.jsx';
import Home from './components/home/Home';
import Detail from './components/detail/Detail.jsx';
import CreateVideoGame from './components/createVideoGame/CreateVideoGame';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/home' component={Home} />
          <Route path='/home/:id' component={Detail} />
          <Route path='/createVideoGame' component={CreateVideoGame} />
          <Route path='/' component={LandingPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
