import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import Home from './Home';
import Calculator from './Calculator';
import Results from './Results';
import Investments from './Investments';

class Routing extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <Router>
                <Navbar className='App-nav' bg='dark' variant='dark' style={{ display:'flex', justifyContent:'center'}}>
                    <NavLink className='App-nav-link' activeClassName='active-link' exact={true} to='/'>Home</NavLink>
                    <NavLink className='App-nav-link' activeClassName='active-link' exact={true} to='/calc'>Calculator</NavLink>
                    <NavLink className='App-nav-link' activeClassName='active-link' exact={true} to='/calc/results'>Results</NavLink>
                    <NavLink className='App-nav-link' activeClassName='active-link' exact={true} to='/calc/investments'>Investments</NavLink>
                </Navbar>
                <Switch>
                    <Route exact path = '/' component={Home} ></Route>
                    <Route exact path = '/calc' component={Calculator} ></Route>
                    <Route exact path = '/calc/results'component={Results}></Route>
                    <Route exact path = '/calc/investments' component={Investments} ></Route>
                </Switch>
            </Router>
        );
    }
}
 
export default Routing;