import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../shared/components/Header/Header";
import SearchInput from "./Components/SearchInput/SearchInput";
import SearchHistory from "./Components/SearchHistory/SearchHistory";
import TagButtons from "./Components/TagButtons/TagButtons";
import SearchNoticeList from "./Components/NoticeList/NoticeList";
import SearchResult from "./Components/SearchResult/SearchResult";
import NotificationBadge from "./Components/NotificationBadge/NotificationBadge";
import { getAllNotices } from "../../../services/NoticeService";
import type { NoticeItem } from "../../../services/NoticeService";
import styles from "./Search.module.css";

const Search: React.FC = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [notices, setNotices] = useState<NoticeItem[]>([]);
  const [filteredNotices, setFilteredNotices] = useState<NoticeItem[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    "입학식",
    "수강 신청",
    "장학금",
  ]);
  const [subscribedKeywords, setSubscribedKeywords] = useState<string[]>([]);
  const [isHistoryEnabled, setIsHistoryEnabled] = useState(true);

  useEffect(() => {
    // 모든 공지사항 가져오기
    const allNotices = getAllNotices();
    setNotices(allNotices);
    setFilteredNotices(allNotices);
  }, []);

  useEffect(() => {
    // 검색어에 따라 공지사항 필터링
    let filtered = notices;

    if (searchText) {
      filtered = filtered.filter((notice) =>
        notice.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredNotices(filtered);
  }, [searchText, notices]);

  const handleTagClick = (tag: string) => {
    setSearchText(tag);

    // 검색 히스토리에 추가
    if (isHistoryEnabled && !searchHistory.includes(tag)) {
      setSearchHistory((prev) => [tag, ...prev].slice(0, 10));
    }
  };

  const handleRemoveSearchTerm = (term: string) => {
    setSearchHistory((prev) => prev.filter((t) => t !== term));
  };

  const handleSelectSearchTerm = (term: string) => {
    // 최근 검색어 태그 클릭 시 검색창에 입력하고 검색 실행
    setSearchText(term);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);

    // 검색어가 있고, 엔터 등의 검색 이벤트가 발생했을 때 히스토리에 추가
    if (text && isHistoryEnabled && !searchHistory.includes(text)) {
      setSearchHistory((prev) => [text, ...prev].slice(0, 10)); // 최대 10개 유지
    }
  };

  const navigateToNoticeDetail = (noticeId: string) => {
    // 검색 결과에서 어떤 카테고리로 이동할지 결정
    const notice = notices.find((n) => n.id === noticeId);
    const category = notice?.category || "학사";
    navigate(`/notice/${category}/${noticeId}`);
  };

  const handleToggleNotification = (keyword: string) => {
    setSubscribedKeywords((prev) => {
      if (prev.includes(keyword)) {
        return prev.filter((k) => k !== keyword);
      }
      return [...prev, keyword];
    });
  };

  const handleToggleHistory = () => {
    setIsHistoryEnabled((prev) => !prev);
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  // 검색어가 있으면 검색 결과만 표시
  const isSearching = searchText.length > 0;

  return (
    <div className={styles.container}>
      <Header>검색</Header>

      <SearchInput
        value={searchText}
        onChange={setSearchText}
        onSearch={handleSearch}
      />

      {!isSearching ? (
        <>
          <SearchHistory
            searchTerms={searchHistory}
            onRemoveTerm={handleRemoveSearchTerm}
            onSelectTerm={handleSelectSearchTerm}
            isHistoryEnabled={isHistoryEnabled}
            onToggleHistory={handleToggleHistory}
            onClearHistory={handleClearHistory}
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
            selectedTags={[]} // 추천 검색어에서는 선택 상태가 없음
            onTagClick={handleTagClick}
          />

          <h2 className={styles.sectionTitle}>인기 공지</h2>
          <SearchNoticeList
            notices={notices.slice(0, 3)}
            onItemClick={(noticeId) => navigateToNoticeDetail(noticeId)}
          />

          <h2 className={styles.sectionTitle}>주요 공지</h2>
          <SearchNoticeList
            notices={notices.slice(5, 8)}
            onItemClick={(noticeId) => navigateToNoticeDetail(noticeId)}
          />
        </>
      ) : (
        <>
          <NotificationBadge
            keyword={searchText}
            isSubscribed={subscribedKeywords.includes(searchText)}
            onToggle={() => handleToggleNotification(searchText)}
          />
          <SearchResult
            filteredNotices={filteredNotices}
            onItemClick={navigateToNoticeDetail}
          />
        </>
      )}
    </div>
  );
};

export default Search;
