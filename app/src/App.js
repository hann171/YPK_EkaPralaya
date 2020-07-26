import React, { useReducer, createContext, useState } from 'react';
import { Route, Switch, BrowserRouter, Redirect, withRouter } from 'react-router-dom'
import './App.css';
import UserRegistComp from './Component/UserRegistComp';
import NavbarComp from './Component/NavbarComp';
import LoginComp from './Component/LoginComp';
import HomeComp from './Component/HomeComp';
import AdminLoginPage from './Component/AdminLoginPage';


//context
export const AuthContext = createContext()
export const AdminAuthContext = createContext()

//state
const initialstate = {
  isAuthenticated: false,
  isAdminAuthenticated: false,
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

    case "ADMIN_LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      localStorage.setItem("token", JSON.stringify(action.payload.token))
      return {
        ...state,
        isAdminAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      }

    case "LOGOUT":
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        isAdminAuthenticated: false,
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
          <AdminAuthContext.Provider value={{
            state, dispatch
          }}>
            <Main />
            {!state.isAuthenticated ?
              //jika tidak login
              <Redirect to={{
                pathname: "/"
              }} /> :
              //jika login
              <Redirect to={{
                pathname: "/home"
              }} />
            }
            {!state.isAdminAuthenticated ?
              //jika tidak login
              <Redirect to={{
                pathname: "/"
              }} /> :
              //jika login
              <Redirect to={{
                pathname: "/register"
              }} />
            }
          </AdminAuthContext.Provider>

        </AuthContext.Provider>
      </Switch>
    </BrowserRouter>
  )
}

const Main = withRouter(({ location }) => {
  return (
    <div>
      {
        location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/admin/login' && <NavbarComp />
      }
      <Route exact path="/" component={HomeComp} />
      <Route exact path="/home" component={HomeComp} />
      <Route exact path="/login" component={LoginComp} />
      <Route exact path="/register" component={UserRegistComp} />
      <Route exact path="/admin/login" component={AdminLoginPage} />
    </div>
  )
})

export default App;
