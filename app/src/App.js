import React, { useReducer, createContext } from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom'
import './App.css';
import UserRegistComp from './Component/UserRegistComp';
import NavbarComp from './Component/NavbarComp';
import LoginComp from './Component/LoginComp';
import HomeComp from './Component/HomeComp';

//context
export const AuthContext = createContext()

//state
const initialstate = {
  isAuthenticated: false,
  user: null,
  token: null
}

//reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      localStorage.setItem("token", JSON.stringify(action.payload.token))
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      }

    case "LOGOUT":
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    
    default:
      return state
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialstate)
  return (
    <BrowserRouter>
      <Switch>
        <AuthContext.Provider value={{
          state, dispatch
        }}>
          <NavbarComp />
          {!state.isAuthenticated ?
            //jika logout
            <Redirect to={{
              pathname: "/"
            }} /> :
            //jika login
            <Redirect to={{
              pathname: "/home"
            }} />
          }

          <Route exact path="/" component={LoginComp} />
          <Route exact path="/home" component={HomeComp} />
          <Route exact path="/user/register" component={UserRegistComp} />
        </AuthContext.Provider>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
