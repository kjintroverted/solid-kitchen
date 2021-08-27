import { HeaderBar, Spacer } from "./styled";
import { Button } from '@material-ui/core'

function Dashboard({ name }) {

  return (
    <>
      <HeaderBar>
        <h2>{ name ? `${ name }'s` : "My" } Kitchen</h2>
        <Spacer />
        <Button color="inherit">
          <span className="material-icons">person</span>
          { 'Profile' }
        </Button>
      </HeaderBar>
      Dash content
    </>
  )
}

export default Dashboard;