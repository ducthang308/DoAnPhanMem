import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Login from '../Component/LoginComponent';
import HomeLayout from '../Home';
import TrainingOfficerLayout from '../Component/ContentComponent/';
import ITOfficerLayout from '../Component/ContentComponent/';
import Profile from "../Component/ContentComponent/UserProfileComponent/";
import Content from '../Component/ContentComponent';
import UpdateAccount from '../Component/ContentComponent/AccountComponent/UpdateAccountComponent/account.jsx';
import Schedule from "../Component/ContentComponent/ScheduleComponent/";
import AddSchedule from "../Component/ContentComponent/AddScheduleComponent/";
import EditSchedule from "../Component/ContentComponent/EditScheduleComponent/index";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/home" element={<HomeLayout />}>
        <Route index element={<Content />} />
        <Route path="update-account" element={<UpdateAccount />} />
      </Route>

      <Route path="/training/*" element={<HomeLayout />}>
        <Route index element={<Schedule />} />
        <Route path="addschedule" element={<AddSchedule />} />
        <Route path="editschedule/:id" element={<EditSchedule />} />
      </Route>

      <Route path="/profile" element={<Profile />} />

      <Route path="/it-officer/*" element={<HomeLayout />} />

      <Route path="/schedule/*" element={<HomeLayout />} />
    </Routes>
  );
};

export default AppRouter;
