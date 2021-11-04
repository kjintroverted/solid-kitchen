import { Divider } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { Row, Title } from "../styled";

function RecipeCard({ recipes }) {

  const { recipe_id } = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    if (!recipes.length) return
    setRecipe(recipes.find(r => r.thing.url.indexOf(recipe_id) >= 0))
  }, [recipe_id, recipes])

  return (
    <Container>
      <Title>{ recipe.name }</Title>
      <Divider />
      <Row wrap='wrap'>
        {
          recipe.ingredients.map(i => <Item key={ i.item }>{ i.qty } <b>{ i.item }</b></Item>)
        }
      </Row>
      <h4>Instructions</h4>
      <ul>
        {
          recipe.steps.map(s => <li>{ s }</li>)
        }
      </ul>
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