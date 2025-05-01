import React from 'react';
import styles from './Button.css';

const Button = ({ children, onClick, disabled, className = '', ...rest }) => {
  const buttonClassName = `${styles.button} ${className}`;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClassName}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;