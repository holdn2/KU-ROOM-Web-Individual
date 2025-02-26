import React from "react";
import styled from "styled-components";

type SizeType = {
  width: string;
  height: string;
};

// 기본적인 사이즈 설정 (객체로 관리)
const defaultSizeStyles = {
  sm: { width: "152px", height: "44px" },
  lg: { width: "355px", height: "48px" },
} as const;

type StyledButtonProps = {
  disabled: boolean;
  size?: string; // 사이즈가 동적으로 변할 수 있도록 변경
};

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${(props) =>
    props.disabled ? "rgba(0, 151, 51, 0.40)" : "#009733"};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  width: ${(props) =>
    defaultSizeStyles[props.size as keyof typeof defaultSizeStyles]?.width ||
    props.size};
  height: ${(props) =>
    defaultSizeStyles[props.size as keyof typeof defaultSizeStyles]?.height ||
    "auto"};
  border-width: 0;
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 120%; /* 19.2px */
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

type Props = {
  size?: string; // 고정값이 아닌 동적 사이즈 허용
  btnText: string;
  onClick: () => void;
  disabled?: boolean; // 기본값을 `false`로 설정할 수 있도록 변경
};

const PrimaryButton = ({
  size = "lg",
  btnText,
  onClick,
  disabled = false,
}: Props) => {
  return (
    <StyledButton
      type="button"
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      {btnText}
    </StyledButton>
  );
};

export default PrimaryButton;
