import React, { useReducer, createContext, useState } from 'react';
import { Route, Switch, BrowserRouter, Redirect, withRouter } from 'react-router-dom'
import './App.css';
import UserRegistComp from './Component/UserRegistComp';
import NavbarComp from './Component/NavbarComp';
import NavbarAdmin from './Component/NavbarAdmin'
import LoginComp from './Component/LoginComp';
import HomeComp from './Component/HomeComp';
import AdminLoginPage from './Component/AdminLoginPage';
import HomeAdmin from './Component/HomeAdmin';
import AboutPage from './Component/AboutPage';
import Anggota from './Component/Anggota';
import EditAnggota from './Component/EditAnggota';

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
      <AuthContext.Provider value={{ state, dispatch }}>
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
        <AdminAuthContext.Provider value={{ state, dispatch }}>
          {!state.isAdminAuthenticated ?
            //jika tidak login
            <Redirect to={{
              pathname: "/"
            }} /> :
            //jika login
            <Redirect to={{
              pathname: "/admin/home"
            }} />
          }
          <Switch>
            <Main />
          </Switch>
        </AdminAuthContext.Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

const Main = withRouter(({ location }) => {

  return (
    <div>

      {
        location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/admin/login' && location.pathname !== '/admin/home' && location.pathname !== '/admin/anggota' && location.pathname !== '/admin/anggota/edit' && <NavbarComp />
      }
      {
        location.pathname === '/admin/home' && <NavbarAdmin />
      }
      {
        location.pathname === '/admin/anggota' && <NavbarAdmin />
      }
      {
        location.pathname === '/admin/anggota/edit' && <NavbarAdmin />
      }

      <Route exact path="/" component={HomeComp} />
      <Route exact path="/home" component={HomeComp} />
      <Route exact path="/admin/home" component={HomeAdmin} />
      <Route exact path="/login" component={LoginComp} />
      <Route exact path="/admin/login" component={AdminLoginPage} />
      <Route exact path="/register" component={UserRegistComp} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/admin/anggota" component={Anggota} />
      <Route exact path="/admin/anggota/edit" component={EditAnggota} />
    </div>
  )
})

export default App;
