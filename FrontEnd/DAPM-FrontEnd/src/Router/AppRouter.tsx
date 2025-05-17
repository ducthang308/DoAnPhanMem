import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../Component/LoginComponent/index.tsx';
import HomeLayout from '../Home.tsx';


const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/schedule/*" element={<HomeLayout />} />
    </Routes>
  );
};

export default AppRouter;
