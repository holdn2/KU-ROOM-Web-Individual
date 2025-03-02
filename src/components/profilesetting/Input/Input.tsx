import React, { ChangeEvent } from 'react';
import './Input.css';

interface InputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  maxLength,
  disabled = false,
  isInvalid = false,
  errorMessage = ""
}) => {
  const isExceedingMaxLength = maxLength && value.length > maxLength;

  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <div className="input-field-container">
        <input
          className="input-field"
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
      {isExceedingMaxLength && (
        <div className="input-warning">
          {maxLength}자 이내로 입력해주세요.
        </div>
      )}
      {isInvalid && (
        <div className="input-warning">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Input;