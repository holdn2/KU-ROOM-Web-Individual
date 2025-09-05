import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import ArrowIcon from "@assets/icon/notice/search/sevrondown.svg";
import Header from "@components/Header/Header";
import BottomBar from "@components/BottomBar/BottomBar";

import type { BookmarkItem } from "../types/noticeTypes";
import { getBookmarks as getBookmarksAPI, type BookmarkResponse } from "@apis/notice";
import styles from "./Bookmark.module.css";

const Bookmark = () => {
  const navigate = useNavigate();
  const [sortedBookmarks, setSortedBookmarks] = useState<BookmarkItem[]>([]);
  const [sortOrder, setSortOrder] = useState("북마크 등록순");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sortOptionsRef = useRef<HTMLDivElement>(null);

  const transformBookmarkData = (apiData: BookmarkResponse[]): BookmarkItem[] => {
    return apiData.map((item) => ({
      id: item.id,
      categoryId: 0,
      categoryName: "",
      title: item.title,
      link: "",
      pubDate: item.pubDate,
      author: "",
      description: "",
      isBookMarked: item.bookmarked,
      timestamp: item.pubDate,
    }));
  };

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiBookmarks = await getBookmarksAPI();
      const transformedBookmarks = transformBookmarkData(apiBookmarks);
      setSortedBookmarks(transformedBookmarks);
    } catch (err) {
      setError("북마크 데이터를 불러오는데 실패했습니다.");
      console.error("Failed to fetch bookmarks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  useEffect(() => {
    if (sortedBookmarks.length > 0) {
      sortAndSetBookmarks([...sortedBookmarks], sortOrder);
    }
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
    bookmarkArray: BookmarkItem[],
    order: string
  ): void => {
    let sorted: BookmarkItem[];

    if (order === "최신순") {
      sorted = bookmarkArray.sort((a, b) => {
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      });
    } else if (order === "오래된 순") {
      sorted = bookmarkArray.sort((a, b) => {
        return new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime();
      });
    } else if (order === "북마크 등록순") {
      sorted = bookmarkArray.sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });
    } else if (order === "가나다 순") {
      sorted = bookmarkArray.sort((a, b) => {
        return a.title.localeCompare(b.title, "ko");
      });
    } else {
      sorted = bookmarkArray.sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
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
        {loading ? (
          <div className={styles["loading"]}>
            <p>북마크를 불러오는 중...</p>
          </div>
        ) : error ? (
          <div className={styles["error"]}>
            <p>{error}</p>
            <button onClick={fetchBookmarks} type="button">
              다시 시도
            </button>
          </div>
        ) : sortedBookmarks.length > 0 ? (
          <div className={styles["bookmark-list"]}>
            {sortedBookmarks.map((bookmark) => (
              <button
                key={bookmark.id}
                className={styles["bookmark-item"]}
                onClick={() => handleItemClick(bookmark.categoryName, bookmark.id.toString())}
                aria-label={`${bookmark.title}, ${bookmark.pubDate} 공지사항 보기`}
                type="button"
              >
                <div className={styles["bookmark-item-content"]}>
                  <h3 className={styles["bookmark-item-title"]}>
                    {bookmark.title}
                  </h3>
                  <p className={styles["bookmark-item-date"]}>
                    {bookmark.pubDate.split(' ')[0]}
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
