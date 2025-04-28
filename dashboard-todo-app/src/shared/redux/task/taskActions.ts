import { RootState } from '@/shared/redux/store';
import { FilterStatusType, SortType } from '@/shared/utils/enum';
import { nanoid } from '@reduxjs/toolkit';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {
  CHANGE_STATUS,
  CREATE_TASK,
  DELETE_TASK,
  SET_FILTER,
  SET_PAGE,
  SET_SEARCH,
  SET_SORT_ORDER,
  UPDATE_TASK,
} from './taskActionTypes';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: FilterStatusType;
  createdAt: string;
  userId: string;
}

type ThunkResult<R> = ThunkAction<R, RootState, unknown, AnyAction>;

export const createTask = (
  task: Omit<Task, 'id' | 'userId'>
): ThunkResult<void> => {
  return (dispatch, getState) => {
    const { loginAccount } = getState().auth;
    const newTask: Task = {
      ...task,
      id: nanoid(),
      userId: loginAccount.id,
    };
    dispatch({
      type: CREATE_TASK,
      payload: newTask,
    });
  };
};

export const updateTask = (task: Task) => ({
  type: UPDATE_TASK,
  payload: task,
});

export const deleteTask = (id: string) => ({
  type: DELETE_TASK,
  payload: id,
});

export const changeTaskStatus = (id: string, status: FilterStatusType) => ({
  type: CHANGE_STATUS,
  payload: { id, status },
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
