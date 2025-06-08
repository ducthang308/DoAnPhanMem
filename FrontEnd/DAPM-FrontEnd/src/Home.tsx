import React from 'react';
import Header from './Component/HeaderComponent';
import Content from './Component/ContentComponent';
import Footer from './Component/FooterComponent';
import { Outlet } from 'react-router-dom';

const HomeLayout = () => {
  return (
    <div>
      <Header />
      <Content />
      <Footer />
    </div>
  );
};

export default HomeLayout;