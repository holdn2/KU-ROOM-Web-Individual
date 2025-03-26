// 마이페이지
import styles from "./MyPage.module.css";
import BottomBar from "../../components/BottomBar/BottomBar";
import Header from "../../components/Header/Header";
import MyProfileComponent from "../../components/MyProfile/MyProfileComponent";
import ProfileSection from "../../components/MyProfile/ProfileSection";
import { MyPageSectionData } from "../../constants/sectionDatas";

const MyPage = () => {
  return (
    <div>
      <Header>마이페이지</Header>
      <div className={styles.MyPageContentWrapper}>
        <MyProfileComponent isChangeProfile={false} />
        <div className={styles.DivideSectionThick} />
        {MyPageSectionData.map((data, index) => (
          <ProfileSection
            key={index}
            sectionData={data}
            isLastSection={index === MyPageSectionData.length - 1}
          />
        ))}
      </div>
      <BottomBar />
    </div>
  );
};

export default MyPage;
