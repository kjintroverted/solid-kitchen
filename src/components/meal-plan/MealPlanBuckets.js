import { SideBar, SimpleBucket } from "../styled";

function MealPlanBuckets({ recipe }) {
  return (
    <SideBar side="right" className={ recipe ? "" : "hidden" }>
      <SimpleBucket>Monday</SimpleBucket>
      <SimpleBucket>Tuesday</SimpleBucket>
      <SimpleBucket>Wednesday</SimpleBucket>
      <SimpleBucket>Thursday</SimpleBucket>
      <SimpleBucket>Friday</SimpleBucket>
      <SimpleBucket>Saturday</SimpleBucket>
      <SimpleBucket>Sunday</SimpleBucket>
    </SideBar>
  )
}

export default MealPlanBuckets;