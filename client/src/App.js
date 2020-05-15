import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Navbar from './components/layout/Navbar'
import Alert from './components/layout/Alert'
// redux
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './job/auth'
import setAuthToken from './utils/setAuthToken'

if (localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path='/' component={Signup} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/dashboard' component={Navbar} />
          <Alert />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
