import React from "react";
import styles from "./TagButtons.module.css";

interface TagButtonsProps {
  tags: string[];
  selectedTags: string[];
  onTagClick: (tag: string) => void;
}

export const TagButtons: React.FC<TagButtonsProps> = ({
  tags,
  selectedTags,
  onTagClick,
}) => {
  return (
    <div className={styles.tagContainer}>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          className={`${styles.tagButton} ${selectedTags.includes(tag) ? styles.selected : ""}`}
          onClick={() => onTagClick(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};
