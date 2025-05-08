import React from 'react';
import Header from './Component/HeaderComponent';
import Content from './Component/ContentComponent';
import Footer from './Component/FooterComponent';

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