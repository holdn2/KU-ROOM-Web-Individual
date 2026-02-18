// 홈 페이지
import { useEffect, useState } from "react";

import { checkIsSharedApi } from "@apis/map";
import BottomBar from "@components/BottomBar/BottomBar";
import Header from "@components/Header/Header";
import ShareLocationModal from "@components/ShareLocationModal/ShareLocationModal";

import HomeMenu from "./components/HomeMenu/HomeMenu";
import HomeMiniMap from "./components/HomeMiniMap/HomeMiniMap";
import HomeSildeBanner from "./components/HomeSlideBanner/HomeSildeBanner";
import FriendLocation from "./components/FriendLocation/FriendLocation";
import MyLocationRanking from "./components/MyLocationRanking/MyLocationRanking";
import HomeNotice from "./components/HomeNotice/HomeNotice";
import styles from "./Home.module.css";
import { useUnreadAlarm } from "../Alarm/hooks/use-unread-alarm";

const Home = () => {
  const { unreadAlarmData } = useUnreadAlarm();
  const [isSharedLocation, setIsSharedLocation] = useState(false); // 내 위치 공유상태인지 아닌지
  const [sharedLocationName, setSharedLocationName] = useState<string | null>(
    null,
  );
  // 공유 상태 확인 트리거 키
  const [locationSharedRefreshKey, setLocationSharedRefreshKey] = useState(0);

  // 내 위치 공유 버튼 모달 상태
  const [shareModalState, setShareModalState] = useState(false);

  const [tryToRerender, setTryToRerender] = useState(false);

  // 현재 내 위치 공유 상태 확인 함수
  const getIsMySharedInfo = async () => {
    try {
      const response = await checkIsSharedApi();
      console.log("현재 내 위치 공유 상태 : ", response);
      setIsSharedLocation(response.isActive);
      setSharedLocationName(response.placeName);
    } catch (error) {
      console.error("위치 공유 상태 확인 실패 : ", error);
    }
  };

  useEffect(() => {
    getIsMySharedInfo();
  }, [locationSharedRefreshKey, isSharedLocation]);

  return (
    <div>
      <Header
        hasUnread={unreadAlarmData?.hasUnread}
        unreadCount={unreadAlarmData?.count}
      >
        홈
      </Header>
      <div className={styles.HomeContentWrapper}>
        <HomeSildeBanner />
        <HomeMenu />
        <HomeMiniMap
          isSharedLocation={isSharedLocation}
          setModalState={setShareModalState}
          sharedLocationName={sharedLocationName}
        />
        <FriendLocation userSharedLocation={sharedLocationName} />
        <MyLocationRanking updateTrigger={tryToRerender} />
        <HomeNotice />
      </div>
      <BottomBar />
      <ShareLocationModal
        modalState={shareModalState}
        isSharedLocation={isSharedLocation}
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
