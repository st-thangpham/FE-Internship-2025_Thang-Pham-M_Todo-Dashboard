import React from 'react';

import { RouteObject } from 'react-router-dom';

import TaskList from './TaskList';

const taskListRoutes: RouteObject[] = [
  {
    path: '/mytask',
    element: React.createElement(TaskList),
  },
];

export default taskListRoutes;
