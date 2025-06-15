import React, { useEffect, useState } from 'react';
import "./index.css";
import { Routes, Route } from 'react-router-dom';
import NavSchbar from './NavScheduleComponent/nav';
import ITOfficerNavbar from './NavbarComponent/navbar';
import LecturerNavbar from './NavLecturer/NavLecturer'
import Schedule from './ScheduleComponent/index';
import AddSchedule from './AddScheduleComponent';
import EditSchedule from './EditScheduleComponent';
import Navbar from './NavbarComponent/navbar';
import UpdateAccount from './AccountComponent/UpdateAccountComponent/account';
import Management from './AccountComponent/ManagementComponent/management';
import ComputerManagement from './ComputerComponent/ManagementComponent/management';
import ListComputer from './ComputerManagementComponent/ManageComputer/ManageComputer';
import ComputerDetail from './ComputerManagementComponent/ComputerDetailComponent/ComputerDetail';
import type { IUser } from '../../Types/interface.ts';
import RequestChangeSchedule from './ChangeScheduleComponent/RequestChangeSchedule/RequestChangeSchedule';
import ApprovalChangeSchedule from './ChangeScheduleComponent/ApprovalChangeSchedule/ApprovalChangeSchedule';
import ScheduleDuty from './ScheduleManagementComponent/schedule';

const Index = () => {
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="content">
            <div className="container-content">
                {user.roles_id === 1 && (
                    <>
                        <Navbar />
                        <ComputerManagement />
                        {/* <ListComputer /> */}
                    </>
                )}
                {user.roles_id === 4 && (
                    <>
                        <NavSchbar />
                        <Routes>
                            <Route path="" element={<Schedule />} />
                            <Route path="addschedule" element={<AddSchedule />} />
                            <Route path="editschedule/:id" element={<EditSchedule />} />
                            <Route path='request-approval' element={<ApprovalChangeSchedule />} />
                        </Routes>
                    </>
                )}
                {(user.roles_id === 2 || user.roles_id === 3) && (
                    <>
                        <ITOfficerNavbar />
                        <Routes>
                            <Route path="computers" element={<ListComputer />} />
                            <Route path="computers/detail/" element={<ComputerDetail />} />
                            <Route path="duty_schedule/schedule" element={<ScheduleDuty />} />
                        </Routes>
                        {/* <ListComputer/> */}
                    </>
                )}
                {user.roles_id === 5 && (
                    <>
                        <LecturerNavbar />
                        <Routes>
                            <Route path="change" element={<RequestChangeSchedule />} />
                            {/* <Route path="computers/detail/" element={<ComputerDetail/>} /> */}
                        </Routes>
                        {/* <ListComputer/> */}
                    </>
                )}
            </div>
        </div>
    );
};

export default Index;
