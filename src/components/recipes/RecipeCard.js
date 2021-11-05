import { Divider, IconButton } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Row, Spacer, Subtitle, Title } from "../styled";

function RecipeCard({ recipes, deleteRecipe }) {

  const { recipe_id } = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    if (!recipes.length) return
    setRecipe(recipes.find(r => r.thing.url.indexOf(recipe_id) >= 0))
  }, [recipe_id, recipes])

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
      <Subtitle>Instructions</Subtitle>
      <ol>
        {
          recipe.steps.map(s => <li key={ s }>{ s }</li>)
        }
      </ol>
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