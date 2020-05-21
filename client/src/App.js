import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Header from './components/layout/Header'
import Profile from './components/docs/Profile'
import Home from './components/docs/Home'
import Search from './components/docs/Search'
import Post from './components/docs/Post'
import CreateProfile from './components/themes/CreateProfile'
import EditProfile from './components/themes/EditProfile'
import AddExperience from './components/themes/AddExperience'
import AddEducation from './components/themes/AddEducation'
import PrivateRoute from './components/routes/PrivateRoute'
// redux
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './job/auth'
import setAuthToken from './utils/setAuthToken'

const App = () => {

  useEffect(() => {
    setAuthToken(localStorage.token)
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <Switch>
            <Route exact path='/' component={Signup} />
            <Route exact path='/login' component={Login} />
            <PrivateRoute exact path='/event' component={Home} />
            <PrivateRoute exact path='/post/event' component={Post} />
            <PrivateRoute exact path='/profile' component={Profile} />
            <PrivateRoute exact path='/search' component={Search} />
            <PrivateRoute exact path='/settings/profile/setup' component={CreateProfile} />
            <PrivateRoute exact path='/settings/profile/edit' component={EditProfile} />
            <PrivateRoute exact path='/settings/profile/experience' component={AddExperience} />
            <PrivateRoute exact path='/settings/profile/education' component={AddEducation} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
