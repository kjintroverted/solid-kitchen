import { HeaderBar, SaveButton, Spacer, THEME } from "./styled";
import { Button, IconButton } from '@material-ui/core'
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { recipeStruct } from "../models/recipe";
import { loadThing, deleteThing, nameFilter, SaveState } from "../util/pods";
import { Recipes } from "./recipes";
import styled from "styled-components";

function Dashboard({ name, data }) {


  const [recipes, setRecipes] = useState()
  const { queue, saveFromQ } = useContext(SaveState);

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
    debugger;
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

  return (
    <Layout>
      <HeaderBar>
        <h2>{ name ? `${ name }'s` : "My" } Kitchen</h2>
        <Spacer />
        <Link to="/profile">
          <IconButton color="inherit">
            <span className="material-icons">person</span>
          </IconButton>
        </Link>
      </HeaderBar>
      <Main>
        <Recipes
          deleteRecipe={ deleteRecipe }
          recipes={ recipes }
          updateRecipe={ updateRecipe }
          addRecipe={ addRecipe } />
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
    </Layout>
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