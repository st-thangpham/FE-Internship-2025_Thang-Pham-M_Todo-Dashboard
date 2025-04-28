import { Account } from './authActions';
import { ACCOUNT_KEY, LOGIN_KEY } from '@/shared/utils/enum';

export const getAccounts = (): Account[] => {
  return JSON.parse(localStorage.getItem(ACCOUNT_KEY) || '[]');
};

export const saveAccount = (account: Account): void => {
  const accounts = getAccounts();
  accounts.push(account);
  localStorage.setItem(ACCOUNT_KEY, JSON.stringify(accounts));
};

export const getLoginAccount = (): Account | null => {
  return JSON.parse(localStorage.getItem(LOGIN_KEY) || 'null');
};

export const saveLoginAccount = (account: Account): void => {
  localStorage.setItem(LOGIN_KEY, JSON.stringify(account));
};

export const removeLoginAccount = (): void => {
  localStorage.removeItem(LOGIN_KEY);
};
