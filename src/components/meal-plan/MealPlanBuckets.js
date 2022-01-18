import { useState } from "react";
import { SideBar, SimpleBucket } from "solid-core";
import { THEME } from "../../util";

function MealPlanBuckets({ visible, planRecipe }) {

  const [hover, setHover] = useState("");

  function handleDragOver(day) {
    return e => {
      e.preventDefault();
      setHover(day);
    }
  }

  function handleDragLeave(e) {
    e.preventDefault();
    setHover("");
  }

  function handleDrop(day) {
    return e => {
      let r = JSON.parse(e.dataTransfer.getData("json"));
      planRecipe(r, day)
      setHover("")
    }
  }

  return (
    <SideBar side="right" className={ visible ? "" : "hidden" }>
      <SimpleBucket
        theme={ THEME }
        className={ hover === "mon" ? "match" : "" }
        onDragEnter={ handleDragOver("mon") }
        onDragOver={ handleDragOver("mon") }
        onDragLeave={ handleDragLeave }
        onDrop={ handleDrop("mon") }>
        monday
      </SimpleBucket>
      <SimpleBucket
        theme={ THEME }
        className={ hover === "tue" ? "match" : "" }
        onDragEnter={ handleDragOver("tue") }
        onDragOver={ handleDragOver("tue") }
        onDragLeave={ handleDragLeave }
        onDrop={ handleDrop("tue") }>
        tuesday
      </SimpleBucket>
      <SimpleBucket
        theme={ THEME }
        className={ hover === "wed" ? "match" : "" }
        onDragEnter={ handleDragOver("wed") }
        onDragOver={ handleDragOver("wed") }
        onDragLeave={ handleDragLeave }
        onDrop={ handleDrop("wed") }>
        wednesday
      </SimpleBucket>
      <SimpleBucket
        theme={ THEME }
        className={ hover === "thu" ? "match" : "" }
        onDragEnter={ handleDragOver("thu") }
        onDragOver={ handleDragOver("thu") }
        onDragLeave={ handleDragLeave }
        onDrop={ handleDrop("thu") }>
        thursday
      </SimpleBucket>
      <SimpleBucket
        theme={ THEME }
        className={ hover === "fri" ? "match" : "" }
        onDragEnter={ handleDragOver("fri") }
        onDragOver={ handleDragOver("fri") }
        onDragLeave={ handleDragLeave }
        onDrop={ handleDrop("fri") }>
        friday
      </SimpleBucket>
      <SimpleBucket
        theme={ THEME }
        className={ hover === "sat" ? "match" : "" }
        onDragEnter={ handleDragOver("sat") }
        onDragOver={ handleDragOver("sat") }
        onDragLeave={ handleDragLeave }
        onDrop={ handleDrop("sat") }>
        saturday
      </SimpleBucket>
      <SimpleBucket
        theme={ THEME }
        className={ hover === "sun" ? "match" : "" }
        onDragEnter={ handleDragOver("sun") }
        onDragOver={ handleDragOver("sun") }
        onDragLeave={ handleDragLeave }
        onDrop={ handleDrop("sun") }>
        sunday
      </SimpleBucket>
    </SideBar >
  )
}

export default MealPlanBuckets;