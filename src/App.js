import './App.css';
import { Main, muiTheme } from './components/styled';
import { appLogin, getDomain, getThings, loadDataset, loadThing, save } from './util/pods';
import { useEffect, useState } from 'react';
import { getDefaultSession } from '@inrupt/solid-client-authn-browser';
import models from './models'
import Profile from './components/Profile';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { ThemeProvider } from '@material-ui/core';

function App() {

  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const [things, setThings] = useState();

  useEffect(() => {
    const session = getDefaultSession();
    session.handleIncomingRedirect()
      .then(info => {
        if (info.isLoggedIn) setUser(info.webId)
        else appLogin()
      })
  }, [])

  // USER LOADED => LOAD DATA
  useEffect(() => {
    if (user) {
      // LOAD PROFILE
      loadThing(user, models.profileStruct)
        .then(setProfile)
      // LOAD COOKBOOK DATASET
      loadDataset(getDomain(user) + "/kitchen")
        .then(data => {
          setThings(getThings(data))
        });
    }
  }, [user])

  return (
    <ThemeProvider theme={ muiTheme }>
      <Main>
        <Router>
          <Switch>
            <Route path="/profile">
              <Profile
                profile={ profile }
                onChange={ setProfile }
                submit={ save } />
            </Route>
            <Route path="/">
              {/* TODO: loading logic */ }
              { profile && <Dashboard name={ profile.firstName } data={ things } /> }
            </Route>
          </Switch>
        </Router>
      </Main>
    </ThemeProvider>
  );
}

export default App;

