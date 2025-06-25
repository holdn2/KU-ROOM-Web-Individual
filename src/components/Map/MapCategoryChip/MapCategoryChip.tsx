import React from "react";
import styles from "./MapCategoryChip.module.css";
import { CategoryChips } from "../MapData";

interface MapCategoryChip {
  setSelectedCategoryTitle: (value: string) => void;
  setIsTracking: (value: boolean) => void;
}

const MapCategoryChip: React.FC<MapCategoryChip> = ({
  setSelectedCategoryTitle,
  setIsTracking,
}) => {
  const getSelectedLocationArray = (title: string) => {
    setSelectedCategoryTitle(title);
    // console.log(title);
    setIsTracking(false);
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
