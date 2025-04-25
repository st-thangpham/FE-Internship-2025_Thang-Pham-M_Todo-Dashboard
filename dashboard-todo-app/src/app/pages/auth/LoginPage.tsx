import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Welcome Back!</h2>
        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" className="form-input" />
          </div>
          <button type="submit" className="btn btn-primary">
            <Link to="/dashboard">Login</Link>
          </button>
        </form>
        <p className="auth-link">
          Don't have and account?{' '}
          <Link to="/register" className="link">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
