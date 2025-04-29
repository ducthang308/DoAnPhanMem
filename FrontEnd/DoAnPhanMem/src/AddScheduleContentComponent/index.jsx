import React from 'react'
import "./index.css"
import NavSchedule from "../NavScheduleComponent/nav.jsx";
import AddSchedule from "../AddScheduleContentComponent/AddScheduleComponent";

const index = () => {
  return (
    <div class="content">
      <div class="container-content">
          <NavSchedule></NavSchedule>
          <AddSchedule></AddSchedule>
      </div>
    </div>
  )
}

export default index