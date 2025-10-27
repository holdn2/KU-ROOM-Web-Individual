import { useNavigate } from "react-router-dom";

import searchLocationIcon from "@assets/homemenuicon/homeicon_search_location.png";
import plusFriendIcon from "@assets/homemenuicon/homeicon_plus_friend.png";
import kcubeIcon from "@assets/homemenuicon/homeicon_kcube_reserve.png";
import readingRoomIcon from "@assets/homemenuicon/homeicon_readingroom.png";

import styles from "./HomeMenu.module.css";

const HomeMenu = () => {
  const navigate = useNavigate();

  const navToSearchLocation = () => {
    navigate("/map", { state: { isSearchMode: true } });
  };
  const navToPlusFriend = () => {
    navigate("/friendadd");
  };
  const navToKcubeReserve = () => {
    window.open(
      "https://wein.konkuk.ac.kr/ptfol/cmnt/cube/findCubeResveStep1.do",
      "_blank"
    );
  };
  const navToReadingRoom = () => {
    console.log("열람실 좌석 현황으로");
  };
  return (
    <div className={styles.HomeMenuWrapper}>
      <button
        className={styles.EachMenuContainer}
        onClick={navToSearchLocation}
      >
        <div className={styles.InnerContent}>
          <img
            className={styles.MenuIcon}
            src={searchLocationIcon}
            alt="장소 검색"
            draggable="false"
          />
          <span className={styles.EachMenuText}>장소 검색</span>
        </div>
      </button>
      <button className={styles.EachMenuContainer} onClick={navToPlusFriend}>
        <div className={styles.InnerContent}>
          <img
            className={styles.MenuIcon}
            src={plusFriendIcon}
            alt="친구 추가"
            draggable="false"
          />

          <span className={styles.EachMenuText}>친구 추가</span>
        </div>
      </button>
      <button className={styles.EachMenuContainer} onClick={navToKcubeReserve}>
        <div className={styles.InnerContent}>
          <img
            className={styles.MenuIcon}
            src={kcubeIcon}
            alt="케이큐브 예약"
            draggable="false"
          />
          <span className={styles.EachMenuText}>케이큐브 예약</span>
        </div>
      </button>
      <button className={styles.EachMenuContainer} onClick={navToReadingRoom}>
        <div className={styles.InnerContent}>
          <img
            className={styles.MenuIcon}
            src={readingRoomIcon}
            alt="열람실 좌석현황"
            draggable="false"
          />
          <span className={styles.EachMenuText}>열람실 좌석현황</span>
        </div>
      </button>
    </div>
  );
};

export default HomeMenu;
