// src/pages/RegisterPage.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import AuthForm from './components/AuthForm';
import { AuthFormType } from '@/shared/utils/enum';
import { register } from '@/shared/redux/auth/authActions';

const RegisterPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (data: any) => {
    dispatch(register(data));
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Register!</h2>
        <AuthForm type={AuthFormType.register} onSubmit={handleRegister} />
        <p className="auth-link">
          Yes I have an account?{' '}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
