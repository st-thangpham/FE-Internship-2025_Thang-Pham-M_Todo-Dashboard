// src/components/AuthForm.tsx
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import { AuthFormType } from '@/shared/utils/enum';

interface FormValues {
  username?: string;
  fullname?: string;
  email?: string;
  password: string;
  confirmPassword?: string;
}

interface AuthFormProps {
  type: AuthFormType;
  onSubmit: SubmitHandler<FormValues>;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      {type === AuthFormType.register && (
        <>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              id="fullname"
              {...register('fullname', { required: 'Full name is required' })}
              className="form-input"
            />
            {errors.fullname && (
              <p className="form-error">{errors.fullname.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="form-input"
            />
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
          </div>
        </>
      )}

      {type === AuthFormType.login && (
        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            id="username"
            {...register('username', { required: 'Username is required' })}
            className="form-input"
          />
          {errors.username && (
            <p className="form-error">{errors.username.message}</p>
          )}
        </div>
      )}

      <div className="form-group">
        <label className="form-label">Password</label>
        <input
          id="password"
          type="password"
          {...register('password', { required: 'Password is required' })}
          className="form-input"
        />
        {errors.password && (
          <p className="form-error">{errors.password.message}</p>
        )}
      </div>

      {type === 'register' && (
        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', {
              required: 'Confirm password is required',
            })}
            className="form-input"
          />
          {errors.confirmPassword && (
            <p className="form-error">{errors.confirmPassword.message}</p>
          )}
        </div>
      )}

      <button type="submit" className="btn btn-primary btn-auth">
        {type === AuthFormType.login ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

export default AuthForm;
