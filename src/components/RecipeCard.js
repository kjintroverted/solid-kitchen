import { Card, CardContent, Divider, Label, Title } from "./styled";

function RecipeCard({ recipe }) {
  return (
    <Card>
      <Title>{ recipe.name }</Title>
      <Divider />
      <Label>Needs</Label>
      <CardContent>{ recipe.ingredients.map(i => i.item).join(', ') }</CardContent>
    </Card>
  )
}

export default RecipeCard;