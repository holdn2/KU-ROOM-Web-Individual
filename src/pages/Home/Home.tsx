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
// import { useNavigate } from "react-router-dom";
import ShareLocationModal from "../../components/Map/ShareLocationModal/ShareLocationModal";
import { isMyLocationInSchool } from "../../utils/mapRangeUtils";
import { Coordinate } from "../../../types/mapTypes";
import { checkIsSharedApi } from "../../apis/map";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  // const [showSplash, setShowSplash] = useState(true);
  const [isSharedLocation, setIsSharedLocation] = useState(false); // 내 위치 공유상태인지 아닌지
  const [hasNewAlarm, setHasNewAlarm] = useState(false); // 새로운 알람이 있는지
  // 공유 상태 확인 트리거 키
  const [locationSharedRefreshKey, setLocationSharedRefreshKey] = useState(0);

  // 학교 내부에 있는지 상태
  const [isInSchool, setIsInSchool] = useState(false);
  // vercel 배포 시 에러 방지용
  console.log("학교 내부인지?:", isInSchool);

  // 유저의 위치와 가장 가까운 위치 저장할 상태
  const [nearLocation, setNearLocation] = useState("");

  // 내 위치 공유 버튼 모달 상태
  const [shareModalState, setShareModalState] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Coordinate | null>(
    null
  ); // 현재 위치

  const [tryToRerender, setTryToRerender] = useState(false);

  // 현재 내 위치 공유 상태 확인 함수
  const getIsMySharedInfo = async () => {
    try {
      const response = await checkIsSharedApi();
      console.log("현재 내 위치 공유 상태 : ", response);
      setIsSharedLocation(response);
    } catch (error) {
      console.error("위치 공유 상태 확인 실패 : ", error);
    }
  };

  useEffect(() => {
    console.log("위치공유 상태는?:", isSharedLocation);
    // 현재 내 위치 공유 상태 확인
    getIsMySharedInfo();
  }, [locationSharedRefreshKey]);
  useEffect(() => {
    // 현재 내 위치가 학교 내부인지 검증
    isMyLocationInSchool(setIsInSchool, setCurrentLocation);
  }, []);
  // **********************************************************************

  // api 기다리는 상태 관리도 추후 추가 예정.
  useEffect(() => {
    // 로그인 여부 확인
    console.log("로그인 여부 확인");
    const token = localStorage.getItem("accessToken");
    if (!token) {
      localStorage.clear();
      navigate("/login");
      return;
    }
    // 서버에 새로운 알람이 있는지 검증. 있다면 true로
    setHasNewAlarm(true);

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
        {currentLocation !== null && (
          <HomeMiniMap
            isSharedLocation={isSharedLocation}
            setModalState={setShareModalState}
            currentLocation={currentLocation}
            nearLocation={nearLocation}
            setNearLocation={setNearLocation}
          />
        )}
        <FriendLocation isSharedLocation={isSharedLocation} />
        <MyLocationRanking updateTrigger={tryToRerender} />
        <HomeNotice />
      </div>
      <BottomBar />
      <ShareLocationModal
        modalState={shareModalState}
        isSharedLocation={isSharedLocation}
        nearLocation={nearLocation}
        setModalState={setShareModalState}
        refreshSharedStatus={() =>
          setLocationSharedRefreshKey((prev) => prev + 1)
        }
        tryRerendering={() => setTryToRerender(!tryToRerender)}
      />
    </div>
  );
};

export default Home;
