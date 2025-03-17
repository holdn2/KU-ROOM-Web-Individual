import React from "react";
import styles from "./ProfileSection.module.css";
import arrowRight from "../../assets/nav/arrowRight.svg";

interface ProfileSectionProps {
  sectionData: {
    title: string;
    contents: string[];
  };
}

const buttonActions: { [key: string]: () => void } = {
  "친구 추가": () => console.log("친구 추가 실행"),
  "친구 목록": () => console.log("친구 목록 실행"),
  "약관 및 정책": () => console.log("약관 및 정책 실행"),
  "앱 배포": () => console.log("앱 배포 실행"),
  "고객 센터": () => console.log("고객 센터 실행"),
  "알림 설정": () => console.log("알림 설정 실행"),
  로그아웃: () => console.log("로그아웃 실행"),
  탈퇴하기: () => console.log("탈퇴하기 실행"),
  이메일: () => console.log("이메일"),
};

const handleButtonClick = (item: string) => {
  const action = buttonActions[item];
  if (action) {
    action(); // 해당하는 함수 실행
  } else {
    console.log(`${item} 버튼이 클릭됨`);
  }
};

const ProfileSection: React.FC<ProfileSectionProps> = ({ sectionData }) => {
  return (
    <>
      <div className={styles.SectionContainer}>
        <span className={styles.SectionTitle}>{sectionData.title}</span>
        {sectionData.contents.map((item, index) => (
          <button
            key={index}
            className={styles.SectionContentText}
            onClick={() => handleButtonClick(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className={styles.DivideSectionThin} />
    </>
  );
};

export default ProfileSection;
