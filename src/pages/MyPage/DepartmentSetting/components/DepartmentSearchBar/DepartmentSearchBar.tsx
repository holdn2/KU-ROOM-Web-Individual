import React, { useRef } from "react";

import searchIcon from "@assets/icon/search.svg";
import deleteIcon from "@assets/icon/deleteIcon.svg";

import styles from "./DepartmentSearchBar.module.css";

interface DepartmentSearchProps {
  searchTarget: string;
  setSearchTarget: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const DepartmentSearch: React.FC<DepartmentSearchProps> = ({
  searchTarget,
  setSearchTarget,
  onFocus,
  onBlur,
  onKeyDown,
}) => {
  const inputFocus = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTarget(e.target.value);
  };

  const deleteText = () => {
    setSearchTarget("");
    inputFocus.current?.focus(); // 삭제 후 포커스 유지
  };

  return (
    <div className={styles.SearchBarContainer}>
      <div className={styles.SearchWrapper}>
        <img className={styles.SearchIcon} src={searchIcon} alt="검색 아이콘" />
        <input
          ref={inputFocus}
          className={styles.SearchBar}
          type="search"
          enterKeyHint="search"
          value={searchTarget}
          onChange={handleChange}
          placeholder="추가할 학과명을 입력해주세요"
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onTouchStart={() => {
            inputFocus.current?.focus();
          }}
        />
      </div>
      {searchTarget && (
        <img
          className={styles.DeleteIcon}
          src={deleteIcon}
          alt="검색 삭제"
          onClick={deleteText}
          onMouseDown={(e) => e.preventDefault()} // 포커스 유지
        />
      )}
    </div>
  );
};

export default DepartmentSearch;
