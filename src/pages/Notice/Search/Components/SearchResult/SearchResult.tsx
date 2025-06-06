import type React from "react";
import styles from "./SearchResult.module.css";
import type { NoticeItem } from "../../../../../services/NoticeService";
import NoticeList from "../../../Notice/NoticeList/NoticeList";
import searchresultIcon from "../../../../../assets/icon/notice/search/searchresult.svg";

interface SearchResultProps {
  filteredNotices: NoticeItem[];
  onItemClick: (noticeId: string) => void;
}

const SearchResult: React.FC<SearchResultProps> = ({
  filteredNotices,
  onItemClick,
}) => {
  if (filteredNotices.length === 0) {
    return (
      <div className={styles.noResultContainer}>
        <img src={searchresultIcon} alt="검색" className={styles.searchIcon} />
        <div className={styles.noResultText}>검색 결과가 없어요!</div>
      </div>
    );
  }

  return (
    <div className={styles.searchResult}>
      <NoticeList notices={filteredNotices} onItemClick={onItemClick} />
    </div>
  );
};

export default SearchResult;
