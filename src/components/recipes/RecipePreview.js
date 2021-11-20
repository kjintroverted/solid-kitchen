import { Button, Chip } from "@material-ui/core";
import { Link } from "react-router-dom";
import { resourceName } from "../../util/pods";
import { ActionBar, Card, CardContent, Divider, Label, Row, Title } from "../styled";

function RecipePreview({ recipe, onDragEnd, onDrag }) {

  function handleDrag(e) {
    e.dataTransfer.setData("json", JSON.stringify(recipe));
    onDrag()
  }

  return (
    <Card className="click"
      draggable="true"
      onDragStart={ handleDrag }
      onDragEnd={ onDragEnd }
    >
      <Title>{ recipe.name }</Title>
      <Row>
        {
          recipe.tags &&
          recipe.tags.map(t => <Chip key={ t } label={ t } size="small" />)
        }
      </Row>
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