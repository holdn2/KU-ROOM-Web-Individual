import React from "react";
import styles from "./ProfileSection.module.css";
import arrowRight from "../../assets/nav/arrowRight.svg";
import ToggleAlarmButton from "../ToggleAlarmButton";
import KeywordButton from "../KeywordButton/KeywordButton";
import { AppVersion } from "../../constants/appInfo";
import { useHandleSectionClick } from "./hooks/profileSectionClickUtil";

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
  keywordData?: { keyword: string }[];
  onDeleteKeyword?: (keyword: string) => void;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
  sectionData,
  isLastSection,
  isToggle,
  toggleStates,
  onToggle,
  keywordData,
  onDeleteKeyword,
}) => {
  const handleSectionClick = useHandleSectionClick();
  return (
    <>
      <div className={styles.SectionContainer}>
        <span className={styles.SectionTitle}>{sectionData.title}</span>
        {sectionData.contents.map((item, index) => (
          <React.Fragment key={item + index}>
            <button
              key={index}
              className={`${styles.SectionContentButton} ${
                isToggle && styles.ToggleButtonStyle
              }`}
              onClick={() => !isToggle && handleSectionClick(item)}
              disabled={
                item === "이메일" || item === "아이디" || item === "학번"
              }
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
              {item === "앱버전" && (
                <span className={styles.ExtraInfoText}>{AppVersion}</span>
              )}
              {isToggle && (
                <ToggleAlarmButton
                  isOn={toggleStates?.[item] ?? false} // undefined면 false로 처리
                  onToggle={() => onToggle?.(item)} // onToggle이 있을 때만 실행
                />
              )}
            </button>
            {item === "공지 키워드 알림" &&
              toggleStates?.[item] &&
              keywordData && (
                <div className={styles.KeywordButtonWrapper} style={{}}>
                  {keywordData.map((item, index) => (
                    <KeywordButton
                      key={index}
                      keyword={item.keyword}
                      handleDelete={() => onDeleteKeyword?.(item.keyword)}
                    />
                  ))}
                </div>
              )}
          </React.Fragment>
        ))}
      </div>
      {!isLastSection && <div className={styles.DivideSectionThin} />}
    </>
  );
};

export default ProfileSection;
