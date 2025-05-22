import React from 'react'
import "./index.css"
import { Routes, Route } from 'react-router-dom';
import NavSchbar from "./NavScheduleComponent/nav.tsx"
import Schedule from "./ScheduleComponent/index.tsx";  
import AddSchedule from "./AddScheduleComponent/index.tsx";
import EditSchedule from "./EditScheduleComponent/index.tsx";
import Navbar from "./NavbarComponent/navbar.tsx"
import UpdateAccount from "./AccountComponent/UpdateAccountComponent/account.tsx"
import Management from './AccountComponent/ManagementComponent/management.tsx'
import ComputerManagement from './ComputerComponent/ManagementComponent/management.tsx'

const index = () => {
    return (
        <div className="content">
            <div className="container-content">
                <NavSchbar></NavSchbar>
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