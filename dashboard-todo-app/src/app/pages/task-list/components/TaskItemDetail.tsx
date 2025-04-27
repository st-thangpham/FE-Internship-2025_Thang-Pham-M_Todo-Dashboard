// src/pages/components/TaskItemDetail.tsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/shared/redux/store';
import { deleteTask } from '@/shared/redux/task/taskActions';
import { toast } from 'react-toastify';

import UpdateTaskModal from '../modals/UpdateTaskModal';
import EditIcon from '@/assets/icons/icon-edit.svg';
import DeleteIcon from '@/assets/icons/icon-delete.svg';

interface TaskItemDetailProps {
  taskId: string;
  onDelete: (deletedId: string) => void;
}

const TaskItemDetail: React.FC<TaskItemDetailProps> = ({
  taskId,
  onDelete,
}) => {
  const dispatch = useDispatch();
  const task = useSelector((state: RootState) =>
    state.task.tasks.find((t) => t.id === taskId)
  );

  const [isEditOpen, setIsEditOpen] = useState(false);

  if (!task) return <p className="task-detail-empty">Task not found.</p>;

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    toast.success('Task deleted successfully!');
    onDelete(task.id);
  };

  const openEdit = () => setIsEditOpen(true);
  const closeEdit = () => setIsEditOpen(false);

  return (
    <>
      <h2 className="task-title">{task.title}</h2>
      <p className="task-info-status">
        Status:{' '}
        <span className={task.status.toLowerCase().replace(/\s+/g, '-')}>
          {task.status}
        </span>
      </p>
      <p className="task-date">Created on: {task.createdAt}</p>
      <div className="task-detail-description">
        <strong>Description:</strong>
        <p className="task-summary">{task.description}</p>
      </div>

      <div className="task-actions">
        <button className="btn btn-primary btn-icon" onClick={handleDelete}>
          <img src={DeleteIcon} alt="Delete Icon" />
        </button>
        <button className="btn btn-primary btn-icon" onClick={openEdit}>
          <img src={EditIcon} alt="Edit Icon" />
        </button>
      </div>

      {isEditOpen && (
        <UpdateTaskModal
          open={isEditOpen}
          onClose={closeEdit}
          taskId={task.id}
        />
      )}
    </>
  );
};

export default TaskItemDetail;
