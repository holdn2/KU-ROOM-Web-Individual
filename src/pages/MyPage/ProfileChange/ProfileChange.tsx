import Header from "@components/Header/Header";
import { ProfileChangeSectionData } from "@constant/sectionDatas";

import MyProfileComponent from "../components/MyProfileComponent/MyProfileComponent";
import ProfileSection from "../components/ProfileSection/ProfileSection";
import styles from "./ProfileChange.module.css";

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
