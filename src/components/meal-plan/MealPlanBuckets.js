import { useState } from "react";
import { SideBar, SimpleBucket } from "../styled";

function MealPlanBuckets({ visible }) {

  const [hover, setHover] = useState("");

  function handleDragEnter(day) {
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
      console.log(`Make ${ r.name } on ${ day }`)
      setHover("")
    }
  }

  return (
    <SideBar side="right" className={ visible ? "" : "hidden" }>
      <SimpleBucket
        className={ hover === "monday" ? "match" : "" }
        onDragEnter={ handleDragEnter("monday") }
        onDragLeave={ handleDragLeave }
        onDragOver={ e => e.preventDefault() }
        onDrop={ handleDrop("monday") }>
        monday
      </SimpleBucket>
      <SimpleBucket
        className={ hover === "tuesday" ? "match" : "" }
        onDragEnter={ handleDragEnter("tuesday") }
        onDragLeave={ handleDragLeave }
        onDragOver={ e => e.preventDefault() }
        onDrop={ handleDrop("tuesday") }>
        tuesday
      </SimpleBucket>
      <SimpleBucket
        className={ hover === "wednesday" ? "match" : "" }
        onDragEnter={ handleDragEnter("wednesday") }
        onDragLeave={ handleDragLeave }
        onDragOver={ e => e.preventDefault() }
        onDrop={ handleDrop("wednesday") }>
        wednesday
      </SimpleBucket>
      <SimpleBucket
        className={ hover === "thursday" ? "match" : "" }
        onDragEnter={ handleDragEnter("thursday") }
        onDragLeave={ handleDragLeave }
        onDragOver={ e => e.preventDefault() }
        onDrop={ handleDrop("thursday") }>
        thursday
      </SimpleBucket>
      <SimpleBucket
        className={ hover === "friday" ? "match" : "" }
        onDragEnter={ handleDragEnter("friday") }
        onDragLeave={ handleDragLeave }
        onDragOver={ e => e.preventDefault() }
        onDrop={ handleDrop("friday") }>
        friday
      </SimpleBucket>
      <SimpleBucket
        className={ hover === "saturday" ? "match" : "" }
        onDragEnter={ handleDragEnter("saturday") }
        onDragLeave={ handleDragLeave }
        onDragOver={ e => e.preventDefault() }
        onDrop={ handleDrop("saturday") }>
        saturday
      </SimpleBucket>
      <SimpleBucket
        className={ hover === "sunday" ? "match" : "" }
        onDragEnter={ handleDragEnter("sunday") }
        onDragLeave={ handleDragLeave }
        onDragOver={ e => e.preventDefault() }
        onDrop={ handleDrop("sunday") }>
        sunday
      </SimpleBucket>
    </SideBar >
  )
}

export default MealPlanBuckets;