import {
  CREATE_TASK,
  DELETE_TASK,
  SET_FILTER,
  SET_PAGE,
  SET_SEARCH,
  SET_SORT_ORDER,
  UPDATE_TASK,
  CHANGE_STATUS,
} from './taskActionTypes';
import { Task } from './taskActions';
import { getTasks, saveTasks } from './taskStorage';

import { FilterStatusType, SortType } from '@/shared/utils/enum';

interface TaskState {
  tasks: Task[];
  search: string;
  filter: FilterStatusType;
  sortOrder: SortType;
  currentPage: number;
}

const initialState: TaskState = {
  tasks: getTasks(),
  search: '',
  filter: FilterStatusType.all,
  sortOrder: SortType.newest,
  currentPage: 1,
};

const taskReducer = (state = initialState, action: any): TaskState => {
  let updatedTasks: Task[];

  switch (action.type) {
    case CREATE_TASK:
      updatedTasks = [action.payload, ...state.tasks];
      saveTasks(updatedTasks);
      return { ...state, tasks: updatedTasks };

    case UPDATE_TASK:
      updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      saveTasks(updatedTasks);
      return { ...state, tasks: updatedTasks };

    case DELETE_TASK:
      updatedTasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasks(updatedTasks);
      return { ...state, tasks: updatedTasks };

    case SET_SEARCH:
      return { ...state, search: action.payload, currentPage: 1 };

    case SET_FILTER:
      return { ...state, filter: action.payload, currentPage: 1 };

    case SET_SORT_ORDER:
      return { ...state, sortOrder: action.payload };

    case SET_PAGE:
      return { ...state, currentPage: action.payload };

    case CHANGE_STATUS: {
      const { id, status } = action.payload;
      updatedTasks = state.tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      );
      saveTasks(updatedTasks);
      return { ...state, tasks: updatedTasks };
    }

    default:
      return state;
  }
};

export default taskReducer;
