import type React from "react";
import { useState, useEffect } from "react";
import Header from "../../../components/Header/Header";
import SearchInput from "./Components/SearchInput";
import SearchHistory from "./Components/SearchHistory";
import TagButtons from "./Components/TagButtons";
import NoticeList from "./Components/NoticeList";
import { getAllNotices } from "../../../services/NoticeService";
import type { NoticeItem } from "../../../services/NoticeService";
import styles from "./Search.module.css";

const Search: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [filteredNotices, setFilteredNotices] = useState<NoticeItem[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    "입학식",
    "수강 신청",
    "장학금",
  ]);

  useEffect(() => {
    // 모든 공지사항 가져오기
    const allNotices = getAllNotices();
    setNotices(allNotices);
    setFilteredNotices(allNotices);
  }, []);

  useEffect(() => {
    // 검색어와 선택된 태그에 따라 공지사항 필터링
    let filtered = notices;

    if (searchText) {
      filtered = filtered.filter((notice) =>
        notice.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (selectedTags.length > 0) {
      filtered = filtered.filter((notice) =>
        selectedTags.includes(notice.category)
      );
    }

    setFilteredNotices(filtered);
  }, [searchText, selectedTags, notices]);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleRemoveSearchTerm = (term: string) => {
    setSearchHistory((prev) => prev.filter((t) => t !== term));
  };

  const handleSearch = (text: string) => {
    setSearchText(text);

    // 검색어가 있고, 엔터 등의 검색 이벤트가 발생했을 때 히스토리에 추가
    if (text && !searchHistory.includes(text)) {
      setSearchHistory((prev) => [text, ...prev].slice(0, 10)); // 최대 10개 유지
    }
  };

  return (
    <div className={styles.container}>
      <Header>검색</Header>

      <SearchInput
        value={searchText}
        onChange={setSearchText}
        onSearch={handleSearch}
      />

      <h2 className={styles.sectionTitle}>최근 검색어</h2>
      <SearchHistory
        searchTerms={searchHistory}
        onRemoveTerm={handleRemoveSearchTerm}
      />

      <h2 className={styles.sectionTitle}>추천 검색어</h2>
      <TagButtons
        tags={[
          "교환학생",
          "장학금",
          "수강신청",
          "수강바구니",
          "다전공",
          "졸업유예",
        ]}
        selectedTags={selectedTags}
        onTagClick={handleTagClick}
      />

      <h2 className={styles.sectionTitle}>인기 공지</h2>
      <NoticeList notices={notices.slice(0, 3)} />

      <h2 className={styles.sectionTitle}>주요 공지</h2>
      <NoticeList notices={notices.slice(5, 8)} />

      {(searchText || selectedTags.length > 0) && (
        <>
          <h2 className={styles.sectionTitle}>검색 결과</h2>
          {filteredNotices.length > 0 ? (
            <NoticeList notices={filteredNotices} />
          ) : (
            <div className={styles.noResults}>검색 결과가 없습니다.</div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
