import { nanoid } from '@reduxjs/toolkit';
import { REGISTER, LOGIN, LOGOUT } from './authActionTypes';

export interface Account {
  id: string;
  username: string;
  password: string;
  fullname?: string;
  email?: string;
}

export const register = (account: Omit<Account, 'id'>) => {
  const newAccount: Account = { ...account, id: nanoid() };
  return {
    type: REGISTER,
    payload: newAccount,
  };
};

export const login = (credentials: { username: string; password: string }) => {
  return {
    type: LOGIN,
    payload: credentials,
  };
};

export const logout = () => ({
  type: LOGOUT,
});
