import React from 'react';
import { Outlet } from 'react-router-dom';
// import NavSchbar from '../ContentComponent/NavScheduleComponent/nav';
import Navbar from '../ContentComponent/NavbarComponent/navbar';
import Header from '../../Component/HeaderComponent';
import Footer from '../../Component/FooterComponent';

const ITOfficerLayout = () => {
    return (
        <div>
            <Header></Header>
            <div className="content">
                <div className="container-content">
                    <Navbar />
                    <Outlet />
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
};

export default ITOfficerLayout;