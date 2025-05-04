import React from 'react'
import "./index.css"
import Navbar from "./NavbarComponent/navbar.jsx"
import AddAccount from "./AccountComponent/AddAccountComponent/account.jsx"
import Management from './AccountComponent/ManagementComponent/management.jsx'
import ComputerManagement from './ComputerComponent/ManagementComponent/management.jsx'

const index = () => {
  return (
    <div class="content">
      <div class="container-content">
          <Navbar></Navbar>
          <ComputerManagement></ComputerManagement> 
      </div>
    </div>
  )
}

export default index