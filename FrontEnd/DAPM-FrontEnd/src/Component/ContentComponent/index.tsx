import React, { useEffect, useState } from 'react';
import "./index.css";
import { Routes, Route } from 'react-router-dom';
import NavSchbar from './NavScheduleComponent/nav';
import ITOfficerNavbar from './NavbarComponent/navbar';
import LecturerNavbar from './NavLecturer/NavLecturer'
import Schedule from './ScheduleComponent/index';
import AddSchedule from './AddScheduleComponent';
import EditSchedule from './EditScheduleComponent';
import Navbar from './NavAdminComponent/navbar';
import UpdateAccount from './AccountComponent/UpdateAccountComponent/account';
import Management from './AccountComponent/ManagementComponent/management';
import ComputerManagement from './ComputerComponent/ManagementComponent/management';
import ListComputer from './ComputerManagementComponent/ManageComputer/ManageComputer';
import ComputerDetail from './ComputerManagementComponent/ComputerDetailComponent/ComputerDetail';
import type { IUser } from '../../Types/interface.ts';
import RequestChangeSchedule from './ChangeScheduleComponent/RequestChangeSchedule/RequestChangeSchedule';
import ApprovalChangeSchedule from './ChangeScheduleComponent/ApprovalChangeSchedule/ApprovalChangeSchedule';
import ScheduleDuty from './ScheduleManagementComponent/schedule';
import UpdateSchedule from './UpdateScheduleManagementComponent/updateschedule';
import Room from './RoomManagementComponent/room';
import UpdateRoom from './UpdateRoomManagementComponent/updateroom';
import ClassComponent from './ClassComponent/ClassComponent';
import NavStudent from './NavStudentComponent/NavStudent';
import StartComputer from './ClassComponent/StartComputer/StartComputer'
import ComputerSelected from './ClassComponent/ComputerSelected/ComputerSelected';

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
                        <Routes>
                            <Route path="" element={<ComputerManagement />} />
                            {/* <ComputerManagement /> */}
                            {/* <ListComputer /> */}
                            <Route path="computers" element={<ListComputer />} />
                            <Route path="computers/detail/" element={<ComputerDetail />} />
                            {/* <Route path="duty_schedule/schedule" element={<ScheduleDuty />} />
                            <Route path="duty_schedule/update-schedule" element={<UpdateSchedule />} />
                            <Route path="room-class" element={<Room />} />
                            <Route path="duty_schedule/update-room" element={<UpdateRoom />} /> */}
                        </Routes>
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
                            <Route path="duty_schedule/update-schedule" element={<UpdateSchedule />} />
                            <Route path="room-class" element={<Room />} />
                            <Route path="duty_schedule/update-room" element={<UpdateRoom />} />
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
                {user.roles_id === 6 && (
                    <>
                        <NavStudent />
                        <Routes>
                            <Route path="" element={<ClassComponent />} />
                            <Route path="start-computer" element={<StartComputer />} />
                            <Route path="start-computer/computer-selected" element={<ComputerSelected />} />
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
