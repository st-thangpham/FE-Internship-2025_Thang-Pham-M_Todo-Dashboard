'use client';

import React from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { createTask } from '@/shared/redux/task/taskActions';
import { FilterStatusType } from '@/shared/utils/enum';
import { AppDispatch } from '../redux/store';

interface CreateTaskModalProps {
  open: boolean;
  onClose: () => void;
}

interface FormData {
  title: string;
  description: string;
  status: FilterStatusType;
  createdAt: string;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ open, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      createdAt: new Date().toISOString().split('T')[0],
      status: FilterStatusType.notStarted,
    },
  });

  const onSubmit = (data: FormData) => {
    const newTask = {
      title: data.title,
      description: data.description,
      status: data.status,
      createdAt: data.createdAt,
    };
    dispatch(createTask(newTask));
    toast.success('Task created successfully!');
    reset();
    onClose();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="modal-overlay" />
        <Dialog.Content className="modal-content">
          <div className="modal-header">
            <Dialog.Title className="modal-title">Add New Task</Dialog.Title>
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
                placeholder="Enter task title"
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
                    defaultChecked
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
                  />
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Task Description</label>
              <textarea
                className="form-textarea"
                rows={3}
                {...register('description', { required: true })}
                placeholder="Enter task description"
              />
              {errors.description && (
                <span className="form-error">Description is required</span>
              )}
            </div>
          </form>

          <div className="modal-footer">
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="btn btn-primary"
            >
              Create
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateTaskModal;
