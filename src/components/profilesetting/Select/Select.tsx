import React from 'react';
import './Select.css';

interface SelectProps {
  label: string;
  value: string;
  placeholder: string;
  onClick: () => void;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  placeholder,
  onClick,
  disabled = false
}) => {
  return (
    <div className="select-container">
      <label className="select-label">{label}</label>
      <div 
        className={`select-field ${disabled ? 'disabled' : ''}`} 
        onClick={disabled ? undefined : onClick}
      >
        {value ? (
          <span className="select-value">{value}</span>
        ) : (
          <span className="select-placeholder">{placeholder}</span>
        )}
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="select-arrow"
        >
          <path 
            d="M4 6L8 10L12 6" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default Select;