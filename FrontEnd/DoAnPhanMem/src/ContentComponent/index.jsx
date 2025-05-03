import React from 'react'
import "./index.css"
import Navbar from "./NavbarComponent/navbar.jsx"
import AddAccount from "./AccountComponent/AddAccountComponent/account.jsx"
import Management from './AccountComponent/ManagementComponent/management.jsx'

const index = () => {
  return (
    <div class="content">
      <div class="container-content">
          <Navbar></Navbar>
          <Management></Management> 
      </div>
    </div>
  )
}

export default index