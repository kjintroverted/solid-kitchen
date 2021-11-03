import { Button, IconButton, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { ingredientStruct } from "../../models/ingredient";
import { recipeStruct } from "../../models/recipe";
import { newThing, saveThing, setAttr } from "../../util/pods";
import { Card, Row } from "../styled";

function RecipeForm({ onSubmit }) {

  const [recipe, updateRecipe] = useState({
    ingredients: [],
    steps: []
  });

  const [thing, setThing] = useState();
  const [ingList, updateIngList] = useState([]);
  const [ingThing, setIngThing] = useState();
  const [addIngredient, setAddIngredient] = useState(false);
  const [ingredient, updateIngredient] = useState({});
  const [addStep, setAddStep] = useState(false);
  const [step, updateStep] = useState();

  function handleRecipeChange(field) {
    return ({ target }) => {
      updateRecipe({ ...recipe, [field]: target.value })
      setThing(setAttr(thing, recipeStruct[field], target.value))
    }
  }

  function submitStep() {
    updateRecipe({ ...recipe, steps: [...recipe.steps, step] })
    setThing(setAttr(thing, recipeStruct['steps'], step))
    updateStep({})
    setAddStep(false)
  }

  function toggleIngredient() {
    setIngThing(newThing('ingredient'))
    setAddIngredient(!addIngredient)
  }

  function handleIngredientChange(field) {
    return ({ target }) => {
      updateIngredient({ ...ingredient, [field]: target.value })
      setIngThing(setAttr(ingThing, ingredientStruct[field], target.value))
    }
  }

  function submitIngredient() {
    updateRecipe({ ...recipe, ingredients: [...recipe.ingredients, ingredient] })
    updateIngredient({})
    setAddIngredient(false)
    updateIngList([...ingList, ingThing]);
  }

  async function saveRecipe() {
    let t = thing;
    for (let x in ingList) {
      let url = await saveThing(ingList[x])
      t = setAttr(t, recipeStruct.ingredientRefs, url)
    }
    await saveThing(t)
    console.log('saved recipe');
    onSubmit();
  }

  useEffect(() => {
    setThing(newThing('recipe'))
  }, [])

  return (
    <Card>
      <TextField
        fullWidth
        onChange={ handleRecipeChange("name") }
        placeholder="Something delicious..."
        label="What's cooking?" />

      {/* INGREDIENT LIST */ }
      <h4>Ingredients</h4>
      <ul>
        {
          recipe.ingredients &&
          recipe.ingredients.map(({ qty, item }) => (
            <li key={ item }>
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
      <Button color="primary" onClick={ toggleIngredient }>
        <span className="material-icons">{ addIngredient ? 'close' : 'add' }</span>
      </Button>

      <h4>Instructions</h4>
      <ol>
        {
          recipe.steps &&
          recipe.steps.map((step, i) => (
            <li key={ `step-${ i }` }>
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
        onClick={ saveRecipe }>
        Save
      </Button>
    </Card>
  )
}

export default RecipeForm;