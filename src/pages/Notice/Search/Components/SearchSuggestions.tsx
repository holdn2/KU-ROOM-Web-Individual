import type React from "react";
import styles from "./SearchSuggestions.module.css";

interface SearchSuggestionsProps {
  searchText: string;
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
  searchText,
  suggestions,
  onSuggestionClick,
}) => {
  const filteredSuggestions = suggestions.filter((suggestion) =>
    suggestion.toLowerCase().includes(searchText.toLowerCase())
  );

  if (filteredSuggestions.length === 0 || !searchText) {
    return null;
  }

  return (
    <div className={styles.suggestionsContainer}>
      {filteredSuggestions.map((suggestion, index) => (
        <div
          key={index}
          className={styles.suggestionItem}
          onClick={() => onSuggestionClick(suggestion)}
        >
          <div className={styles.suggestionText}>{suggestion}</div>
          <div className={styles.arrowIcon}>↗</div>
        </div>
      ))}
    </div>
  );
};

export default SearchSuggestions;
