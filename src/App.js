import React from 'react';
import './App.css';
import Calculator from './components/Calculator';
import Home from './components/Home';
import Investments from './components/Investments';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';



function App() {
  return ( 
    <Router>
      <Navbar className='App-nav' bg="dark" variant="dark">
          <NavLink className="App-nav-link" activeClassName='active-link' exact={true} to='/'>Home</NavLink>
          <NavLink className="App-nav-link" activeClassName='active-link' exact={true} to='/calc'>Calculator</NavLink>
          <NavLink className="App-nav-link" activeClassName='active-link' exact={true} to='/calc/investments'>Investments</NavLink>
      </Navbar>
      <Switch>
        <Route exact path = '/' component={ Home } />
        <Route exact path = '/calc' component={ Calculator } />
        <Route exact path = '/calc/investments' component={ Investments } />
      </Switch>
    </Router>
  );
}

export default App;
