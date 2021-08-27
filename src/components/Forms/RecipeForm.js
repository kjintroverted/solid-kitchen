import { Button, TextField } from "@material-ui/core";
import { useState } from "react";
import { Card, Row, Spacer } from "../styled";

function RecipeForm() {

  const [recipe, updateRecipe] = useState({});

  function update(field) {
    return ({ target }) => {
      let { value } = target;
    }
  }
  return (
    <Card>
      <TextField
        fullWidth
        placeholder="Something delicious..."
        label="What's cooking?" />
      <Row align="center">
        <h4>Ingredients</h4>
        <Spacer />
        <Button variant="contained" color="primary">
          <span className="material-icons">add</span>
        </Button>
      </Row>
      <Row align="center">
        <h4>Instructions</h4>
        <Spacer />
        <Button variant="contained" color="primary">
          <span className="material-icons">add</span>
        </Button>
      </Row>
    </Card>
  )
}

export default RecipeForm;