import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import RecipeForm from "./RecipeForm";
import { Pane, Row } from "solid-core";
import { Route } from "react-router";
import RecipePreview from "./RecipePreview";
import RecipeCard from "./RecipeCard";
import MealPlanBuckets from "../meal-plan/MealPlanBuckets";

function Recipes({
  recipes,
  deleteRecipe,
  addRecipe,
  updateRecipe,
  planRecipe }) {

  const [add, setAdd] = useState(false);
  const [filter, updateFilter] = useState("");
  const [planning, setPlanning] = useState(null);

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
                || (r.tags && r.tags.findIndex(t => t.toLowerCase().indexOf(filter) >= 0) >= 0)
              )
              .map(r => <RecipePreview key={ r.thing.url } recipe={ r } onDrag={ () => setPlanning(true) } onDragEnd={ () => setPlanning(false) } />)
          }
        </Pane>
      </Route>
      <Route path="/recipes/:recipe_id">
        <RecipeCard recipes={ recipes } deleteRecipe={ deleteRecipe } updateRecipe={ updateRecipe } />
      </Route>
      <MealPlanBuckets visible={ planning } planRecipe={ planRecipe } />
    </>
  )
}

export default Recipes;