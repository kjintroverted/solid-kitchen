import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import RecipeForm from "./RecipeForm";
import { Pane, Row } from "../styled";
import { Route } from "react-router";
import RecipePreview from "./RecipePreview";
import RecipeCard from "./RecipeCard";

function Recipes({ recipes, deleteRecipe, addRecipe }) {

  const [add, setAdd] = useState(false);
  const [filter, updateFilter] = useState("");

  function onSubmit(recipe) {
    addRecipe(recipe);
    setAdd(false);
  }

  return (
    <>
      <Route path="/" exact={ window.innerWidth < 500 }>
        <Pane>
          <Row justify="flex-start" align="center">
            { (recipes && !recipes.length) && <h3>No recipes yet...</h3> }
            { (recipes && recipes.length) &&
              <TextField style={ { flex: 1 } } placeholder="Search..." onChange={ e => updateFilter(e.target.value) } />
            }
            <Button variant={ add ? 'text' : 'contained' } onClick={ () => setAdd(!add) } color="primary">
              <span>{ add ? 'cancel' : 'add recipe' }</span>
            </Button>
          </Row>
          {
            add &&
            <RecipeForm onSubmit={ onSubmit } />
          }
          {
            recipes &&
            recipes
              .filter(r => !filter
                || r.name.toLowerCase().indexOf(filter) >= 0
                || r.ingredients.findIndex(i => i.item.toLowerCase().indexOf(filter) >= 0) >= 0
              )
              .map(r => <RecipePreview key={ r.thing.url } recipe={ r } />)
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