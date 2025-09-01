import React from "react";

import noResultIcon from "@assets/icon/noResultSearch.svg";

import styles from "./SearchDepartmentList.module.css";

interface SearchDepartmentListProps {
  trySearch: boolean;
  searchTarget: string;
  filteredDepartment: { department: string; college: string }[];
  handleAddUserDepartment: (value: string) => void;
}

const SearchDepartmentList: React.FC<SearchDepartmentListProps> = ({
  trySearch,
  searchTarget,
  filteredDepartment,
  handleAddUserDepartment,
}) => {
  return (
    <>
      {trySearch &&
        (filteredDepartment.length > 0
          ? filteredDepartment.map((item, index) => (
              <div
                key={index}
                className={styles.SearchedDepartmentContainer}
                onClick={() => handleAddUserDepartment(item.department)}
              >
                <div className={styles.DepartmentInfoWrapper}>
                  <span className={styles.DepartmentTitle}>
                    {item.department}
                  </span>
                  <span className={styles.CollegeTitle}>{item.college}</span>
                </div>
              </div>
            ))
          : searchTarget && (
              <div className={styles.NoSearchResultWrapper}>
                <img
                  className={styles.NoSearchResultIcon}
                  src={noResultIcon}
                  alt="검색 결과 없음"
                />
                <span className={styles.NoSearchResultText}>
                  검색 결과가 없어요!
                </span>
              </div>
            ))}
    </>
  );
};

export default SearchDepartmentList;
