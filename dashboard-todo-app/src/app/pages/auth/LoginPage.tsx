// src/pages/LoginPage.tsx
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AuthForm from './components/AuthForm';
import { AuthFormType } from '@/shared/utils/enum';
import { login } from '@/shared/redux/auth/authActions';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (data: any) => {
    dispatch(login(data));
    const loginAccount = JSON.parse(
      localStorage.getItem('LoginAccount') || 'null'
    );
    if (loginAccount) navigate('/dashboard');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Welcome Back!</h2>
        <AuthForm type={AuthFormType.login} onSubmit={handleLogin} />
        <p className="auth-link">
          Don't have an account?{' '}
          <Link to="/register" className="link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
