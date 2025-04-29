import React from 'react'
import "./index.css"
import NavSchedule from "../NavScheduleComponent/nav.jsx";
import AddSchedule from "./EditScheduleComponent/index.jsx";
import EditSchedule from './EditScheduleComponent/index.jsx';

const index = () => {
  return (
    <div class="content">
      <div class="container-content">
          <NavSchedule></NavSchedule>
          <EditSchedule></EditSchedule>
      </div>
    </div>
  )
}

export default index