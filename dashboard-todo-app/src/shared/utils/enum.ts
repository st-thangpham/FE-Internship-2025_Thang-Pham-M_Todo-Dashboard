export const ACCOUNT_KEY = 'Account';
export const LOGIN_KEY = 'LoginAccount';
export const TASK_KEY = 'TASKS';

export const pageSize = 4;

export enum AuthFormType {
  login = 'login',
  register = 'register',
}

export enum FilterStatusType {
  all = 'All',
  notStarted = 'Not Started',
  inProgress = 'In Progress',
  completed = 'Completed',
}

export enum SortType {
  newest = 'Newest',
  oldest = 'oldest',
}
