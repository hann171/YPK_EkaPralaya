import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import './App.css';
import UserRegistComp from './Component/UserRegistComp';
import NavbarComp from './Component/NavbarComp';

const App = ()=>{
  return (
    <BrowserRouter>
      <NavbarComp/>
      <Switch>
        <Route exact path="/user/register" component={UserRegistComp} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
