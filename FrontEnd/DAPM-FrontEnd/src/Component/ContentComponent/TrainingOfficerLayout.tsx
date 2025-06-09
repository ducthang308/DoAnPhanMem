import React from 'react';
import { Outlet } from 'react-router-dom';
import NavSchbar from '../ContentComponent/NavScheduleComponent/nav';
import Header from '../../Component/HeaderComponent';
import Footer from '../../Component/FooterComponent';

const TrainingOfficerLayout = () => {
    return (
        <div>
            <Header></Header>
            <div className="content">
                <div className="container-content">
                    <NavSchbar />
                    <Outlet />
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default TrainingOfficerLayout;
