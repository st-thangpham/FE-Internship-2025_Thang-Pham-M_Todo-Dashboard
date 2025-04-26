import React from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '@/shared/components/layout/Sidebar';
import Header from '@/shared/components/layout/Header';

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
