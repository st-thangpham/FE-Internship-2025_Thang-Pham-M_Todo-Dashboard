import React from 'react';
import { Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">Register!</h2>
        <form className="auth-form">
          <div className="form-group">
            <label htmlFor="fullname">Full name:</label>
            <input type="text" id="fullname" className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" className="form-input" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              className="form-input"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
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
