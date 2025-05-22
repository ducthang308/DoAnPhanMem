import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../Component/LoginComponent/index.tsx';
import HomeLayout from '../Home.tsx';

import UpdateAccount from '../Component/ContentComponent/AccountComponent/UpdateAccountComponent/account.jsx'
import Content from '../Component/ContentComponent';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
<<<<<<< HEAD
      <Route path="/schedule/*" element={<HomeLayout />} />
=======
      <Route path="/home" element={<HomeLayout />}>
        <Route index element={<Content />} />
        <Route path="update-account" element={<UpdateAccount />} />
      </Route>
>>>>>>> origin/main
    </Routes>
  );
};

export default AppRouter;
