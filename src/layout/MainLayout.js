import React from 'react';
import Header from './HeaderLayout';
import { Outlet } from 'react-router-dom';

import './MainLayout.css';

const MainLayout = () => {
    return (
        <div className="main-layout">
          <Header />
          <div className="content">
            <Outlet />
          </div>
        </div>
      );
};

export default MainLayout;