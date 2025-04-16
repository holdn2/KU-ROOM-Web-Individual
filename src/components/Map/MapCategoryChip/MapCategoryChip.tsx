import React, { useEffect } from "react";
import styles from "./MapCategoryChip.module.css";
import { CategoryChips, KuroomMarkers } from "../MapData";

interface MarkerData {
  lat: number;
  lng: number;
  title: string;
}
interface MapCategoryChip {
  mapSearchResult: string;
  setMapSearchResult: (value: string) => void;
  setMarkers: (value: MarkerData[]) => void;
}

const MapCategoryChip: React.FC<MapCategoryChip> = ({
  mapSearchResult,
  setMapSearchResult,
  setMarkers,
}) => {
  // 버튼 클릭 시 해당하는 위치 배열을 서버에 요청하여 받아야함.
  const getSelectedLocationArray = (title: string) => {
    // title을 이용하여 요청
    setMapSearchResult(title);
  };

  // 요청의 응답값을 markers배열에 저장. 이부분은 테스트용 로직
  useEffect(() => {
    if (!mapSearchResult) {
      setMarkers([]);
      return;
    }

    const categoryMatch = KuroomMarkers.find(
      (item) => item.category === mapSearchResult
    );

    if (categoryMatch) {
      setMarkers(categoryMatch.markers);
    } else {
      setMarkers([]); // 해당 카테고리 없으면 빈 배열로
    }
  }, [mapSearchResult]);

  return (
    <div className={styles.CategoryChipsWrapper}>
      {CategoryChips.map((category, index) => (
        <button
          className={styles.CategoryChip}
          key={index}
          onClick={() => getSelectedLocationArray(category.title)}
        >
          <div className={styles.CategoryChipIcon} />
          <span className={styles.CategoryChipTitle}>{category.title}</span>
        </button>
      ))}
    </div>
  );
};

export default MapCategoryChip;
