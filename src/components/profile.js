import { Button, IconButton, Input, InputAdornment } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { profileStruct } from "../models/profile";
import { setAttr } from "../util/pods";
import { BigBar, BigIconHeader, Column, Spacer } from "./styled";


function Profile({ profile, profileThing, onChange, submit }) {

  const [edit, toggleEdit] = useState(false);
  const [thing, setThing] = useState();

  useEffect(() => {
    setThing(profileThing)
  }, [profileThing])

  function update(field) {
    return ({ target }) => {
      onChange({ ...profile, [field]: target.value })
      setThing(setAttr(thing, profileStruct[field], target.value))
    }
  }

  function updateName({ target }) {
    let [firstName = '', lastName = ''] = target.value.split(' ');
    onChange({ ...profile, firstName, lastName });
    let t = setAttr(thing, profileStruct['firstName'], firstName)
    setThing(setAttr(t, profileStruct['lastName'], lastName))
  }

  if (!profile) return <></>

  return (
    <>
      <BigBar>
        <BigIconHeader className="material-icons">account_circle</BigIconHeader>
        <Column justify="center">
          { !edit ?
            <h2 style={ { margin: 0 } }>
              { profile.firstName } { profile.lastName }
              <span className="material-icons" onClick={ () => toggleEdit(!edit) }>edit</span>
            </h2>
            : <Input
              type="text"
              placeholder="name"
              defaultValue={ profile.firstName ? `${ profile.firstName } ${ profile.lastName }` : "" }
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={ () => toggleEdit(!edit) } color="inherit">
                    <span className="material-icons">done</span>
                  </IconButton>
                </InputAdornment>
              }
              onChange={ updateName } />
          }
          <p>{ profile.nickname }</p>
        </Column>
        <Spacer />
        <Column justify="flex-end">
          <Link to="/">
            <IconButton color="inherit">
              <span className="material-icons large">kitchen</span>
            </IconButton>
          </Link>
        </Column>
      </BigBar>
      <Column align="center">
        <Input
          type="text"
          placeholder="nickname"
          defaultValue={ profile.nickname || "" }
          startAdornment={
            <InputAdornment position="start">
              <span className="material-icons">account_circle</span>
            </InputAdornment>
          }
          onChange={ update("nickname") } />
        <Input
          type="text"
          placeholder="email"
          defaultValue={ profile.email || "" }
          startAdornment={
            <InputAdornment position="start">
              <span className="material-icons">email</span>
            </InputAdornment>
          }
          onChange={ update("email") } />
        <Button onClick={ submit } color="primary">update</Button>
      </Column>
    </>)
}

export default Profile;