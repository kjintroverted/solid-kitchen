import { Button } from "@material-ui/core";
import { useState } from "react";
import RecipeForm from "./RecipeForm";
import { Pane, Row, Spacer } from "../styled";
import { Route } from "react-router";
import RecipePreview from "./RecipePreview";
import RecipeCard from "./RecipeCard";

function Recipes({ recipes, deleteRecipe }) {

  const [add, setAdd] = useState(false)

  return (
    <>
      <Route path="/" exact={ window.innerWidth < 500 }>
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
      </Route>
      <Route path="/:recipe_id">
        <RecipeCard recipes={ recipes } deleteRecipe={ deleteRecipe } />
      </Route>
    </>
  )
}

export default Recipes;