import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import authReducer from './auth/authReducer';
import taskReducer from './task/taskReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
