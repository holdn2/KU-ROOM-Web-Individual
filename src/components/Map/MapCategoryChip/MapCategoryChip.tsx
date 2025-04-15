import React from "react";
import styles from "./MapCategoryChip.module.css";

// 더미 카테고리 칩
const locationCategory = [
  {
    title: "단과대",
    icon: "",
  },
  {
    title: "상허기념도서관",
    icon: "",
  },
  {
    title: "제1학생회관",
    icon: "",
  },
  {
    title: "K-Cube",
    icon: "",
  },
  {
    title: "K-Hub",
    icon: "",
  },
  {
    title: "편의점",
    icon: "",
  },
];

interface MapCategoryChip {
  setSelectedChip: (value: string) => void;
}

const MapCategoryChip: React.FC<MapCategoryChip> = ({ setSelectedChip }) => {
  return (
    <div className={styles.CategoryChipsWrapper}>
      {locationCategory.map((category, index) => (
        <button
          className={styles.CategoryChip}
          key={index}
          onClick={() => setSelectedChip(category.title)}
        >
          <div className={styles.CategoryChipIcon} />
          <span className={styles.CategoryChipTitle}>{category.title}</span>
        </button>
      ))}
    </div>
  );
};

export default MapCategoryChip;
