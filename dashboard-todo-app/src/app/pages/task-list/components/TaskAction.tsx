'use client';

import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import CreateTaskModal from '@/shared/modals/CreateTaskModal';
import { RootState } from '@/shared/redux/store';
import {
  setFilter,
  setSearch,
  setSortOrder,
} from '@/shared/redux/task/taskActions';
import { FilterStatusType, SortType } from '@/shared/utils/enum';

import AddIcon from '@/assets/icons/icon-add.svg';

const TaskAction: React.FC = () => {
  const dispatch = useDispatch();
  const { search, filter, sortOrder } = useSelector(
    (state: RootState) => state.task
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTaskClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="task-action">
      <div className="task-action-header">
        <h2 className="task-action-title">My Tasks</h2>
        <button onClick={handleAddTaskClick} className="btn btn-add">
          <img src={AddIcon} alt="Icon add" />
          Add Task
        </button>
      </div>

      <div className="task-action-filters">
        <input
          type="text"
          className="task-action-search"
          placeholder="Search task..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
        />

        <select
          className="task-action-select"
          value={filter}
          onChange={(e) =>
            dispatch(setFilter(e.target.value as FilterStatusType))
          }
        >
          <option value={FilterStatusType.all}>{FilterStatusType.all}</option>
          <option value={FilterStatusType.notStarted}>
            {FilterStatusType.notStarted}
          </option>
          <option value={FilterStatusType.inProgress}>
            {FilterStatusType.inProgress}
          </option>
          <option value={FilterStatusType.completed}>
            {FilterStatusType.completed}
          </option>
        </select>

        <select
          className="task-action-select"
          value={sortOrder}
          onChange={(e) => dispatch(setSortOrder(e.target.value as SortType))}
        >
          <option value={SortType.newest}>{SortType.newest}</option>
          <option value={SortType.oldest}>{SortType.oldest}</option>
        </select>
      </div>

      <CreateTaskModal open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default TaskAction;
