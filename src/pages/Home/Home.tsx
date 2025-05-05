// 홈 페이지
import BottomBar from "../../components/BottomBar/BottomBar";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header";
import HomeMenu from "../../components/HomeContent/HomeMenu/HomeMenu";
import HomeMiniMap from "../../components/HomeContent/HomeMiniMap/HomeMiniMap";
import HomeSildeBanner from "../../components/HomeContent/HomeSlideBanner/HomeSildeBanner";
import { useEffect, useState } from "react";
import Splash from "../../components/Splash";
import FriendLocation from "../../components/HomeContent/FriendLocation/FriendLocation";
import MyLocationRanking from "../../components/HomeContent/MyLocationRanking/MyLocationRanking";
import HomeNotice from "../../components/HomeContent/HomeNotice/HomeNotice";

const isInSchool = true; // 학교 내부인지 외부인지

const Home = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isSharedLocation, setIsSharedLocation] = useState(false); // 내 위치 공유상태인지 아닌지
  const [hasNewAlarm, setHasNewAlarm] = useState(false); // 새로운 알람이 있는지

  // api 기다리는 상태 관리도 추후 추가 예정.
  useEffect(() => {
    // 서버에 새로운 알람이 있는지 검증. 있다면 true로
    setHasNewAlarm(true);

    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 2000); // 1.5초 후에 splash 화면 종료

    return () => clearTimeout(timeout);
  }, []);
  if (showSplash) {
    return <Splash />;
  }

  return (
    <div>
      <Header hasNewAlarm={hasNewAlarm}>홈</Header>
      <div className={styles.HomeContentWrapper}>
        <HomeSildeBanner />
        <HomeMenu />
        {isInSchool && (
          <HomeMiniMap
            isSharedLocation={isSharedLocation}
            setIsSharedLocation={setIsSharedLocation}
          />
        )}
        <FriendLocation isSharedLocation={isSharedLocation} />
        <MyLocationRanking />
        <HomeNotice />
      </div>
      <BottomBar />
    </div>
  );
};

export default Home;
