import { Button, IconButton, TextField } from "@material-ui/core";
import { useState } from "react";
import { Card, Row } from "../styled";

function RecipeForm() {

  const [recipe, updateRecipe] = useState({
    ingredients: [],
    steps: []
  });
  const [addIngredient, setAddIngredient] = useState(false);
  const [ingredient, updateIngredient] = useState({});
  const [addStep, setAddStep] = useState(false);
  const [step, updateStep] = useState();

  function handleRecipeChange(field) {
    return ({ target }) => {
      updateRecipe({ ...recipe, [field]: target.value })
    }
  }

  function handleIngredientChange(field) {
    return ({ target }) => {
      updateIngredient({ ...ingredient, [field]: target.value })
    }
  }

  function submitIngredient() {
    updateRecipe({ ...recipe, ingredients: [...recipe.ingredients, ingredient] })
    updateIngredient({})
    setAddIngredient(false)
  }

  function submitStep() {
    updateRecipe({ ...recipe, steps: [...recipe.steps, step] })
    updateStep({})
    setAddStep(false)
  }

  return (
    <Card>
      <TextField
        fullWidth
        onChange={ handleRecipeChange("title") }
        placeholder="Something delicious..."
        label="What's cooking?" />

      {/* INGREDIENT LIST */ }
      <h4>Ingredients</h4>
      <ul>
        {
          recipe.ingredients &&
          recipe.ingredients.map(({ qty, item }) => (
            <li>
              <Row align="center">
                <p>{ qty }</p><h3>{ item }</h3>
              </Row>
            </li>
          ))
        }
      </ul>
      {
        addIngredient &&
        <Row>
          <TextField
            className="flex-100"
            onChange={ handleIngredientChange('qty') }
            placeholder="1 tbsp"
            label="Quantity" />
          <TextField
            className="flex-200"
            onChange={ handleIngredientChange('item') }
            placeholder="9 ONIONS???"
            label="New Ingredient" />
          <IconButton color="primary" onClick={ submitIngredient }>
            <span className="material-icons">done</span>
          </IconButton>
        </Row>
      }
      <Button color="primary" onClick={ () => setAddIngredient(!addIngredient) }>
        <span className="material-icons">{ addIngredient ? 'close' : 'add' }</span>
      </Button>

      <h4>Instructions</h4>
      <ol>
        {
          recipe.steps &&
          recipe.steps.map(step => (
            <li>
              <Row align="center">
                <p>{ step }</p>
              </Row>
            </li>
          ))
        }
      </ol>
      {
        addStep &&
        <Row>
          <TextField
            className="flex-100"
            onChange={ ({ target }) => updateStep(target.value) }
            placeholder="Be awesome."
            label="New Step" />
          <IconButton color="primary" onClick={ submitStep }>
            <span className="material-icons">done</span>
          </IconButton>
        </Row>
      }
      <Button color="primary" onClick={ () => setAddStep(!addStep) }>
        <span className="material-icons">{ addStep ? 'close' : 'add' }</span>
      </Button>

      <Button
        variant="contained"
        color="primary"
        className="self-end"
        onClick={ () => console.log(recipe) }>
        Save Recipe
      </Button>
    </Card>
  )
}

export default RecipeForm;