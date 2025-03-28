// 마이페이지
import styles from "./MyPage.module.css";
import BottomBar from "../../components/BottomBar/BottomBar";
import Header from "../../components/Header/Header";
import MyProfileComponent from "../../components/MyProfile/MyProfileComponent";
import ProfileSection from "../../components/MyProfile/ProfileSection";
import { MyPageSectionData } from "../../constants/sectionDatas";
import { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";

const MyPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ✅ 여기에 실제 API 로딩 or 이미지 로딩 조건으로 변경 가능
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // 1초 로딩 시뮬레이션

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <div className={styles.MyPageLoadingWrapper}>
        <BeatLoader color="#009733" size={18} margin={4} />
      </div>
    );
  }

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
