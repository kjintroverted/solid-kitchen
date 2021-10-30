import { Button } from "@material-ui/core";
import { useState } from "react";
import RecipeForm from "./Forms/RecipeForm";
import { Row, Spacer } from "./styled";

function Recipes() {

  const [cookbook, updateCookbook] = useState()
  const [add, setAdd] = useState(false)

  return (
    <>
      <Row justify="flex-start" align="center">
        <Spacer />
        { !cookbook && <h3>No recipes yet...</h3> }
        <Spacer />
        <Button variant="outlined" onClick={ () => setAdd(!add) } color="primary">
          <span className="material-icons">{ add ? 'close' : 'add' }</span>
        </Button>
      </Row>
      {
        add &&
        <RecipeForm />
      }
    </>
  )
}

export default Recipes;