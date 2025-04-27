import { REGISTER, LOGIN, LOGOUT } from './authActionTypes';
import {
  getAccounts,
  saveAccount,
  getLoginAccount,
  saveLoginAccount,
  removeLoginAccount,
  Account,
} from './authStorage';

interface AuthState {
  loginAccount: Account | null;
}

const initialState: AuthState = {
  loginAccount: getLoginAccount(),
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case REGISTER:
      saveAccount(action.payload);
      return state;

    case LOGIN:
      const accounts = getAccounts();
      const found = accounts.find(
        (acc) =>
          acc.email === action.payload.username &&
          acc.password === action.payload.password
      );
      if (found) {
        saveLoginAccount(found);
        return { ...state, loginAccount: found };
      } else {
        alert('Invalid username or password');
        return state;
      }

    case LOGOUT:
      removeLoginAccount();
      return { ...state, loginAccount: null };

    default:
      return state;
  }
};

export default authReducer;
