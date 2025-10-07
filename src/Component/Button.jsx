import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ onClick, title, icon, bgcolor, link ,className="" }) => {
  return (
    <Link
      to={link}
      onClick={onClick}
      className={`${className}`}
    >
      {icon}
      {title}
    </Link>
  );
};

export default Button;
