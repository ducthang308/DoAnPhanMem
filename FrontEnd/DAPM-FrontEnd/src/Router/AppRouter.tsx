import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from '../Component/LoginComponent/index.tsx';
import HomeLayout from '../Home.tsx';
import TrainingOfficerLayout from '../Component/ContentComponent/TrainingOfficerLayout.tsx';

import Content from '../Component/ContentComponent';
import UpdateAccount from '../Component/ContentComponent/AccountComponent/UpdateAccountComponent/account.jsx';

import Schedule from "../Component/ContentComponent/ScheduleComponent/index.tsx";
import AddSchedule from "../Component/ContentComponent/AddScheduleComponent/index.tsx";
import EditSchedule from "../Component/ContentComponent/EditScheduleComponent/index.tsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/home" element={<HomeLayout />}>
        <Route index element={<Content />} />
        <Route path="update-account" element={<UpdateAccount />} />
      </Route>

      <Route path="/training" element={<TrainingOfficerLayout />}>
        <Route index element={<Schedule />} />
        <Route path="addschedule" element={<AddSchedule />} />
        <Route path="editschedule/:id" element={<EditSchedule />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
