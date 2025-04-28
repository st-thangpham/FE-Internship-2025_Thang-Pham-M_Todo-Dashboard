'use client';

import React, { useState } from 'react';

import CreateTaskModal from '@/shared/modals/CreateTaskModal';

import AddIcon from '@/assets/icons/icon-add.svg';
import PendingIcon from '@/assets/icons/icon-task-pending.svg';

const DashboardAction: React.FC = () => {
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
        <h3 className="task-action-label">
          <img src={PendingIcon} alt="Pending icon" />
          To-Do
        </h3>
        <button onClick={handleAddTaskClick} className="btn btn-add">
          <img src={AddIcon} alt="Icon add" />
          Add Task
        </button>
      </div>

      <CreateTaskModal open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default DashboardAction;
