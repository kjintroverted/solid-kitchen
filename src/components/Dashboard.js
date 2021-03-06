import { IconButton, Snackbar } from '@material-ui/core'
import * as mui from '@material-ui/core'
import { Link, Switch, Route, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { recipeStruct } from "../models/recipe";
import {
  HeaderBar,
  SaveButton,
  Spacer,
  THEME,
  loadThing,
  deleteThing,
  nameFilter,
  SaveState,
  initThing,
  setAttr,
  addToUpdateQueue
} from "solid-core";
import { Recipes } from "./recipes";
import styled from "styled-components";
import MealPlan from "./meal-plan/MealPlan";
import mealplanStruct from "../models/mealplan";

function Dashboard({ name, data }) {


  const [recipes, setRecipes] = useState()
  const [alert, setAlert] = useState({})
  const [mealplan, setMealPlan] = useState({
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    sun: []
  })
  const { queue, updateQueue, saveFromQ } = useContext(SaveState);
  let location = useLocation()

  useEffect(() => {
    if (!data) return
    loadRecipes(data)
      .then(setRecipes)
  }, [data])

  useEffect(() => {
    if (!data) return
    async function loadMealPlan(things) {
      let emptyPlan = {
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
        sat: [],
        sun: []
      }
      // GET MEAL PLAN DATA
      let planThing = things.find(nameFilter('meal-plan'));
      let plan;
      if (planThing) {
        // LOAD AND RETURN
        plan = await loadThing(planThing.url, mealplanStruct);
      } else {
        // CREATE NEW AND RETURN
        plan = await initThing('meal-plan', emptyPlan, mealplanStruct);
      }
      return plan;
    }

    loadMealPlan(data)
      .then(setMealPlan)
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
    if (dayPlan.findIndex(r => r.thing.url === recipe.thing.url) >= 0) {
      setAlert({
        msg: `${ recipe.name } already exists on ${ day.toUpperCase() }.`,
        severity: 'warning'
      })
      return;
    }
    let thing = setAttr(mealplan.thing, mealplanStruct[day], [...dayPlan, recipe]);
    updateQueue(addToUpdateQueue(queue, thing))
    setMealPlan({ ...mealplan, [day]: [...dayPlan, recipe], thing })
    setAlert({
      msg: `Added ${ recipe.name } to ${ day.toUpperCase() }.`,
      severity: 'success'
    })
  }

  return (
    <Layout>
      <HeaderBar theme={ THEME }>
        <h2>{ name ? `${ name }'s` : "My" } Kitchen</h2>
        <Spacer />
        <Link to={ location.pathname === "/" ? "/recipes" : "/" }>
          <IconButton color="inherit">
            <span className="material-icons">{ location.pathname === "/" ? "event_note" : "date_range" }</span>
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
          <Route path="/recipes">
            <Recipes
              deleteRecipe={ deleteRecipe }
              recipes={ recipes }
              updateRecipe={ updateRecipe }
              addRecipe={ addRecipe }
              planRecipe={ planRecipe } />
            <Snackbar
              anchorOrigin={ { vertical: 'bottom', horizontal: 'right' } }
              open={ !!alert.msg }
              message={ alert.msg }
              action={ <span className='material-icons'>{ alert.severity === 'success' ? 'check_circle' : 'warning' }</span> }
              autoHideDuration={ 3000 }
              onClose={ () => setAlert({}) } />
          </Route>
          <Route path="/">
            <MealPlan plan={ mealplan } onChange={ setMealPlan } />
            {/* FEEDBACK FOR ADDING MEALS */ }
          </Route>
        </Switch>
      </Main>
      <SaveButton queue={ queue } save={ saveFromQ } ui={ mui } />
    </Layout >
  )
}

export default Dashboard;

const Layout = styled.div`
  background: ${ THEME.light };
  height: 100%;
  display: grid;
  grid-template-rows: 5.2em 1fr;
  grid-template-areas: 
    "header"
    "main";
`

const Main = styled.div`
  display: flex;
  background: ${ THEME.light };
  flex-direction: row;
  flex-wrap: wrap;
  grid-area: main;
`