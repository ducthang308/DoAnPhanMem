import React from 'react'
import "./index.css"
import NavSchedule from "../NavScheduleComponent/nav.jsx";
import Schedule from './ScheduleComponent/index.jsx';

const index = () => {
  return (
    <div class="content">
      <div class="container-content">
          <NavSchedule></NavSchedule>
          <Schedule></Schedule>
      </div>
    </div>
  )
}

export default index