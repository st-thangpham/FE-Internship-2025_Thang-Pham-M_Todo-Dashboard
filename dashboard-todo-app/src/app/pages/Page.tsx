import Sidebar from '@/shared/components/layout/Sidebar';
import React from 'react';

import { Outlet } from 'react-router-dom';

const Page: React.FC = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

export default Page;
