import React from 'react';

import { RootState } from '@/shared/redux/store';
import { useSelector } from 'react-redux';

import { FilterStatusType } from '@/shared/utils/enum';
import DashboardAction from './components/DashboardAction';
import FilteredTaskList from './components/FilteredTaskList';
import TaskStatusPieChart from './components/TaskStatusPieChart';

import WavehandIcon from '@/assets/icons/icon-handwave.svg';
import CompleteIcon from '@/assets/icons/icon-task-complete.svg';
import StatusIcon from '@/assets/icons/icon-task-status.svg';

const Dashboard = () => {
  const user = useSelector((state: RootState) => state.auth.loginAccount);

  return (
    <div className="dashboard">
      <h2 className="page-title">
        Welcome back, {user.fullname}
        <img src={WavehandIcon} alt="Wave hand icon" />
      </h2>
      <div className="dashboard-content">
        <div className="task-list dashboard-list">
          <DashboardAction />
          <FilteredTaskList
            statuses={[
              FilterStatusType.notStarted,
              FilterStatusType.inProgress,
            ]}
          />
        </div>
        <div className="dashboard-analyse">
          <div className="dashboard-piechart">
            <h3 className="task-action-label">
              <img src={StatusIcon} alt="Status icon" />
              Task Status
            </h3>
            <TaskStatusPieChart />
          </div>
          <div className="task-list dashboard-list">
            <h3 className="task-action-label">
              <img src={CompleteIcon} alt="Complete icon" />
              Completed Task
            </h3>
            <FilteredTaskList statuses={[FilterStatusType.completed]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
