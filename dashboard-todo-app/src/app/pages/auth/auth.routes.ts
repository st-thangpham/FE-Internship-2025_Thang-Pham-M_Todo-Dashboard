import React from 'react';

import { RouteObject } from 'react-router-dom';

import AuthLayout from './AuthLayout';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

const authRoutes: RouteObject[] = [
  {
    path: '/',
    element: React.createElement(AuthLayout),
    children: [
      { path: 'login', element: React.createElement(LoginPage) },
      { path: 'register', element: React.createElement(RegisterPage) },
    ],
  },
];

export default authRoutes;
