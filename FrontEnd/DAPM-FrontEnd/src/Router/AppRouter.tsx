import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../Component/LoginComponent/index.tsx';
import HomeLayout from '../Home.tsx';
import UpdateAccount from '../Component/ContentComponent/AccountComponent/UpdateAccountComponent/account.jsx'

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomeLayout />} />
      <Route path="/add-account" element={<UpdateAccount />} />
    </Routes>
  );
};

export default AppRouter;
