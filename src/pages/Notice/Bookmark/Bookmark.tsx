import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import ArrowIcon from "@assets/icon/notice/search/sevrondown.svg";
import Header from "@components/Header/Header";
import BottomBar from "@components/BottomBar/BottomBar";

import type { BookmarkItem } from "../types/noticeTypes";
import { getBookmarks } from "../utils/noticeUtils";
import styles from "./Bookmark.module.css";

const Bookmark: React.FC = () => {
  const navigate = useNavigate();
  const [sortedBookmarks, setSortedBookmarks] = useState<BookmarkItem[]>([]);
  const [sortOrder, setSortOrder] = useState("북마크 등록순");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const sortOptionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedBookmarks = getBookmarks();
    sortAndSetBookmarks(storedBookmarks, sortOrder);
  }, [sortOrder]);

  useEffect(() => {
    // 드롭다운 외부 클릭 시 닫기
    function handleClickOutside(event: MouseEvent) {
      if (
        sortOptionsRef.current &&
        !sortOptionsRef.current.contains(event.target as Node)
      ) {
        setShowSortOptions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sortAndSetBookmarks = (
    bookmarkData: Record<string, BookmarkItem>,
    order: string
  ): void => {
    const bookmarkArray = Object.values(bookmarkData);
    let sorted: BookmarkItem[];

    if (order === "최신순") {
      // 공지사항 날짜 기준 최신순
      sorted = bookmarkArray.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    } else if (order === "오래된 순") {
      // 공지사항 날짜 기준 오래된순
      sorted = bookmarkArray.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    } else if (order === "북마크 등록순") {
      // 북마크 등록 시간(timestamp) 기준
      sorted = bookmarkArray.sort((a, b) => {
        return (
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
      });
    } else if (order === "가나다 순") {
      // 제목 기준 가나다순
      sorted = bookmarkArray.sort((a, b) => {
        return a.title.localeCompare(b.title, "ko");
      });
    } else {
      // 기본값: 북마크 등록순
      sorted = bookmarkArray.sort((a, b) => {
        return (
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
      });
    }

    setSortedBookmarks(sorted);
  };

  const handleGoBack = (): void => {
    navigate(-1);
  };

  const toggleSortOptions = (): void => {
    setShowSortOptions(!showSortOptions);
  };

  const handleSortOptionClick = (option: string): void => {
    setSortOrder(option);
    setShowSortOptions(false);
  };

  const navigateToNoticeDetail = (category: string, id: string): void => {
    navigate(`/notice/${category}/${id}`);
  };

  const handleItemClick = (category: string, id: string): void => {
    navigateToNoticeDetail(category, id);
  };

  return (
    <div className={styles["bookmark-container"]}>
      <div className={styles["header-wrapper"]}>
        <Header>북마크</Header>
        <button
          className={styles["back-button"]}
          onClick={handleGoBack}
          aria-label="뒤로가기"
          type="button"
        />
      </div>

      <div className={styles["sort-order-wrapper"]}>
        <div className={styles["sort-dropdown"]} ref={sortOptionsRef}>
          <button
            className={styles["bookmark-setting"]}
            onClick={toggleSortOptions}
            aria-label={`정렬 방식 변경: 현재 ${sortOrder}`}
            type="button"
          >
            {sortOrder === "북마크 등록순"
              ? "북마크 등록순"
              : sortOrder === "최신순"
                ? "최신순"
                : sortOrder === "오래된 순"
                  ? "오래된 순"
                  : sortOrder === "가나다 순"
                    ? "가나다 순"
                    : "북마크 등록순"}
            <img
              src={ArrowIcon}
              alt="정렬 화살표"
              className={styles["dropdown-arrow"]}
            />
          </button>

          {showSortOptions && (
            <div className={styles["sort-options"]}>
              <button
                className={`${styles["sort-option"]} ${sortOrder === "북마크 등록순" ? styles["active"] : ""}`}
                onClick={() => handleSortOptionClick("북마크 등록순")}
                type="button"
              >
                북마크 등록순
              </button>
              <button
                className={`${styles["sort-option"]} ${sortOrder === "최신순" ? styles["active"] : ""}`}
                onClick={() => handleSortOptionClick("최신순")}
                type="button"
              >
                최신순
              </button>
              <button
                className={`${styles["sort-option"]} ${sortOrder === "오래된 순" ? styles["active"] : ""}`}
                onClick={() => handleSortOptionClick("오래된 순")}
                type="button"
              >
                오래된 순
              </button>
              <button
                className={`${styles["sort-option"]} ${sortOrder === "가나다 순" ? styles["active"] : ""}`}
                onClick={() => handleSortOptionClick("가나다 순")}
                type="button"
              >
                가나다 순
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles["bookmark-content"]}>
        {sortedBookmarks.length > 0 ? (
          <div className={styles["bookmark-list"]}>
            {sortedBookmarks.map((bookmark) => (
              <button
                key={bookmark.id}
                className={styles["bookmark-item"]}
                onClick={() => handleItemClick(bookmark.category, bookmark.id)}
                aria-label={`${bookmark.title}, ${bookmark.date} 공지사항 보기`}
                type="button"
              >
                <div className={styles["bookmark-item-content"]}>
                  <h3 className={styles["bookmark-item-title"]}>
                    {bookmark.title}
                  </h3>
                  <p className={styles["bookmark-item-date"]}>
                    {bookmark.date}
                  </p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className={styles["empty-bookmarks"]}>
            <p>북마크한 공지사항이 없습니다.</p>
          </div>
        )}
      </div>

      <BottomBar />
    </div>
  );
};

export default Bookmark;
