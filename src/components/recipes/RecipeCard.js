import { Divider, IconButton } from "@material-ui/core";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { recipeStruct } from "../../models/recipe";
import { addToUpdateQueue, SaveState, updateAttr } from "../../util/pods";
import { Row, Spacer, Subtitle, Title } from "../styled";
import ChipField from "./ChipField";

function RecipeCard({ recipes, deleteRecipe }) {

  const { recipe_id } = useParams();
  const [recipe, setRecipe] = useState({});
  const { queue, updateQueue } = useContext(SaveState);

  useEffect(() => {
    if (!recipes || !recipes.length) return
    setRecipe(recipes.find(r => r.thing.url.indexOf(recipe_id) >= 0))
  }, [recipe_id, recipes])

  function addTag(tag) {
    let tags = recipe.tags ? [...recipe.tags, tag] : [tag];
    let thing = updateAttr(recipe.thing, recipeStruct.tags, tags);
    updateQueue(addToUpdateQueue(queue, thing))
    setRecipe({ ...recipe, thing, tags })
  }

  function removeTag(tag) {
    let i = recipe.tags.indexOf(tag);
    let tags = [...recipe.tags.slice(0, i), ...recipe.tags.slice(i + 1)]
    let thing = updateAttr(recipe.thing, recipeStruct.tags, tags);
    updateQueue(addToUpdateQueue(queue, thing))
    setRecipe({ ...recipe, thing, tags })
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
          recipe.ingredients.map(i => <Item key={ i.item }>{ i.qty } <b>{ i.item }</b></Item>)
        }
      </Row>
      <section>
        <Subtitle>Instructions</Subtitle>
        <ol>
          {
            recipe.steps.map(s => <li key={ s }>{ s }</li>)
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
  border-bottom: 1px solid lightgray;
  min-width: 48%;
`