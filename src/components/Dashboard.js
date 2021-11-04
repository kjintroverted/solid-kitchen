import { Content, HeaderBar, Spacer } from "./styled";
import { IconButton } from '@material-ui/core'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { recipeStruct } from "../models/recipe";
import { ingredientStruct } from "../models/ingredient";
import { loadThing, nameFilter } from "../util/pods";
import { Recipes } from "./recipes";

function Dashboard({ name, data }) {


  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    if (!data) return
    loadRecipes(data)
      .then(setRecipes)
  }, [data])

  async function loadRecipes(things) {
    // GET ALL RECIPE DATA
    let rList = await Promise.all(
      things
        .filter(nameFilter('recipe'))
        .map(t => loadThing(t.url, recipeStruct))
    );
    // GET ALL INGREDIENT DATA
    let iList = await Promise.all(
      things
        .filter(nameFilter('ingredient'))
        .map(t => loadThing(t.url, ingredientStruct))
    );
    // MAP THE INGREDIENTS INTO THE CORRECT RECIPE
    return rList.map(r => {
      return {
        ...r,
        ingredients: r.ingredientRefs.map(url => iList.find(i => i.thing.url === url))
      }
    })
  }

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
        <Recipes recipes={ recipes } />
      </Content>
    </>
  )
}

export default Dashboard;