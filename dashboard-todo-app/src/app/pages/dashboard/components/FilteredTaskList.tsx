import React from 'react';

import { RootState } from '@/shared/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { FilterStatusType, pageSize } from '@/shared/utils/enum';
import {
  formatDate,
  getStatusIcon,
  handleChangeStatus,
  isToday,
} from '@/shared/utils/taskHelpers';

interface FilteredTaskListProps {
  statuses: FilterStatusType[];
}

const FilteredTaskList: React.FC<FilteredTaskListProps> = ({ statuses }) => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state: RootState) => state.task);

  const filteredTasks = tasks.filter((task) => statuses.includes(task.status));

  const sortedTasks = [...filteredTasks].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const recentTasks = sortedTasks.slice(0, pageSize);

  const groupedTasks = recentTasks.reduce(
    (groups: Record<string, typeof tasks>, task) => {
      const date = new Date(task.createdAt).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(task);
      return groups;
    },
    {}
  );

  return (
    <div>
      {Object.keys(groupedTasks).map((date) => (
        <div className="task-list-items" key={date}>
          <h4 className="task-date">
            {formatDate(date)}
            {isToday(date) && (
              <span className="today-check">&#8226; Today</span>
            )}
          </h4>
          {groupedTasks[date].map((task) => (
            <div className="task-item">
              <div
                className="task-status"
                onClick={() =>
                  handleChangeStatus(task.id, task.status, dispatch)
                }
              >
                {getStatusIcon(task.status)}
              </div>
              <Link to={`/mytask/${task.id}`} className="task-content">
                <h3 className="task-title">{task.title}</h3>
                <p className="task-summary">{task.description}</p>
                <div className="task-info">
                  <p>
                    Status:{' '}
                    <span
                      className={
                        'task-info-status ' +
                        task.status.toLowerCase().replace(/\s+/g, '-')
                      }
                    >
                      {task.status}
                    </span>
                  </p>
                  <p className="task-info-date">Created on: {task.createdAt}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FilteredTaskList;
