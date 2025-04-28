import React from 'react';

import { FilterStatusType } from './enum';
import { changeTaskStatus } from '../redux/task/taskActions';

import CompletedIcon from '@/assets/icons/icon-completed.svg';
import InProgressIcon from '@/assets/icons/icon-inprogress.svg';
import NotStartedIcon from '@/assets/icons/icon-notstarted.svg';

export const getStatusIcon = (status: FilterStatusType) => {
  if (status === FilterStatusType.notStarted)
    return React.createElement('img', {
      src: NotStartedIcon,
      alt: 'Not Started',
    });
  if (status === FilterStatusType.inProgress)
    return React.createElement('img', {
      src: InProgressIcon,
      alt: 'In Progress',
    });
  return React.createElement('img', { src: CompletedIcon, alt: 'Completed' });
};

export const handleChangeStatus = (
  taskId: string,
  currentStatus: FilterStatusType,
  dispatch: any
) => {
  const next =
    currentStatus === FilterStatusType.notStarted
      ? FilterStatusType.inProgress
      : currentStatus === FilterStatusType.inProgress
      ? FilterStatusType.completed
      : FilterStatusType.notStarted;
  dispatch(changeTaskStatus(taskId, next));
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
  });
};

export const isToday = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};
