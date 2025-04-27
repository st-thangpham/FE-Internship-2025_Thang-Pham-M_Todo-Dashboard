import React from 'react';

import { RouteObject } from 'react-router-dom';

import Page from './Page';
import dashboardRoutes from './dashboard/dashboard.routes';
import taskDetailRoutes from './task-detail/task-detail.routes';
import taskListRoutes from './task-list/task-list.routes';

const pageRoutes: RouteObject[] = [
  {
    path: '/',
    element: React.createElement(Page),
    children: [...dashboardRoutes, ...taskListRoutes, ...taskDetailRoutes],
  },
];

export default pageRoutes;
