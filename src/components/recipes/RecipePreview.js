import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { resourceName } from "../../util/pods";
import { ActionBar, Card, CardContent, Divider, Label, Title } from "../styled";

function RecipePreview({ recipe }) {
  return (
    <Card className="click">
      <Title>{ recipe.name }</Title>
      <Divider />
      <Label>Needs</Label>
      <CardContent>
        { recipe.ingredients.map(i => i.item).join(', ') }
      </CardContent>
      <ActionBar>
        <Link to={ `/${ resourceName(recipe.thing.url) }` }>
          <Button variant="text" color="primary">View</Button>
        </Link>
      </ActionBar>
    </Card >
  )
}

export default RecipePreview;