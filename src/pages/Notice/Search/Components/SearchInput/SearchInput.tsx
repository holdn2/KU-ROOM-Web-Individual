import React, { forwardRef } from "react";

import searchIcon from "@assets/icon/search.svg";
import closeIcon from "@assets/icon/notice/search/searchremove.svg";

import styles from "./SearchInput.module.css";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, onSearch }, ref) => {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && onSearch) {
        onSearch(value);
      }
    };

    const handleClear = () => {
      onChange("");
    };

    return (
      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <img src={searchIcon} alt="검색" className={styles.searchIcon} />
          <input
            ref={ref}
            type="text"
            placeholder="검색어를 입력하세요"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={handleKeyPress}
            className={styles.searchInput}
          />
          {value.length > 0 && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
              aria-label="검색어 지우기"
            >
              <img src={closeIcon} alt="지우기" />
            </button>
          )}
        </div>
      </div>
    );
  }
);
