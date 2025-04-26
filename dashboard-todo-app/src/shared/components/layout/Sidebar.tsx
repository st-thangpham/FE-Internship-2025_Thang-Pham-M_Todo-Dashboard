// src/app/shared/components/Sidebar.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '@/shared/redux/auth/authActions';

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <button className="btn btn-logout" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
