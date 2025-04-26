import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Header from "./HeaderComponent"
import Footer from "./FooterComponent"
import Login from "./LoginComponent"
import Content from "./ContentComponent"

const App = () => {
  return (
    <>
      <Header></Header>
      <Content></Content>
      <Footer></Footer>
    </>
  );
};

export default App;
