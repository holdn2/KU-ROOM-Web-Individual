// 홈 페이지
import BottomBar from "../../components/BottomBar/BottomBar";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header";
import HomeMenu from "../../components/HomeContent/HomeMenu/HomeMenu";
import HomeMiniMap from "../../components/HomeContent/HomeMiniMap/HomeMiniMap";
import HomeSildeBanner from "../../components/HomeContent/HomeSlideBanner/HomeSildeBanner";
import { useEffect, useState } from "react";
import Splash from "../../components/Splash";

const Home = () => {
  const [showSplash, setShowSplash] = useState(true);

  // api 기다리는 상태 관리도 추후 추가 예정.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 1500); // 1.5초 후에 splash 화면 종료

    return () => clearTimeout(timeout);
  }, []);
  if (showSplash) {
    return <Splash />;
  }
  return (
    <div>
      <Header>홈</Header>
      <div className={styles.HomeContentWrapper}>
        <HomeSildeBanner />
        <HomeMenu />
        <HomeMiniMap />
      </div>
      <BottomBar />
    </div>
  );
};

export default Home;
