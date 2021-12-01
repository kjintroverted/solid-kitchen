import { profileStruct } from "../models";
import { addToUpdateQueue, setAttr } from "solid-core";
import { BigBar, BigIconHeader, Column, SaveButton, Spacer } from "./styled";


const Profile = ({
  profile,
  edit,
  toggleEdit,
  onChange,
  saveState,
  ui
}) => {

  function updateField(field) {
    return ({ target }) => {
      let t = setAttr(profile.thing, profileStruct[field], target.value);
      saveState.updateQueue(addToUpdateQueue(saveState.queue, t))
      onChange({ ...profile, thing: t, [field]: target.value })
    }
  }

  function updateName({ target }) {
    let [firstName = '', lastName = ''] = target.value.split(' ');
    let t = setAttr(profile.thing, profileStruct['firstName'], firstName)
    t = setAttr(t, profileStruct['lastName'], lastName)
    saveState.updateQueue(addToUpdateQueue(saveState.queue, t))
    onChange({ ...profile, thing: t, firstName, lastName });
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
            : <ui.Input
              type="text"
              placeholder="name"
              defaultValue={ profile.firstName ? `${ profile.firstName } ${ profile.lastName }` : "" }
              endAdornment={
                <ui.InputAdornment position="end">
                  <ui.IconButton onClick={ () => toggleEdit(!edit) } color="inherit">
                    <span className="material-icons">done</span>
                  </ui.IconButton>
                </ui.InputAdornment>
              }
              onChange={ updateName } />
          }
          <p>{ profile.nickname }</p>
        </Column>
        <Spacer />
        <Column justify="flex-end">
          <ui.IconButton color="inherit" href="https://kitchen.wkgreen.dev">
            <span className="material-icons large">kitchen</span>
          </ui.IconButton>
        </Column>
      </BigBar>
      <Column align="center">
        <ui.Input
          type="text"
          placeholder="nickname"
          defaultValue={ profile.nickname || "" }
          startAdornment={
            <ui.InputAdornment position="start">
              <span className="material-icons">account_circle</span>
            </ui.InputAdornment>
          }
          onChange={ updateField("nickname") } />
        <ui.Input
          type="text"
          placeholder="email"
          defaultValue={ profile.email || "" }
          startAdornment={
            <ui.InputAdornment position="start">
              <span className="material-icons">email</span>
            </ui.InputAdornment>
          }
          onChange={ updateField("email") } />
        {
          !!saveState.queue.length &&
          <SaveButton>
            <ui.Button
              variant="contained"
              color="secondary"
              onClick={ saveState.saveFromQ }>
              Save
            </ui.Button>
          </SaveButton>
        }
      </Column>
    </>)
}

export default Profile;