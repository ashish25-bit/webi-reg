import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Header from './components/layout/Header'
import Routes from './components/routes/Routes'

// redux
import { Provider } from 'react-redux'
import store from './store'
import { loadUser } from './job/auth'
import setAuthToken from './utils/setAuthToken'

const App = () => {

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
      store.dispatch(loadUser())
    }
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <Route component={Routes} />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
