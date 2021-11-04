import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Card, CardContent, Divider, Label, Row, Spacer, Title } from "../styled";

function RecipePreview({ recipe }) {
  return (
    <Card className="click">
      <Row align="center">
        <Title>{ recipe.name }</Title>
        <Spacer />
        <Link to="/:recipe_id">
          <Button variant="text" color="primary">View</Button>
        </Link>
      </Row>
      <Divider />
      <Label>Needs</Label>
      <CardContent>{ recipe.ingredients.map(i => i.item).join(', ') }</CardContent>
    </Card>
  )
}

export default RecipePreview;