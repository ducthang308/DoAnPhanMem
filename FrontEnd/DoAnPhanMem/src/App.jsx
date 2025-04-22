import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Header from "./HeaderComponent"
import Footer from "./FooterComponent"
import Login from "./LoginComponent"

const App = () => {
  return (
    <>
      <Header></Header>
      <Login></Login>
      <Footer></Footer>
    </>
  );
};

export default App;
