import { HeaderBar, SaveButton, Spacer, THEME } from "./styled";
import { Button, IconButton } from '@material-ui/core'
import { Link, Switch, Route, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { recipeStruct } from "../models/recipe";
import { loadThing, deleteThing, nameFilter, SaveState } from "../util/pods";
import { Recipes } from "./recipes";
import styled from "styled-components";
import MealPlan from "./meal-plan/MealPlan";

function Dashboard({ name, data }) {


  const [recipes, setRecipes] = useState()
  const [mealplan, setMealPlan] = useState({
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    sun: []
  })
  const { queue, saveFromQ } = useContext(SaveState);
  let location = useLocation()

  useEffect(() => {
    if (!data) return
    loadRecipes(data)
      .then(setRecipes)

  }, [data])

  async function loadRecipes(things) {
    // GET ALL RECIPE DATA
    return await Promise.all(
      things
        .filter(nameFilter('recipe'))
        .map(t => loadThing(t.url, recipeStruct))
    );
  }

  async function deleteRecipe(recipe) {
    await deleteThing(recipe.thing)
    let index = recipes.findIndex(r => r.thing.url === recipe.thing.url)
    setRecipes([
      ...recipes.slice(0, index),
      ...recipes.slice(index + 1)
    ])
    console.log('Deleted ' + recipe.name);
  }

  async function updateRecipe(recipe) {
    let index = recipes.findIndex(r => r.thing.url === recipe.thing.url)
    setRecipes([
      ...recipes.slice(0, index),
      recipe,
      ...recipes.slice(index + 1)
    ])
    console.log('Updated ' + recipe.name);
  }

  function addRecipe(recipe) {
    setRecipes([...recipes, recipe])
  }

  function planRecipe(recipe, day) {
    let dayPlan = mealplan[day];
    if (dayPlan.findIndex(r => r.thing.url === recipe.thing.url) >= 0) return;
    setMealPlan({ ...mealplan, [day]: [...dayPlan, recipe] })
    console.log(`Make ${ recipe.name } on ${ day }`)
  }

  return (
    <Layout>
      <HeaderBar>
        <h2>{ name ? `${ name }'s` : "My" } Kitchen</h2>
        <Spacer />
        <Link to={ location.pathname === "/" ? "/meal-plan" : "/" }>
          <IconButton color="inherit">
            <span className="material-icons">{ location.pathname === "/" ? "date_range" : "event_note" }</span>
          </IconButton>
        </Link>
        <Link to="/profile">
          <IconButton color="inherit">
            <span className="material-icons">person</span>
          </IconButton>
        </Link>
      </HeaderBar>
      <Main>
        <Switch>
          <Route path="/meal-plan">
            <MealPlan plan={ mealplan } />
          </Route>
          <Route path="/">
            <Recipes
              deleteRecipe={ deleteRecipe }
              recipes={ recipes }
              updateRecipe={ updateRecipe }
              addRecipe={ addRecipe }
              planRecipe={ planRecipe } />
          </Route>
        </Switch>
      </Main>
      {
        !!queue.length &&
        <SaveButton>
          <Button
            variant="contained"
            color="secondary"
            onClick={ saveFromQ }>
            Save
          </Button>
        </SaveButton>
      }
    </Layout >
  )
}

export default Dashboard;

const Layout = styled.div`
  background: ${ THEME.light };
  display: grid;
  grid-template-rows: 5.2em 1fr;
  grid-template-areas: 
    "header"
    "main";
`

const Main = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  grid-area: main;
`