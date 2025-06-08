import React, { useEffect, useState } from 'react';
import "./index.css";
import { Routes, Route } from 'react-router-dom';
import NavSchbar from "./NavScheduleComponent/nav.tsx";
import Schedule from "./ScheduleComponent/index.tsx";
import AddSchedule from "./AddScheduleComponent/index.tsx";
import EditSchedule from "./EditScheduleComponent/index.tsx";
import Navbar from "./NavbarComponent/navbar.tsx";
import UpdateAccount from "./AccountComponent/UpdateAccountComponent/account.tsx";
import Management from './AccountComponent/ManagementComponent/management.tsx';
import ComputerManagement from './ComputerComponent/ManagementComponent/management.tsx';
import type { IUser } from '../../Types/interface.ts';

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
                    </>
                )}
                {user.roles_id === 2 && (
                    <>
                        <NavSchbar />
                        <Routes>
                            <Route path="" element={<Schedule />} />
                            <Route path="addschedule" element={<AddSchedule />} />
                            <Route path="editschedule/:id" element={<EditSchedule />} />
                        </Routes>
                    </>
                )}
            </div>
        </div>
    );
};

export default Index;
