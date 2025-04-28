// src/shared/redux/task/taskReducer.ts
import {
  CREATE_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  CHANGE_STATUS,
  SET_SEARCH,
  SET_FILTER,
  SET_SORT_ORDER,
  SET_PAGE,
} from './taskActionTypes';
import { Task } from './taskActions';
import { getTasks, saveTasks } from './taskStorage';
import { FilterStatusType, SortType } from '@/shared/utils/enum';
import { REGISTER, LOGIN, LOGOUT } from '@/shared/redux/auth/authActionTypes';
import { getLoginAccount } from '@/shared/redux/auth/authStorage';

interface TaskState {
  tasks: Task[];
  search: string;
  filter: FilterStatusType;
  sortOrder: SortType;
  currentPage: number;
}

const initialState: TaskState = {
  tasks: [],
  search: '',
  filter: FilterStatusType.all,
  sortOrder: SortType.newest,
  currentPage: 1,
};

// Load tasks for the currently logged-in user
const loadTasksByUser = (): Task[] => {
  const all = getTasks();
  const user = getLoginAccount();
  return user ? all.filter((t) => t.userId === user.id) : [];
};

const taskReducer = (
  state = { ...initialState, tasks: loadTasksByUser() },
  action: any
): TaskState => {
  let updatedTasks: Task[];

  switch (action.type) {
    case CREATE_TASK:
      updatedTasks = [action.payload, ...state.tasks];
      saveTasks([...getTasks(), action.payload]);
      return { ...state, tasks: updatedTasks };

    case UPDATE_TASK:
      updatedTasks = state.tasks.map((t) =>
        t.id === action.payload.id ? action.payload : t
      );
      saveTasks(
        getTasks().map((t) => (t.id === action.payload.id ? action.payload : t))
      );
      return { ...state, tasks: updatedTasks };

    case DELETE_TASK:
      updatedTasks = state.tasks.filter((t) => t.id !== action.payload);
      saveTasks(getTasks().filter((t) => t.id !== action.payload));
      return { ...state, tasks: updatedTasks };

    case CHANGE_STATUS:
      updatedTasks = state.tasks.map((t) =>
        t.id === action.payload.id ? { ...t, status: action.payload.status } : t
      );
      saveTasks(
        getTasks().map((t) =>
          t.id === action.payload.id
            ? { ...t, status: action.payload.status }
            : t
        )
      );
      return { ...state, tasks: updatedTasks };

    case SET_SEARCH:
      return { ...state, search: action.payload, currentPage: 1 };
    case SET_FILTER:
      return { ...state, filter: action.payload, currentPage: 1 };
    case SET_SORT_ORDER:
      return { ...state, sortOrder: action.payload };
    case SET_PAGE:
      return { ...state, currentPage: action.payload };

    case LOGIN:
      return { ...state, tasks: loadTasksByUser(), currentPage: 1 };

    default:
      return state;
  }
};

export default taskReducer;
