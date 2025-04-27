import React from 'react';

import { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import authRoutes from './pages/auth/auth.routes';
import pageRoutes from './pages/page.routes';

const appRoutes: RouteObject[] = [
  {
    path: '/',
    element: React.createElement(Navigate, { to: '/login', replace: true }),
  },
  ...authRoutes,
  ...pageRoutes,
];

export default appRoutes;
