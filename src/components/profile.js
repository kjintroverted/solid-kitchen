import { Button, IconButton, Input, InputAdornment } from "@material-ui/core";
import { useState } from "react";
import { BigBar, BigIconHeader, Column, Pane } from "./styled";


function Profile({ profile, onChange, submit }) {

  const [edit, toggleEdit] = useState(false);

  function update(field) {
    return ({ target }) => {
      onChange({ ...profile, [field]: target.value })
    }
  }

  function updateName({ target }) {
    let [firstName = '', lastName = ''] = target.value.split(' ');
    onChange({ ...profile, firstName, lastName })
  }

  if (!profile) return <></>

  return (
    <>
      <BigBar>
        <BigIconHeader className="material-icons">account_circle</BigIconHeader>
        <Column>
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
                  <IconButton onClick={ () => toggleEdit(!edit) }>
                    <span className="material-icons">done</span>
                  </IconButton>
                </InputAdornment>
              }
              onChange={ updateName } />
          }
          <p>{ profile.nickname }</p>
        </Column>
      </BigBar>
      <Pane>

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
        <Button onClick={ submit }>Save</Button>
      </Pane>
    </>)
}

export default Profile;