import React, { useCallback, useMemo, useState } from "react";
import styles from "./InputBar.module.css";
import visibilityOffIcon from "../../assets/icon/visibility_off.svg";
import visibilityOnIcon from "../../assets/icon/visibility_on.svg";

type Props = {
  inputTitle: string;
  inputType: string;
  inputText: string;
  placeholder: string;
  setInputText: (value: string) => void;
};

// useCallback과 useMemo를 이용한 최적화
const InputBar = React.memo(
  ({ inputTitle, inputType, inputText, placeholder, setInputText }: Props) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // 비밀번호 보기/숨기기 토글 최적화
    const onClickPwVisibility = useCallback(() => {
      setIsPasswordVisible((prev) => !prev);
    }, []);

    // input type 최적화
    const computedInputType = useMemo(() => {
      if (inputType === "password") {
        return isPasswordVisible ? "text" : "password";
      }
      return inputType;
    }, [inputType, isPasswordVisible]);

    return (
      <div>
        <p>{inputTitle}</p>
        <div style={{ position: "relative" }}>
          <input
            type={computedInputType}
            value={inputText}
            className={styles.InputContainer}
            placeholder={placeholder}
            onChange={(e) => setInputText(e.target.value)}
          />
          {inputType === "password" && (
            <img
              src={isPasswordVisible ? visibilityOffIcon : visibilityOnIcon}
              alt="비밀번호 보기"
              onClick={onClickPwVisibility}
              style={{
                position: "absolute",
                padding: "10px",
                top: "6px",
                right: "15px",
                cursor: "pointer",
                width: "24px",
                height: "24px",
              }}
            />
          )}
        </div>
      </div>
    );
  }
);

export default InputBar;
