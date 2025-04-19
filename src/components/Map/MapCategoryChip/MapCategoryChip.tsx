import React from "react";
import styles from "./MapCategoryChip.module.css";
import { CategoryChips } from "../MapData";

interface MapCategoryChip {
  setMapSearchResult: (value: string) => void;
}

const MapCategoryChip: React.FC<MapCategoryChip> = ({ setMapSearchResult }) => {
  // 버튼 클릭 시 해당하는 위치 배열을 서버에 요청하여 받아야함.
  const getSelectedLocationArray = (title: string) => {
    // title을 이용하여 요청
    setMapSearchResult(title);
  };

  return (
    <div className={styles.CategoryChipsWrapper}>
      {CategoryChips.map((category, index) => (
        <button
          className={styles.CategoryChip}
          key={index}
          onClick={() => getSelectedLocationArray(category.title)}
          style={
            category.title === "친구"
              ? { border: "1px solid #009733" }
              : undefined
          }
        >
          <img src={category.icon} alt="칩 아이콘" />
          <span className={styles.CategoryChipTitle}>{category.title}</span>
        </button>
      ))}
    </div>
  );
};

export default MapCategoryChip;
