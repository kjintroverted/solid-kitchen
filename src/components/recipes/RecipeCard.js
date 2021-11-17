import { Button, Divider, IconButton, TextField } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { recipeStruct } from "../../models/recipe";
import { addToUpdateQueue, SaveState, updateAttr } from "../../util/pods";
import { Row, Spacer, Subtitle, Title } from "../styled";
import ChipField from "./ChipField";

function RecipeCard({ recipes, deleteRecipe, updateRecipe }) {

  const { recipe_id } = useParams();
  const { queue, updateQueue } = useContext(SaveState);

  const [recipe, setRecipe] = useState({});
  const [editField, setEditField] = useState({})
  const [addIngredient, setAddIngredient] = useState(false);
  const [newIngredient, updateNewIngredient] = useState({});

  useEffect(() => {
    if (!recipes || !recipes.length) return
    setRecipe(recipes.find(r => r.thing.url.indexOf(recipe_id) >= 0))
  }, [recipe_id, recipes])

  function addTag(tag) {
    let tags = recipe.tags ? [...recipe.tags, tag] : [tag];
    let thing = updateAttr(recipe.thing, recipeStruct.tags, tags);
    updateQueue(addToUpdateQueue(queue, thing))
    let r = { ...recipe, thing, tags };
    setRecipe(r)
    updateRecipe(r)
  }

  function removeTag(tag) {
    let i = recipe.tags.indexOf(tag);
    let tags = [...recipe.tags.slice(0, i), ...recipe.tags.slice(i + 1)]
    let thing = updateAttr(recipe.thing, recipeStruct.tags, tags);
    updateQueue(addToUpdateQueue(queue, thing))
    let r = { ...recipe, thing, tags };
    setRecipe(r)
    updateRecipe(r)
  }

  function handleChange(field, index, innerField) {
    return e => {
      let arr = recipe[field];
      let data = innerField ? { ...arr[index], [innerField]: e.target.value } : e.target.value;
      arr = [...arr.slice(0, index), data, ...arr.slice(index + 1)];
      let updatedRecipe = { ...recipe, [field]: arr }
      debugger
      let thing = updateAttr(recipe.thing, recipeStruct[field], arr);
      updateQueue(addToUpdateQueue(queue, thing))
      setRecipe(updatedRecipe)
      updateRecipe(updatedRecipe)
    }
  }

  function newIngredientChange(field) {
    return e => {
      updateNewIngredient({ ...newIngredient, [field]: e.target.value })
    }
  }

  function addNewIngredient() {
    let ingredients = recipe.ingredients ? [...recipe.ingredients, newIngredient] : [newIngredient];
    let thing = updateAttr(recipe.thing, recipeStruct.ingredients, ingredients);
    updateQueue(addToUpdateQueue(queue, thing))
    let r = { ...recipe, thing, ingredients };
    debugger
    setRecipe(r)
    updateRecipe(r)
    setAddIngredient(false)
  }

  function onEnter(f) {
    return e => {
      if (e.key === 'Enter') {
        f();
      }
    }
  }

  if (!recipe.name) return <></>

  return (
    <Container>
      <Row>
        <Title>{ recipe.name }</Title>
        <Spacer />
        <Link to="/">
          <IconButton color="secondary" onClick={ () => deleteRecipe(recipe) }>
            <span className="material-icons">delete</span>
          </IconButton>
        </Link>
      </Row>
      <Divider />
      <Row wrap='wrap'>
        {
          recipe.ingredients.map((ing, i) => {
            return (editField.value === 'ing' && editField.index === i) ?
              <Item>
                <TextField
                  color="primary"
                  style={ { width: '100px' } }
                  value={ ing.qty }
                  onChange={ handleChange('ingredients', i, 'qty') }
                  onKeyPress={ onEnter(() => setEditField({})) } />
                <TextField
                  color="primary"
                  style={ { flex: '1' } }
                  value={ ing.item }
                  onChange={ handleChange('ingredients', i, 'item') }
                  onKeyPress={ onEnter(() => setEditField({})) } />
              </Item>
              : <Item
                onDoubleClick={ () => setEditField({ value: 'ing', index: i }) }
                key={ ing.item }>
                { ing.qty } <b>{ ing.item }</b>
              </Item>
          })
        }
        {
          !addIngredient ?
            <Button style={ { width: '100%' } } onClick={ () => setAddIngredient(true) }>
              <span className="material-icons">add</span>
            </Button>
            :
            <Item>
              <TextField
                color="primary"
                style={ { width: '100px' } }
                placeholder="1 tbsp"
                onChange={ newIngredientChange('qty') }
                onKeyPress={ onEnter(addNewIngredient) } />
              <TextField
                color="primary"
                style={ { flex: '1' } }
                placeholder="Love"
                onChange={ newIngredientChange('item') }
                onKeyPress={ onEnter(addNewIngredient) } />
            </Item>
        }
      </Row>
      <section>
        <Subtitle>Instructions</Subtitle>
        <ol>
          {
            recipe.steps.map((s, i) => {
              return (editField.value === 'steps' && editField.index === i) ?
                <li>
                  <TextField
                    color="primary"
                    style={ { width: '100%' } }
                    value={ s }
                    onChange={ handleChange('steps', i) }
                    onKeyPress={ onEnter(() => setEditField({})) } />
                </li>
                : <li key={ s } onDoubleClick={ () => setEditField({ value: 'steps', index: i }) } >
                  { s }
                </li>
            })
          }
        </ol>
      </section>
      <ChipField data={ recipe.tags || [] } onSubmit={ addTag } onDelete={ removeTag } />
    </Container>
  )
}

export default RecipeCard;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 0 1em;
`

const Item = styled.span`
  display: flex;
  border-bottom: 1px solid lightgray;
  min-width: 48%;
`