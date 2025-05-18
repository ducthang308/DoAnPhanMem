import { useState } from 'react'
import Header from "./Component/HeaderComponent"
import Footer from "./Component/FooterComponent"
import Login from "./Component/LoginComponent"
import Content from "./Component/ContentComponent"
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// import AppRouter from './Router/AppRouter';

const App = () => {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>

  );
}

export default App;