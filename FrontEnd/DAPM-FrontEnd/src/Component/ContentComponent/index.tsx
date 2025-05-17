import React from 'react'
import "./index.css"
import { Routes, Route } from 'react-router-dom';
import Navbar from "./NavScheduleComponent/nav.tsx"
import Schedule from "./ScheduleComponent/index.tsx";  
import AddSchedule from "./AddScheduleComponent/index.tsx";
import EditSchedule from "./EditScheduleComponent/index.tsx";
const index = () => {
    return (
        <div className="content">
            <div className="container-content">
                <Navbar></Navbar>
                <Routes>
                    <Route path="" element={<Schedule />} />
                    <Route path="addschedule" element={<AddSchedule />} />
                    <Route path="editschedule/:id" element={<EditSchedule />} />
                </Routes>
            </div>
        </div>
    )
}

export default index