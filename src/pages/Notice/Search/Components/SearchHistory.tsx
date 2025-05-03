import type React from "react";
import SearchTag from "./SearchTag";
import styles from "./SearchHistory.module.css";

interface SearchHistoryProps {
  searchTerms: string[];
  onRemoveTerm: (term: string) => void;
  onSelectTerm: (term: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  searchTerms,
  onRemoveTerm,
  onSelectTerm,
}) => {
  return (
    <div className={styles.searchHistory}>
      <div className={styles.tagContainer}>
        {searchTerms.map((term) => (
          <button
            key={term}
            type="button"
            onClick={() => onSelectTerm(term)}
            className={styles.searchButton}
          >
            <SearchTag text={term} onRemove={() => onRemoveTerm(term)} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
