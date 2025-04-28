// src/pages/TaskList.tsx
import React, { useState } from 'react';

import { RootState } from '@/shared/redux/store';
import { useSelector } from 'react-redux';

import TaskAction from './components/TaskAction';
import TaskItemDetail from './components/TaskItemDetail';
import TaskListItems from './components/TaskListItems';
import TaskPagination from './components/taskPagination';

const TaskList: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(
    () => tasks[0]?.id ?? null
  );

  const handleTaskSelect = (taskId: string) => {
    setSelectedTaskId(taskId);
  };

  const handleTaskDelete = (deletedId: string) => {
    if (selectedTaskId === deletedId) {
      const idx = tasks.findIndex((t) => t.id === deletedId);
      const next = tasks[idx + 1] ?? tasks[idx - 1];
      setSelectedTaskId(next?.id ?? null);
    }
  };

  return (
    <div className="task">
      <div className="task-list">
        <TaskAction />
        <TaskListItems
          selectedTaskId={selectedTaskId}
          onTaskSelect={handleTaskSelect}
        />
        <TaskPagination />
      </div>
      <div className="task-detail">
        <TaskItemDetail taskId={selectedTaskId} onDelete={handleTaskDelete} />
      </div>
    </div>
  );
};

export default TaskList;
