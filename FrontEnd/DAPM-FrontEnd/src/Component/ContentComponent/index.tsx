import React from 'react'
import "./index.css"
import { Routes, Route } from 'react-router-dom';
import Navbar from "./NavbarComponent/navbar.tsx"
import Schedule from "./ScheduleManagementComponent/schedule.tsx"
import UpdateSchedule from "./UpdateScheduleManagementComponent/updateschedule.tsx"
import Room from './RoomManagementComponent/room.tsx'
import UpdateRoom from './UpdateRoomManagementComponent/updateroom.tsx'

const index = () => {
    return (
        <div className="content">
            <div className="container-content">
                <Navbar></Navbar>
                <Routes>
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/update-schedule" element={<UpdateSchedule />} />
                    <Route path="/room" element={<Room />} />
                    <Route path="/update-room" element={<UpdateRoom />} />
                    <Route path="" element={<Schedule />} />
                </Routes>
            </div>
        </div>
    )
}

export default index