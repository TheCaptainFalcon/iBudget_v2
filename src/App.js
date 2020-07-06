import React from 'react';
import './App.css';
import Calculator from './components/Calculator';
import Home from './components/Home';
import Investments from './components/Investments';
import Results from './components/Results';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { ResultsProvider, ExpenseProvider, IncomeProvider } from './Contexts';


function App() {
  return ( 
    <Calculator/>
  );
}

export default App;
