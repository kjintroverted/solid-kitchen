import { Button, Chip } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ActionBar, Card, CardContent, Divider, Label, Row, Title, resourceName } from "solid-core";
import { Spacer } from "solid-core/dist/components/styled";
import { THEME } from "../../util";

function RecipePreview({ recipe, onDragEnd, onDrag = () => { } }) {

  function handleDrag(e) {
    e.dataTransfer.setData("json", JSON.stringify(recipe));
    onDrag()
  }

  return (
    <Link
      style={ { width: "95%" } }
      to={ `/recipes/${ resourceName(recipe.thing.url) }` }>
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
        <Spacer height=".5em" />
        <Divider theme={ THEME } />
        <Label>Needs</Label>
        <CardContent>
          { recipe.ingredients.map(i => i.item).join(', ') }
        </CardContent>
      </Card >
    </Link>
  )
}

export default RecipePreview;