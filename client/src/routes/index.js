import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import decode from 'jwt-decode'

import Home from './Home'
import Login from './Login'
import Chat from './Chat'

const isAuthenticated = () => {
  const token = localStorage.getItem('token')
  const refreshToken = localStorage.getItem('refreshToken')
  try {
    decode(token)
    decode(refreshToken)
  } catch (err) {
    return false
  }

  return true
}

// HOC to protect routes which needs auth users
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login'
          }}
        />
      )
    }
  />
)

export default () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <PrivateRoute path="/chat" exact component={Chat} />
    </Switch>
  </BrowserRouter>
)
