import { Button } from "@material-ui/core";
import { useContext } from "react";
import mealplanStruct from "../../models/mealplan";
import { addToUpdateQueue, SaveState, setAllAttr } from "../../util/pods";
import RecipePreview from "../recipes/RecipePreview";
import { Column, Row, Header } from "../styled";

function MealPlan({ plan, onChange }) {

  const { queue, updateQueue } = useContext(SaveState);

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
    <Column>
      {
        days.map(day => (
          <div key={ day }>
            <Header>
              { day }
            </Header>
            <Row wrap="wrap">
              {
                plan[day].map(r => <RecipePreview key={ r.thing.url } recipe={ r } />)
              }
            </Row>
          </div>
        ))
      }
      <Button onClick={ clear }>Clear Plan</Button>
    </Column >
  )
}

export default MealPlan;