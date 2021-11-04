import { Button } from "@material-ui/core";
import { useState } from "react";
import RecipeForm from "./RecipeForm";
import { Pane, Row, Spacer } from "../styled";
import { Route } from "react-router";
import RecipePreview from "./RecipePreview";

function Recipes({ recipes }) {

  const [add, setAdd] = useState(false)

  return (
    <>
      <Pane>
        <Row justify="flex-start" align="center">
          <Spacer />
          { !recipes.length && <h3>No recipes yet...</h3> }
          <Spacer />
          <Button variant={ add ? 'text' : 'contained' } onClick={ () => setAdd(!add) } color="primary">
            <span>{ add ? 'cancel' : 'add recipe' }</span>
          </Button>
        </Row>
        {
          add &&
          <RecipeForm onSubmit={ () => setAdd(false) } />
        }
        {
          recipes.map(r => <RecipePreview key={ r.thing.url } recipe={ r } />)
        }
      </Pane>
      <Route path="/:recipe_id">

      </Route>
    </>
  )
}

export default Recipes;