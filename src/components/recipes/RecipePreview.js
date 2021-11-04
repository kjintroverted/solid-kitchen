import { Card, CardContent, Divider, Label, Title } from "../styled";

function RecipePreview({ recipe }) {
  return (
    <Card className="click">
      <Title>{ recipe.name }</Title>
      <Divider />
      <Label>Needs</Label>
      <CardContent>{ recipe.ingredients.map(i => i.item).join(', ') }</CardContent>
    </Card>
  )
}

export default RecipePreview;