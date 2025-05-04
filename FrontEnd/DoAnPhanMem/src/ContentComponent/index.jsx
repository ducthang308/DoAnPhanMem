import React from 'react'
import "./index.css"
import Navbar from "./NavbarComponent/navbar.jsx"
import Acoount from "./AccountManagementComponent/account.jsx"
import Schedule from "./ScheduleManagementComponent/schedule.jsx"
import UpdateSchedule from "./UpdateScheduleManagementComponent/updateschedule.jsx"
import Room from './RoomManagementComponent/room.jsx'
import UpdateRoom from './UpdateRoomManagementComponent/updateroom.jsx'
const index = () => {
  return (
    <div className="content">
      <div className="container-content">
          <Navbar></Navbar>
          <Schedule></Schedule>
      </div>
    </div>
  )
}

export default index