import { REGISTER, LOGIN, LOGOUT } from './authActionTypes';

interface Account {
  username: string;
  password: string;
  fullname?: string;
  email?: string;
}

export const register = (account: Account) => {
  return {
    type: REGISTER,
    payload: account,
  };
};

export const login = (credentials: { username: string; password: string }) => {
  return {
    type: LOGIN,
    payload: credentials,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
