import Header from "../../../components/Header/Header";
import MyProfileComponent from "../../../components/MyProfile/MyProfileComponent";
import ProfileSection from "../../../components/MyProfile/ProfileSection";
import styles from "./ProfileChange.module.css";

const sectionDatas: { title: string; contents: string[] }[] = [
  {
    title: "프로필",
    contents: ["이메일", "아이디", "비밀번호 변경하기", "닉네임 변경하기"],
  },
  {
    title: "개인정보",
    contents: ["학번", "학과"],
  },
];

const ProfileChange = () => {
  return (
    <div>
      <Header>프로필 설정</Header>
      <div className={styles.ProfileChangePageWrapper}>
        <MyProfileComponent isChangeProfile={true} />
        <div className={styles.DivideSectionThick} />
        {sectionDatas.map((data, index) => (
          <ProfileSection
            key={index}
            sectionData={data}
            isLastSection={index === sectionDatas.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileChange;
