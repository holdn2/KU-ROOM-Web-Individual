import styles from "./HomeMenu.module.css";
import searchLocationIcon from "../../../assets/homemenuicon/homeicon_search_location.svg";
import plusFriendIcon from "../../../assets/homemenuicon/homeicon_plus_friend.svg";
import kcubeIcon from "../../../assets/homemenuicon/homeicon_kcube_reserve.svg";
import readingRoomIcon from "../../../assets/homemenuicon/homeicon_readingroom.svg";

const HomeMenu = () => {
  const navToSearchLocation = () => {
    console.log("장소 검색으로");
  };
  const navToPlusFriend = () => {
    console.log("친구 추가로");
  };
  const navToKcubeReserve = () => {
    console.log("케이큐브 예약으로");
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
        <img
          className={styles.MenuIcon}
          src={searchLocationIcon}
          alt="장소 검색"
        />
        <span className={styles.EachMenuText}>장소 검색</span>
      </button>
      <button className={styles.EachMenuContainer} onClick={navToPlusFriend}>
        <img className={styles.MenuIcon} src={plusFriendIcon} alt="친구 추가" />
        <span className={styles.EachMenuText}>친구 추가</span>
      </button>
      <button className={styles.EachMenuContainer} onClick={navToKcubeReserve}>
        <img className={styles.MenuIcon} src={kcubeIcon} alt="케이큐브 예약" />
        <span className={styles.EachMenuText}>케이큐브 예약</span>
      </button>
      <button className={styles.EachMenuContainer} onClick={navToReadingRoom}>
        <img
          className={styles.MenuIcon}
          src={readingRoomIcon}
          alt="열람실 좌석현황"
        />
        <span className={styles.EachMenuText}>열람실 좌석현황</span>
      </button>
    </div>
  );
};

export default HomeMenu;
