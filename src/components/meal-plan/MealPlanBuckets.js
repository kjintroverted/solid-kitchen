import { useState } from "react";
import { SideBar, SimpleBucket } from "../styled";

function MealPlanBuckets({ visible }) {

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
      console.log(`Make ${ r.name } on ${ day }`)
      setHover("")
    }
  }

  return (
    <SideBar side="right" className={ visible ? "" : "hidden" }>
      <SimpleBucket
        className={ hover === "monday" ? "match" : "" }
        onDragEnter={ handleDragOver("monday") }
        onDragOver={ handleDragOver("monday") }
        onDragLeave={ handleDragLeave }
        onDrop={ handleDrop("monday") }>
        monday
      </SimpleBucket>
      <SimpleBucket
        className={ hover === "tuesday" ? "match" : "" }
        onDragEnter={ handleDragOver("tuesday") }
        onDragOver={ handleDragOver("tuesday") }
        onDragLeave={ handleDragLeave }
        onDrop={ handleDrop("tuesday") }>
        tuesday
      </SimpleBucket>
      <SimpleBucket
        className={ hover === "wednesday" ? "match" : "" }
        onDragEnter={ handleDragOver("wednesday") }
        onDragOver={ handleDragOver("wednesday") }
        onDragLeave={ handleDragLeave }
        onDrop={ handleDrop("wednesday") }>
        wednesday
      </SimpleBucket>
      <SimpleBucket
        className={ hover === "thursday" ? "match" : "" }
        onDragEnter={ handleDragOver("thursday") }
        onDragOver={ handleDragOver("thursday") }
        onDragLeave={ handleDragLeave }
        onDrop={ handleDrop("thursday") }>
        thursday
      </SimpleBucket>
      <SimpleBucket
        className={ hover === "friday" ? "match" : "" }
        onDragEnter={ handleDragOver("friday") }
        onDragOver={ handleDragOver("friday") }
        onDragLeave={ handleDragLeave }
        onDrop={ handleDrop("friday") }>
        friday
      </SimpleBucket>
      <SimpleBucket
        className={ hover === "saturday" ? "match" : "" }
        onDragEnter={ handleDragOver("saturday") }
        onDragOver={ handleDragOver("saturday") }
        onDragLeave={ handleDragLeave }
        onDrop={ handleDrop("saturday") }>
        saturday
      </SimpleBucket>
      <SimpleBucket
        className={ hover === "sunday" ? "match" : "" }
        onDragEnter={ handleDragOver("sunday") }
        onDragOver={ handleDragOver("sunday") }
        onDragLeave={ handleDragLeave }
        onDrop={ handleDrop("sunday") }>
        sunday
      </SimpleBucket>
    </SideBar >
  )
}

export default MealPlanBuckets;