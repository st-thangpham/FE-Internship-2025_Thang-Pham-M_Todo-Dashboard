import { FilterStatusType, SortType } from '@/shared/utils/enum';
import {
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  SET_SEARCH,
  SET_FILTER,
  SET_SORT_ORDER,
  SET_PAGE,
  CHANGE_STATUS,
} from './taskActionTypes';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: FilterStatusType;
  createdAt: string;
}

export const createTask = (task: Task) => ({
  type: CREATE_TASK,
  payload: task,
});

export const updateTask = (task: Task) => ({
  type: UPDATE_TASK,
  payload: task,
});

export const deleteTask = (id: string) => ({
  type: DELETE_TASK,
  payload: id,
});

export const setSearch = (search: string) => ({
  type: SET_SEARCH,
  payload: search,
});

export const setFilter = (filter: FilterStatusType) => ({
  type: SET_FILTER,
  payload: filter,
});

export const setSortOrder = (sortOrder: SortType) => ({
  type: SET_SORT_ORDER,
  payload: sortOrder,
});

export const setPage = (page: number) => ({
  type: SET_PAGE,
  payload: page,
});

export const changeTaskStatus = (id: string, status: FilterStatusType) => ({
  type: CHANGE_STATUS,
  payload: { id, status },
});
