import React from 'react'
import "./index.css"
import Navbar from "./NavbarComponent/navbar.tsx"
import UpdateAccount from "./AccountComponent/UpdateAccountComponent/account.tsx"
import Management from './AccountComponent/ManagementComponent/management.tsx'
import ComputerManagement from './ComputerComponent/ManagementComponent/management.tsx'

const index = () => {
    return (
        <div className="content">
            <div className="container-content">
                <Navbar></Navbar>
                <Management></Management>
            </div>
        </div>
    )
}

export default index