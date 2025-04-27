import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '@/shared/layout/Sidebar';
import Header from '@/shared/layout/Header';

const Page: React.FC = () => (
  <div className="app-layout">
    <Header />
    <div className="main-content">
      <Sidebar />
      <div className="page-container">
        <Outlet />
      </div>
    </div>
  </div>
);

export default Page;
