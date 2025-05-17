import { useState } from 'react'
import Header from "./Component/HeaderComponent"
import Footer from "./Component/FooterComponent"
import Login from "./Component/LoginComponent"
import Content from "./Component/ContentComponent"

import AppRouter from './Router/AppRouter';

const App = () => {
  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;