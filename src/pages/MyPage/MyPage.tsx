// 마이페이지
import styles from "./MyPage.module.css";
import BottomBar from "../../components/BottomBar/BottomBar";
import Header from "../../components/Header/Header";
import MyProfileComponent from "../../components/MyProfile/MyProfileComponent";
import ProfileSection from "../../components/MyProfile/ProfileSection";

const sectionDatas: { title: string; contents: string[] }[] = [
  {
    title: "친구",
    contents: ["친구 추가", "친구 목록"],
  },
  {
    title: "앱 정보",
    contents: ["약관 및 정책", "앱 배포", "고객 센터"],
  },
  {
    title: "설정",
    contents: ["알림 설정", "로그아웃", "탈퇴하기"],
  },
];

const MyPage = () => {
  return (
    <div>
      <Header>마이페이지</Header>
      <div className={styles.MyPageContentWrapper}>
        <MyProfileComponent isChangeProfile={false} />
        <div className={styles.DivideSectionThick} />
        <div className={styles.ScrollableSection}>
          {sectionDatas.map((data, index) => (
            <ProfileSection
              key={index}
              sectionData={data}
              isLastSection={index === sectionDatas.length - 1}
            />
          ))}
        </div>
      </div>
      <BottomBar />
    </div>
  );
};

export default MyPage;
