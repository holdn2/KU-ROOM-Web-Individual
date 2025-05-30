// 홈 페이지
import BottomBar from "../../components/BottomBar/BottomBar";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header";
import HomeMenu from "../../components/HomeContent/HomeMenu/HomeMenu";
import HomeMiniMap from "../../components/HomeContent/HomeMiniMap/HomeMiniMap";
import HomeSildeBanner from "../../components/HomeContent/HomeSlideBanner/HomeSildeBanner";
import { useEffect, useState } from "react";
// import Splash from "../../components/Splash";
import FriendLocation from "../../components/HomeContent/FriendLocation/FriendLocation";
import MyLocationRanking from "../../components/HomeContent/MyLocationRanking/MyLocationRanking";
import HomeNotice from "../../components/HomeContent/HomeNotice/HomeNotice";
import { useNavigate } from "react-router-dom";
import ShareLocationModal from "../../components/Map/ShareLocationModal/ShareLocationModal";
import { isMyLocationInSchool } from "../../utils/mapRangeUtils";

interface LocationData {
  userLat: number;
  userLng: number;
}

const Home = () => {
  const navigate = useNavigate();
  // const [showSplash, setShowSplash] = useState(true);
  const [isSharedLocation, setIsSharedLocation] = useState(false); // 내 위치 공유상태인지 아닌지
  const [hasNewAlarm, setHasNewAlarm] = useState(false); // 새로운 알람이 있는지

  // 학교 내부에 있는지 상태
  const [isInSchool, setIsInSchool] = useState(false);
  // vercel 배포 시 에러 방지용
  console.log(isInSchool);

  // 내 위치 공유 버튼 모달 상태
  const [shareModalState, setShareModalState] = useState(false);
  const [currenLocation, setCurrentLocation] = useState<LocationData | null>(
    null
  ); // 현재 위치

  // api 기다리는 상태 관리도 추후 추가 예정.
  useEffect(() => {
    // 로그인 여부 확인
    const token = localStorage.getItem("accessToken");
    if (!token) {
      localStorage.clear();
      navigate("/login");
      return;
    }
    // 서버에 새로운 알람이 있는지 검증. 있다면 true로
    setHasNewAlarm(true);

    // 현재 위치가 학교 내부 인지 검증. 위치도 함께 저장
    // 서버에서 현재 공유 상태도 받아와야 함.
    isMyLocationInSchool(setIsInSchool, setCurrentLocation);
    // setIsSharedLocation()

    // const timeout = setTimeout(() => {
    //   setShowSplash(false);
    // }, 2000); // 1.5초 후에 splash 화면 종료

    // return () => clearTimeout(timeout);
  }, []);
  // if (showSplash) {
  //   return <Splash />;
  // }

  return (
    <div>
      <Header hasNewAlarm={hasNewAlarm}>홈</Header>
      <div className={styles.HomeContentWrapper}>
        <HomeSildeBanner />
        <HomeMenu />
        {/* {isInSchool && (
          <HomeMiniMap
            isSharedLocation={isSharedLocation}
            setModalState={setShareModalState}
          />
        )} */}
        <HomeMiniMap
          isSharedLocation={isSharedLocation}
          setModalState={setShareModalState}
        />
        <FriendLocation isSharedLocation={isSharedLocation} />
        <MyLocationRanking />
        <HomeNotice />
      </div>
      <BottomBar />
      <ShareLocationModal
        modalState={shareModalState}
        isSharedLocation={isSharedLocation}
        currentLocation={currenLocation}
        setModalState={setShareModalState}
        setIsSharedLocation={setIsSharedLocation}
      />
    </div>
  );
};

export default Home;
