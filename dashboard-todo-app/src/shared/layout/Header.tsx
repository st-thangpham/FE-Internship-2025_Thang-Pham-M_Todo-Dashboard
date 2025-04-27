import React from 'react';

const Header: React.FC = () => {
  const now = new Date();
  const dayName = now.toLocaleString('default', { weekday: 'long' });
  const dateStr = now.toLocaleDateString();

  return (
    <header className="header">
      <h1 className="header-title">
        To<span className="header-subtitle">-Do</span>
      </h1>
      <div className="header-date">
        <span className="header-day">{dayName}</span>
        <span className="header-fulldate">{dateStr}</span>
      </div>
    </header>
  );
};

export default Header;
