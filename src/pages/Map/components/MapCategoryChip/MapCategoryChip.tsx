import React from "react";

import { CategoryEnum } from "@/shared/types";

import styles from "./MapCategoryChip.module.css";
import { CategoryChips } from "../../constant/MapData";

const getCategoryEnum = (title: string): CategoryEnum | undefined => {
  switch (title) {
    case "친구":
      return "FRIEND";
    case "건물":
      return "BUILDING";
    case "단과대":
      return "COLLEGE";
    case "K-Cube":
      return "K_CUBE";
    case "K-Hub":
      return "K_HUB";
    case "편의점":
      return "CONVENIENCE_STORE";
    case "레스티오":
      return "CAFE_RESTIO";
    case "1847":
      return "CAFE_1847";
    case "학생식당":
      return "STUDENT_CAFETERIA";
    case "기숙사":
      return "DORMITORY";
    case "은행":
      return "BANK";
    case "우체국":
      return "POST_OFFICE";
    default:
      return;
  }
};

interface MapCategoryChip {
  setSelectedCategoryTitle: (value: string) => void;
  setSelectedCategoryEnum: (value: string) => void;
  setIsTracking: (value: boolean) => void;
}

const MapCategoryChip: React.FC<MapCategoryChip> = ({
  setSelectedCategoryTitle,
  setSelectedCategoryEnum,
  setIsTracking,
}) => {
  const getSelectedLocationArray = (title: string) => {
    setSelectedCategoryTitle(title);
    const name = getCategoryEnum(title);
    if (!name) {
      return console.error("잘못된 칩 클릭");
    }
    setSelectedCategoryEnum(name);
    console.log(title);
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
