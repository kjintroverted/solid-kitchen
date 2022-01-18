import { Button } from "@material-ui/core";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import mealplanStruct from "../../models/mealplan";
import { Column, Row, Header, addToUpdateQueue, SaveState, setAllAttr } from "solid-core";
import RecipePreview from "../recipes/RecipePreview";
import ShoppingList from "./ShoppingList";
import { Spacer } from "solid-core/dist/components/styled";
import styled from "styled-components";

function MealPlan({ plan, onChange }) {

  const { queue, updateQueue } = useContext(SaveState);
  const [showList, setShowList] = useState(false);

  const days = [
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
    "sun"
  ]

  function clear() {
    let emptyPlan = {
      thing: plan.thing,
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: []
    };
    onChange(emptyPlan)
    // UPDATE ALL ATTR AND ADD TO QUEUE
    updateQueue(addToUpdateQueue(queue, setAllAttr(plan.thing, mealplanStruct, emptyPlan)))
  }

  return (
    <Column width="100%">
      {
        days.map(day => (
          <div key={ day }>
            <Header>
              { day }
            </Header>
            <Row wrap="wrap">
              {
                plan[day].map(r => (
                  <>
                    <Spacer width=".5em" />
                    <RecipePreview key={ r.thing.url } recipe={ r } />
                    <Spacer width=".5em" />
                  </>
                ))
              }
              {
                !plan[day].length &&
                <Link to="/recipes">
                  <Button color="primary">Add recipes to plan...</Button>
                </Link>
              }
            </Row>
          </div>
        ))
      }
      <ActionBar>
        <Row justify="flex-end">
          <Button onClick={ clear } color="secondary">Clear Plan</Button>
          <Button
            color="primary"
            variant="contained"
            style={ { alignSelf: 'flex-end' } }
            onClick={ () => setShowList(true) }>
            Shopping List
          </Button>
        </Row >
      </ActionBar>
      <ShoppingList open={ showList } onClose={ () => setShowList(false) } mealplan={ plan } />
    </Column >
  )
}

export default MealPlan;

const ActionBar = styled.div`
  position: absolute;
  bottom: 1em;
  right: 1em;
`