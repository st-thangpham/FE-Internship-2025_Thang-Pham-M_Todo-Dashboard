import React from 'react';

import { RouteObject } from 'react-router-dom';

import TaskDetail from './TaskDetail';

const taskDetailRoutes: RouteObject[] = [
  {
    path: '/mytask/:taskId',
    element: React.createElement(TaskDetail),
  },
];

export default taskDetailRoutes;
