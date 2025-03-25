import React from "react";
import styles from "./ProfileSection.module.css";
import { useNavigate } from "react-router-dom";
import arrowRight from "../../assets/nav/arrowRight.svg";
import ToggleAlarmButton from "../ToggleAlarmButton";

const userEmail = "kurum12@gmail.com";
const userId = "kurum12";
const studentId = "202012356";

interface ProfileSectionProps {
  sectionData: {
    title: string;
    contents: string[];
  };
  isLastSection: boolean;
  isToggle?: boolean;
  toggleStates?: Record<string, boolean>;
  onToggle?: (item: string) => void;
}

const buttonActions: { [key: string]: (() => void) | null } = {
  "친구 추가": () => console.log("친구 추가 실행"),
  "친구 목록": () => console.log("친구 목록 실행"),
  "약관 및 정책": () => console.log("약관 및 정책 실행"),
  "앱 배포": () => console.log("앱 배포 실행"),
  "고객 센터": () => console.log("고객 센터 실행"),
  "알림 설정": null,
  로그아웃: () => console.log("로그아웃 실행"),
  탈퇴하기: () => console.log("탈퇴하기 실행"),
  "비밀번호 변경하기": null,
  "닉네임 변경하기": null,
};

const ProfileSection: React.FC<ProfileSectionProps> = ({
  sectionData,
  isLastSection,
  isToggle,
  toggleStates,
  onToggle,
}) => {
  const navigate = useNavigate();

  const handleButtonClick = (item: string) => {
    if (item === "비밀번호 변경하기") {
      navigate("/changepw");
    }
    if (item === "닉네임 변경하기") {
      navigate("/changenickname");
    }
    if (item === "알림 설정") {
      navigate("/alarmsetting");
    }
    const action = buttonActions[item];
    if (action) {
      action(); // 해당하는 함수 실행
    } else {
      console.log(`${item} 버튼이 클릭됨`);
    }
  };
  return (
    <>
      <div className={styles.SectionContainer}>
        <span className={styles.SectionTitle}>{sectionData.title}</span>
        {sectionData.contents.map((item, index) => (
          <button
            key={index}
            className={`${styles.SectionContentButton} ${
              isToggle && styles.ToggleButtonStyle
            }`}
            onClick={() => !isToggle && handleButtonClick(item)}
            disabled={item === "이메일" || item === "학번"}
          >
            {item}
            {item === "이메일" && (
              <span className={styles.ExtraInfoText}>{userEmail}</span>
            )}
            {item === "아이디" && (
              <span className={styles.ExtraInfoText}>{userId}</span>
            )}
            {item === "학번" && (
              <span className={styles.ExtraInfoText}>{studentId}</span>
            )}
            {item === "학과" && (
              <img className={styles.ArrowIcon} src={arrowRight} alt="학과" />
            )}
            {isToggle && (
              <ToggleAlarmButton
                isOn={toggleStates?.[item] ?? false} // undefined면 false로 처리
                onToggle={() => onToggle?.(item)} // onToggle이 있을 때만 실행
              />
            )}
          </button>
        ))}
      </div>
      {!isLastSection && <div className={styles.DivideSectionThin} />}
    </>
  );
};

export default ProfileSection;
