import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { RootState } from '@/shared/redux/store';
import { deleteTask } from '@/shared/redux/task/taskActions';

import DeleteIcon from '@/assets/icons/icon-delete.svg';
import EditIcon from '@/assets/icons/icon-edit.svg';
import UpdateTaskModal from '@/shared/modals/UpdateTaskModal';

interface DetailProps {
  taskId: string;
}

const Detail: React.FC<DetailProps> = ({ taskId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const task = useSelector((state: RootState) =>
    state.task.tasks.find((t) => t.id === taskId)
  );

  const [isEditOpen, setIsEditOpen] = useState(false);

  if (!task) return <p className="task-detail-empty">Task not found.</p>;

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    toast.success('Task deleted successfully!');
    navigate('/dashboard');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const openEdit = () => setIsEditOpen(true);
  const closeEdit = () => setIsEditOpen(false);

  return (
    <div className="task-detail">
      <div className="task-detail-header">
        <h2 className="task-title">{task.title}</h2>
        <button className="btn btn-close" onClick={handleGoBack}>
          Go back
        </button>
      </div>
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
    </div>
  );
};

export default Detail;
