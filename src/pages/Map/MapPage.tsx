// 지도 페이지
import { useEffect, useState } from "react";
import BottomBar from "../../components/BottomBar/BottomBar";
import styles from "./MapPage.module.css";
import myTrackingIcon from "../../assets/map/tomylocation.svg";
import MapSearchBar from "../../components/Map/MapSearchBar/MapSearchBar";
import MapCategoryChip from "../../components/Map/MapCategoryChip/MapCategoryChip";
import KuroomMap from "../../components/Map/KuroomMap";
import { useLocation, useNavigate } from "react-router-dom";

const MapPage = () => {
  const navigate = useNavigate();
  const loc = useLocation();
  const [isTracking, setIsTracking] = useState(true); // 내 현재 위치를 따라가는지 상태
  const [selectedChip, setSelectedChip] = useState("");

  useEffect(() => {
    if (selectedChip) console.log(selectedChip, " 선택");
  }, [selectedChip]);

  useEffect(() => {
    if (loc.state?.searchLocation) {
      console.log(loc.state.searchLocation, " 으로 이동하기");
    }
  }, []);
  return (
    <div>
      <button
        className={styles.SearchBarContainer}
        onClick={() => navigate("/mapsearch")}
      >
        {/* 이부분은 그냥 누르면 검색 화면으로 이동하도록 버튼형식 */}
        <MapSearchBar />
      </button>
      <MapCategoryChip setSelectedChip={setSelectedChip} />
      <KuroomMap
        height="calc(100vh - 92px)"
        isTracking={isTracking}
        setIsTracking={setIsTracking}
      />
      <button
        className={styles.TrackingIcon}
        onClick={() => setIsTracking(true)}
      >
        <img
          src={myTrackingIcon}
          alt="위치 추적 아이콘"
          style={{ filter: isTracking ? "none" : "grayscale(100%)" }}
        />
      </button>
      <BottomBar />
    </div>
  );
};

export default MapPage;
