import { TASK_KEY } from '@/shared/utils/enum';
import { Task } from './taskActions';

export const getTasks = (): Task[] => {
  return JSON.parse(localStorage.getItem(TASK_KEY) || '[]');
};

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem(TASK_KEY, JSON.stringify(tasks));
};
