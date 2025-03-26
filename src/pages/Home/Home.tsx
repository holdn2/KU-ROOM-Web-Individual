// 홈 페이지
import BottomBar from "../../components/BottomBar/BottomBar";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header";
import HomeMenu from "../../components/HomeContent/HomeMenu/HomeMenu";
import HomeMiniMap from "../../components/HomeContent/HomeMiniMap/HomeMiniMap";
import HomeSildeBanner from "../../components/HomeContent/HomeSlideBanner/HomeSildeBanner";

const Home = () => {
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
