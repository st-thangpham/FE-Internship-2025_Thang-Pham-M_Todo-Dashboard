import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '@/shared/redux/store';
import { logout } from '@/shared/redux/auth/authActions';

import DashboardIcon from '@/assets/icons/icon-dashboard.svg';
import DashboardActive from '@/assets/icons/icon-dashboard-active.svg';
import MyTaskIcon from '@/assets/icons/icon-mytask.svg';
import MyTaskActive from '@/assets/icons/icon-mytask-active.svg';
import LogoutIcon from '@/assets/icons/icon-logout.svg';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.loginAccount);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-user">
        <p className="sidebar-name">{user.fullname}</p>
        <p className="sidebar-email">{user.email}</p>
      </div>
      <nav className="sidebar-nav">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? DashboardActive : DashboardIcon}
                alt="Dashboard"
              />
              <span>Dashboard</span>
            </>
          )}
        </NavLink>
        <NavLink
          to="/mytask"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
          }
        >
          {({ isActive }) => (
            <>
              <img src={isActive ? MyTaskActive : MyTaskIcon} alt="My Task" />
              <span>My Task</span>
            </>
          )}
        </NavLink>
      </nav>
      <button className="sidebar-logout" onClick={handleLogout}>
        <img src={LogoutIcon} alt="Icon Logout" />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
