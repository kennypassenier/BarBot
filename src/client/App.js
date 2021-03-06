/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import './App.css';
import { Switch, Route, NavLink, BrowserRouter, useLocation as Location } from 'react-router-dom';
import DebugMenu from './views/DebugMenu';
import HomeScreen from './views/HomeScreen';
import Header from './components/Header';
import PumpsUpdate from './views/PumpsUpdate';
import ListDrinks from './views/ListDrinks';
import CreateDrink from './views/CreateDrink';

import CompanionCreateDrink from './companion/views/CreateDrink';
import CompanionCreateFluid from './companion/views/CreateFluid';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div className="App">
            <Route path="/app/createDrink">
              <CompanionCreateDrink />
            </Route>
            <Route path="/app/createFluid">
             <CompanionCreateFluid /> 
            </Route>
            <div className="body">
              <Route path="/debugMenu">
              <Header />
                <DebugMenu />
              </Route>
              <Route path="/pumps/update/:number" component={PumpsUpdate} exact />
              <Route path="/drinks/create">
              <Header />
              <CreateDrink />
              </Route>
              <Route path="/" exact={true}>
                <ListDrinks />
              </Route>
            </div>
          </div>
        </Switch>
      </BrowserRouter>
    )
  };
}

export default App;
