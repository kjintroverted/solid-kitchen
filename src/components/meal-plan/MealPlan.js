import RecipePreview from "../recipes/RecipePreview";
import { Column, Row, Header } from "../styled";

function MealPlan({ plan }) {

  const days = [
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
    "sun"
  ]

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
                plan[day].map(r => <RecipePreview recipe={ r } />)
              }
            </Row>
          </div>
        ))
      }
    </Column >
  )
}

export default MealPlan;