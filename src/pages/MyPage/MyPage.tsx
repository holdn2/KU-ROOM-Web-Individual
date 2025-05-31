// 마이페이지
import styles from "./MyPage.module.css";
import BottomBar from "../../components/BottomBar/BottomBar";
import Header from "../../components/Header/Header";
import MyProfileComponent from "../../components/MyProfile/MyProfileComponent";
import ProfileSection from "../../components/MyProfile/ProfileSection";
import { MyPageSectionData } from "../../constants/sectionDatas";
import { useEffect, useState } from "react";
import ProfileModal from "../../components/MyProfile/ProfileModal/ProfileModal";
import { useNavigate } from "react-router-dom";
import { reissueTokenApi } from "../../apis/axiosInstance";
import PullToRefresh from "../../components/PullToRefresh/PullToRefresh";

const MyPage = () => {
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(true);
  const [modalState, setModalState] = useState(false);
  const [modalType, setModalType] = useState("");

  const getNewToken = async () => {
    try {
      await reissueTokenApi();
    } catch (error) {
      console.error("토큰 재발급 실패 : ", error);
    }
  };

  useEffect(() => {
    // 로그인 여부 확인
    getNewToken();
    const timeout = setTimeout(() => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        localStorage.clear();
        navigate("/login");
        return;
      }
    }, 1000);
    return () => clearTimeout(timeout);
    // 여기에 실제 API 로딩 or 이미지 로딩 조건으로 변경 가능
    // const timeout = setTimeout(() => {
    //   setIsLoading(false);
    // }, 1000); // 1초 로딩 시뮬레이션

    // return () => clearTimeout(timeout);
  }, []);

  // if (isLoading) {
  //   return (
  //     <div className={styles.MyPageLoadingWrapper}>
  //       <BeatLoader color="#009733" size={18} margin={4} />
  //     </div>
  //   );
  // }

  return (
    <div>
      <Header>마이페이지</Header>
      <PullToRefresh onRefresh={getNewToken} maxDistance={80}>
        <div className={styles.MyPageContentWrapper}>
          <MyProfileComponent isChangeProfile={false} />
          <div className={styles.DivideSectionThick} />
          {MyPageSectionData.map((data, index) => (
            <ProfileSection
              key={index}
              sectionData={data}
              isLastSection={index === MyPageSectionData.length - 1}
              setModalType={setModalType}
              setModalState={setModalState}
            />
          ))}
        </div>
      </PullToRefresh>

      <BottomBar />
      <ProfileModal
        modalState={modalState}
        modalType={modalType}
        setModalState={setModalState}
      />
    </div>
  );
};

export default MyPage;
