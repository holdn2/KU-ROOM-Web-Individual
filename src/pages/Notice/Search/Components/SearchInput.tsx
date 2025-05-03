import type React from "react";
import { forwardRef } from "react";
import styles from "./SearchInput.module.css";
import searchIcon from "../../../../assets/icon/search.svg";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, onSearch }, ref) => {
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && onSearch) {
        onSearch(value);
      }
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
        </div>
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export default SearchInput;
