import React, { ChangeEvent, useState } from "react";
import "./InputBar.css";
import visibilityOffIcon from "../../assets/icon/visibility_off.svg";
import visibilityOnIcon from "../../assets/icon/visibility_on.svg";

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  disabled?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
}
const InputBar: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  maxLength,
  disabled = false,
  isInvalid = false,
  errorMessage = "",
}) => {
  const isExceedingMaxLength = maxLength && value.length > maxLength;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // 비밀번호 보기/숨기기 토글 최적화
  const onClickPwVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <div className="input-field-container">
        <input
          className="input-field"
          type={type === "password" && isPasswordVisible ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
      {type === "password" && (
        <img
          src={isPasswordVisible ? visibilityOffIcon : visibilityOnIcon}
          alt="비밀번호 보기"
          onClick={onClickPwVisibility}
          className="visible-button"
        />
      )}
      {isExceedingMaxLength && (
        <div className="input-warning">{maxLength}자 이내로 입력해주세요.</div>
      )}
      {isInvalid && <div className="input-warning">{errorMessage}</div>}
    </div>
  );
};

export default InputBar;
