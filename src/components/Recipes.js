import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import { recipeStruct } from "../models/recipe";
import { loadThing } from "../util/pods";
import RecipeForm from "./Forms/RecipeForm";
import { Row, Spacer } from "./styled";

function Recipes({ data }) {

  const [add, setAdd] = useState(false)
  const [recipes] = useState([])

  useEffect(() => {
    if (!data) return
    loadRecipes(data)
      .then(console.log)
  }, [data])

  function loadRecipes(things) {
    return Promise.all(
      things.map(t => loadThing(t.url, recipeStruct))
    );
  }

  return (
    <>
      <Row justify="flex-start" align="center">
        <Spacer />
        { !recipes.length && <h3>No recipes yet...</h3> }
        <Spacer />
        <Button variant="outlined" onClick={ () => setAdd(!add) } color="primary">
          <span className="material-icons">{ add ? 'close' : 'add' }</span>
        </Button>
      </Row>
      {
        add &&
        <RecipeForm onSubmit={ () => setAdd(false) } />
      }
    </>
  )
}

export default Recipes;