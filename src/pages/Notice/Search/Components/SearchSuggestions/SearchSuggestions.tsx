import React from "react";

import styles from "./SearchSuggestions.module.css";

interface SearchSuggestionsProps {
  searchText: string;
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

export const SearchSuggestions: React.FC<SearchSuggestionsProps> = ({
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
      {filteredSuggestions.map((suggestion) => (
        <button
          key={suggestion}
          type="button"
          className={styles.suggestionItem}
          onClick={() => onSuggestionClick(suggestion)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              onSuggestionClick(suggestion);
            }
          }}
        >
          <div className={styles.suggestionText}>{suggestion}</div>
          <div className={styles.arrowIcon}>↗</div>
        </button>
      ))}
    </div>
  );
};
