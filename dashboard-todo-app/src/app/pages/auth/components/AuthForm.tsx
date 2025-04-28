import React from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

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
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const password = watch('password');

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {type === AuthFormType.register && (
        <>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              id="fullname"
              {...register('fullname', {
                required: 'Full name is required',
                minLength: {
                  value: 3,
                  message: 'Full name must be at least 3 characters',
                },
              })}
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
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
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
            {...register('username', {
              required: 'Username is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
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
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          className="form-input"
        />
        {errors.password && (
          <p className="form-error">{errors.password.message}</p>
        )}
      </div>

      {type === AuthFormType.register && (
        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', {
              required: 'Confirm password is required',
              validate: (value) =>
                value === password || 'Passwords do not match',
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
