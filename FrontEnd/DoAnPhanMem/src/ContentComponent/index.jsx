import React from 'react'
import "./index.css"
import Navbar from "./NavbarComponent/navbar.jsx"
import Acoount from "./AccountManagementComponent/account.jsx"

const index = () => {
  return (
    <div class="content">
      <div class="container-content">
          <Navbar></Navbar>
          <Acoount></Acoount>
      </div>
    </div>
  )
}

export default index