import './App.css';
import { Main, muiTheme } from './components/styled';
import { appLogin, getData, saveData } from './util/pods';
import { useEffect, useState } from 'react';
import { getDefaultSession } from '@inrupt/solid-client-authn-browser';
import models from './models'
import Profile from './components/Profile';
import { profileStruct } from './models/profile';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import { ThemeProvider } from '@material-ui/core';

function App() {

  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const [profileThing, setProfileThing] = useState();

  useEffect(() => {
    const session = getDefaultSession();
    session.handleIncomingRedirect()
      .then(info => {
        if (info.isLoggedIn) setUser(info.webId)
        else appLogin()
      })
  }, [])

  useEffect(() => {
    if (user) {
      getData(user, models.profileStruct)
        .then(([thing, profile]) => {
          setProfileThing(thing)
          setProfile(profile)
        })
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
                submit={ () => saveData(profileThing, profile, profileStruct) } />
            </Route>
            <Route path="/">
              {/* TODO: loading logic */ }
              { profile && <Dashboard name={ profile.firstName } /> }
            </Route>
          </Switch>
        </Router>
      </Main>
    </ThemeProvider>
  );
}

export default App;

