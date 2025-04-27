// src/pages/components/TaskListItems.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/shared/redux/store';
import { FilterStatusType, pageSize, SortType } from '@/shared/utils/enum';
import { changeTaskStatus } from '@/shared/redux/task/taskActions';

import NotStartedIcon from '@/assets/icons/icon-notstarted.svg';
import InProgressIcon from '@/assets/icons/icon-inprogress.svg';
import CompletedIcon from '@/assets/icons/icon-completed.svg';

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

  const getStatusIcon = (status: FilterStatusType) => {
    if (status === FilterStatusType.notStarted)
      return <img src={NotStartedIcon} alt="" />;
    if (status === FilterStatusType.inProgress)
      return <img src={InProgressIcon} alt="" />;
    return <img src={CompletedIcon} alt="" />;
  };

  const handleChangeStatus = (
    taskId: string,
    currentStatus: FilterStatusType
  ) => {
    const next =
      currentStatus === FilterStatusType.notStarted
        ? FilterStatusType.inProgress
        : currentStatus === FilterStatusType.inProgress
        ? FilterStatusType.completed
        : FilterStatusType.notStarted;
    dispatch(changeTaskStatus(taskId, next));
  };

  return (
    <div className="task-list-items">
      {filteredTasks.map((task) => (
        <div
          key={task.id}
          className={`task-item${
            task.id === selectedTaskId ? ' selected' : ''
          }`}
        >
          <div
            className="task-status"
            onClick={() => handleChangeStatus(task.id, task.status)}
          >
            {getStatusIcon(task.status)}
          </div>
          <div className="task-content" onClick={() => onTaskSelect(task.id)}>
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
  );
};

export default TaskListItems;
