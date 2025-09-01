// 마이페이지
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { reissueTokenApi } from "@apis/axiosInstance";
import BottomBar from "@components/BottomBar/BottomBar";
import Header from "@components/Header/Header";
import PullToRefresh from "@components/PullToRefresh/PullToRefresh";
import { MyPageSectionData } from "@constant/sectionDatas";

import ProfileSection from "../components/ProfileSection/ProfileSection";
import ProfileModal from "./components/ProfileModal/ProfileModal";
import MyProfileComponent from "../components/MyProfileComponent/MyProfileComponent";
import styles from "./MyPage.module.css";

const MyPage = () => {
  const navigate = useNavigate();
  // const [isLoading, setIsLoading] = useState(true);
  const [modalState, setModalState] = useState(false);
  const [modalType, setModalType] = useState("");
  const [isRefreshed, setIsRefreshed] = useState(0);

  const pageRefresh = async () => {
    try {
      await reissueTokenApi();
      setIsRefreshed((prev) => prev + 1);
    } catch (error) {
      console.error("토큰 재발급 실패 : ", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    console.log("페이지 리프레쉬");
  }, [isRefreshed]);

  useEffect(() => {
    // 로그인 여부 확인
    // getNewToken();
    // Access Token 재발급된 것이 반영되기 전 아래 로직이 실행되지 않도록 여유를 줌
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
      <PullToRefresh onRefresh={pageRefresh} maxDistance={80}>
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
