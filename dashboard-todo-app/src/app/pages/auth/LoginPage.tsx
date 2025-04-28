import React from 'react';

import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { login } from '@/shared/redux/auth/authActions';
import { AuthFormType } from '@/shared/utils/enum';
import AuthForm from './components/AuthForm';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (data: any) => {
    dispatch(login(data));
    const loginAccount = JSON.parse(
      localStorage.getItem('LoginAccount') || 'null'
    );
    if (loginAccount) {
      toast.success('Login successful!');
      navigate('/dashboard');
    } else {
      toast.error('Invalid email or password!');
    }
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
