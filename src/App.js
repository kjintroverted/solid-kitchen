import './App.css';
import { Back } from './components/styled';
import { appLogin, getData, saveData } from './util/pods';
import { useEffect, useState } from 'react';
import { getDefaultSession } from '@inrupt/solid-client-authn-browser';
import models from './models'
import Profile from './components/profile';
import { profileStruct } from './models/profile';

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
    <Back>
      <Profile
        profile={ profile }
        onChange={ setProfile }
        submit={ () => saveData(profileThing, profile, profileStruct) } />
    </Back>
  );
}

export default App;

