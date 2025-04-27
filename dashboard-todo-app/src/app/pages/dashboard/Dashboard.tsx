import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/shared/redux/store';

import WavehandIcon from '@/assets/icons/icon-handwave.svg';

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.loginAccount);

  return (
    <>
      <h2 className="page-title">
        Welcome back, {user.fullname}
        <img src={WavehandIcon} alt="Wave hand icon" />
      </h2>
    </>
  );
};

export default Dashboard;
