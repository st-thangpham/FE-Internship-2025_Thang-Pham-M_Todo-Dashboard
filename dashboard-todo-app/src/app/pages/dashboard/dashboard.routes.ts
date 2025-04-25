import React from 'react';

import { RouteObject } from 'react-router-dom';

import Dashboard from './Dashboard';

const dashboardRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: React.createElement(Dashboard),
  },
];

export default dashboardRoutes;
