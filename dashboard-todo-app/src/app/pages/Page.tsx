import React from 'react';

import { Outlet } from 'react-router-dom';

const Page: React.FC = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Page;
