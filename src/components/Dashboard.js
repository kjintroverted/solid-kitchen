import { Content, HeaderBar, Pane, Spacer } from "./styled";
import Recipes from './Recipes'
import { IconButton } from '@material-ui/core'
import { Link } from "react-router-dom";

function Dashboard({ name, cookbook }) {

  return (
    <>
      <HeaderBar>
        <h2>{ name ? `${ name }'s` : "My" } Kitchen</h2>
        <Spacer />
        <Link to="/profile">
          <IconButton color="inherit">
            <span className="material-icons">person</span>
          </IconButton>
        </Link>
      </HeaderBar>
      <Content>
        <Pane>
          <Recipes dataset={ cookbook } />
        </Pane>
      </Content>
    </>
  )
}

export default Dashboard;