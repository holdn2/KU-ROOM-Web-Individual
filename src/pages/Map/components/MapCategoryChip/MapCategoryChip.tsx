import React from "react";

import { CategoryChips } from "@pages/Map/constant/MapData";

import styles from "./MapCategoryChip.module.css";

interface MapCategoryChip {
  handleSelectCategoryChip: (title: string) => void;
}

const MapCategoryChip: React.FC<MapCategoryChip> = ({
  handleSelectCategoryChip,
}) => {
  return (
    <div className={styles.CategoryChipsWrapper}>
      {CategoryChips.map((category, index) => (
        <button
          className={styles.CategoryChip}
          key={index}
          onClick={() => handleSelectCategoryChip(category.title)}
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
