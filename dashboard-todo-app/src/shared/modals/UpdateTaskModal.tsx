'use client';

import React, { useEffect } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { RootState } from '@/shared/redux/store';
import { updateTask } from '@/shared/redux/task/taskActions';
import { FilterStatusType } from '@/shared/utils/enum';

interface UpdateTaskModalProps {
  open: boolean;
  onClose: () => void;
  taskId: string;
}

interface FormData {
  title: string;
  description: string;
  status: FilterStatusType;
  createdAt: string;
}

const UpdateTaskModal: React.FC<UpdateTaskModalProps> = ({
  open,
  onClose,
  taskId,
}) => {
  const dispatch = useDispatch();
  const task = useSelector((state: RootState) =>
    state.task.tasks.find((t) => t.id === taskId)
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
      status: FilterStatusType.notStarted,
      createdAt: '',
    },
  });

  const watchedStatus = watch('status');

  useEffect(() => {
    if (open && task) {
      reset({
        title: task.title,
        description: task.description,
        status: task.status,
        createdAt: task.createdAt,
      });
    }
  }, [open, reset]);

  const onSubmit = (data: FormData) => {
    if (!task) return;
    dispatch(updateTask({ ...task, ...data }));
    toast.success('Task updated successfully!');
    onClose();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content className="modal-content">
          <div className="modal-header">
            <Dialog.Title className="modal-title">Edit Task</Dialog.Title>
            <Dialog.Close asChild>
              <button className="btn btn-close">Go back</button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="form form-create">
            <div className="form-group">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-input"
                {...register('title', { required: true })}
              />
              {errors.title && (
                <span className="form-error">Title is required</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Date Created</label>
              <input
                type="date"
                className="form-input"
                {...register('createdAt', { required: true })}
              />
              {errors.createdAt && (
                <span className="form-error">Date is required</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <div className="form-radio-group">
                <label className="form-radio">
                  <span className="form-radio-label">
                    {FilterStatusType.notStarted}
                  </span>
                  <input
                    type="radio"
                    value={FilterStatusType.notStarted}
                    {...register('status', { required: true })}
                    checked={watchedStatus === FilterStatusType.notStarted}
                  />
                </label>

                <label className="form-radio">
                  <span className="form-radio-label">
                    {FilterStatusType.inProgress}
                  </span>
                  <input
                    type="radio"
                    value={FilterStatusType.inProgress}
                    {...register('status', { required: true })}
                    checked={watchedStatus === FilterStatusType.inProgress}
                  />
                </label>

                <label className="form-radio">
                  <span className="form-radio-label">
                    {FilterStatusType.completed}
                  </span>
                  <input
                    type="radio"
                    value={FilterStatusType.completed}
                    {...register('status', { required: true })}
                    checked={watchedStatus === FilterStatusType.completed}
                  />
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                rows={3}
                className="form-textarea"
                {...register('description', { required: true })}
              />
              {errors.description && (
                <span className="form-error">Description is required</span>
              )}
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UpdateTaskModal;
