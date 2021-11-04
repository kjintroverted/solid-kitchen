import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { recipeStruct } from "../models/recipe";
import { ingredientStruct } from "../models/ingredient";
import { loadThing, nameFilter } from "../util/pods";
import RecipeForm from "./Forms/RecipeForm";
import { Row, Spacer } from "./styled";
import RecipeCard from "./RecipeCard";

function Recipes({ data }) {

  const [add, setAdd] = useState(false)
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
        recipes.map(r => <RecipeCard key={ r.thing.url } recipe={ r } />)
      }
    </>
  )
}

export default Recipes;