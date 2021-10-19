import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './components/landingPage/LandingPage.jsx';
import Home from './components/home/Home';
import Detail from './components/detail/Detail.jsx';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/home' component={Home} />
          <Route path='/home/:id' component={Detail} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
