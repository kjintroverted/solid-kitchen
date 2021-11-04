import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Title } from "../styled";

function RecipeCard({ recipes }) {

  const { recipe_id } = useParams();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    if (!recipes.length) return
    setRecipe(recipes.find(r => r.thing.url.indexOf(recipe_id) >= 0))
  }, [recipe_id, recipes])

  return (
    <Title>{ recipe.name }</Title>
  )
}

export default RecipeCard;