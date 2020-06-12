import React from 'react';
import './App.css';
import Calculator from './components/Calculator';
import Home from './components/Home';
import Results from './components/Results';
import { Route, Switch, NavLink, BrowserRouter as Router } from 'react-router-dom';

function App() {
  return ( 
    <Router>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName='active-link' exact={true} to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink activeClassName='active-link' exact={true} to='/calc'>Calculator</NavLink>
          </li>
          <li>
            <NavLink activeClassName='active-link' exact={true} to='/calc/results'>Results</NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/calc' component={Calculator} />
        <Route exact path='/calc/results' component={Results} />
      </Switch>
    </Router>
  );
}

export default App;
