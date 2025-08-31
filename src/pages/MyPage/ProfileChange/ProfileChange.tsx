import Header from "../../../shared/components/Header/Header";
import MyProfileComponent from "../../../components/MyProfile/MyProfileComponent";
import ProfileSection from "../../../components/MyProfile/ProfileSection";
import styles from "./ProfileChange.module.css";
import { ProfileChangeSectionData } from "../../../shared/constant/sectionDatas";

const ProfileChange = () => {
  return (
    <div>
      <Header>프로필 설정</Header>
      <div className={styles.ProfileChangePageWrapper}>
        <MyProfileComponent isChangeProfile={true} />
        <div className={styles.DivideSectionThick} />
        {ProfileChangeSectionData.map((data, index) => (
          <ProfileSection
            key={index}
            sectionData={data}
            isLastSection={index === ProfileChangeSectionData.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileChange;
