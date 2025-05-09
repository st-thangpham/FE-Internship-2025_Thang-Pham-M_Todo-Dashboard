import React from 'react';

import { RootState } from '@/shared/redux/store';
import { useDispatch, useSelector } from 'react-redux';

import { FilterStatusType, pageSize, SortType } from '@/shared/utils/enum';
import {
  formatDate,
  getStatusIcon,
  handleChangeStatus,
  isToday,
} from '@/shared/utils/taskHelpers';

interface TaskListItemsProps {
  selectedTaskId: string | null;
  onTaskSelect: (taskId: string) => void;
}

const TaskListItems: React.FC<TaskListItemsProps> = ({
  selectedTaskId,
  onTaskSelect,
}) => {
  const dispatch = useDispatch();
  const { tasks, search, filter, sortOrder, currentPage } = useSelector(
    (state: RootState) => state.task
  );

  const filteredTasks = tasks
    .filter(
      (task) =>
        (filter === FilterStatusType.all || task.status === filter) &&
        task.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === SortType.newest
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
    .slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const groupedTasks = filteredTasks.reduce(
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
            <div
              key={task.id}
              className={`task-item${
                task.id === selectedTaskId ? ' selected' : ''
              }`}
            >
              <div
                className="task-status"
                onClick={() =>
                  handleChangeStatus(task.id, task.status, dispatch)
                }
              >
                {getStatusIcon(task.status)}
              </div>
              <div
                className="task-content"
                onClick={() => onTaskSelect(task.id)}
              >
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
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TaskListItems;
