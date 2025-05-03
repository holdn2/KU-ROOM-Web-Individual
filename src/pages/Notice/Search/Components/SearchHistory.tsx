import type React from "react";
import SearchTag from "./SearchTag";
import styles from "./SearchHistory.module.css";

interface SearchHistoryProps {
  searchTerms: string[];
  onRemoveTerm: (term: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  searchTerms,
  onRemoveTerm,
}) => {
  return (
    <div className={styles.searchHistory}>
      <div className={styles.tagContainer}>
        {searchTerms.map((term) => (
          <SearchTag
            key={term}
            text={term}
            onRemove={() => onRemoveTerm(term)}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
