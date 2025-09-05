import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import ArrowIcon from "@assets/icon/notice/search/sevrondown.svg";
import BookmarkIcon from "@assets/headericon/bookmark.svg";
import BookmarkFillIcon from "@assets/headericon/bookmark-fill.svg";

import type { NoticeResponse } from "@apis/notice";
import styles from "./NoticeList.module.css";

interface NoticeListProps {
  notices: NoticeResponse[];
  loading?: boolean;
  error?: string | null;
  showBookmarkButton?: boolean;
  showSortOptions?: boolean;
  emptyMessage?: string;
  onBookmarkToggle?: (noticeId: number) => void;
  onRetry?: () => void;
}

const NoticeList = ({
  notices,
  loading = false,
  error = null,
  showBookmarkButton = true,
  showSortOptions = false,
  emptyMessage = "공지사항이 없습니다.",
  onBookmarkToggle,
  onRetry
}: NoticeListProps) => {
  const [sortOrder, setSortOrder] = useState("최신순");
  const [showSort, setShowSort] = useState(false);
  const [sortedNotices, setSortedNotices] = useState<NoticeResponse[]>([]);
  const sortOptionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (notices.length > 0) {
      sortAndSetNotices([...notices], sortOrder);
    } else {
      setSortedNotices([]);
    }
  }, [notices, sortOrder]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sortOptionsRef.current &&
        !sortOptionsRef.current.contains(event.target as Node)
      ) {
        setShowSort(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const sortAndSetNotices = (noticeArray: NoticeResponse[], order: string) => {
    let sorted: NoticeResponse[];

    if (order === "최신순") {
      sorted = noticeArray.sort((a, b) => {
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      });
    } else if (order === "오래된 순") {
      sorted = noticeArray.sort((a, b) => {
        return new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime();
      });
    } else if (order === "북마크 등록순") {
      sorted = noticeArray.sort((a, b) => {
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      });
    } else if (order === "가나다 순") {
      sorted = noticeArray.sort((a, b) => {
        return a.title.localeCompare(b.title, "ko");
      });
    } else {
      sorted = noticeArray.sort((a, b) => {
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      });
    }

    setSortedNotices(sorted);
  };

  const handleSortOptionClick = (option: string) => {
    setSortOrder(option);
    setShowSort(false);
  };

  const navigate = useNavigate();

  const handleNoticeClick = (noticeId: number) => {
    navigate(`/notice/${noticeId}`);
  };

  const handleBookmarkClick = (e: React.MouseEvent, noticeId: number) => {
    e.stopPropagation();
    if (onBookmarkToggle) {
      onBookmarkToggle(noticeId);
    }
  };

  if (loading) {
    return (
      <div className={styles["notice-list-container"]}>
        <div className={styles["loading"]}>
          <p>공지사항을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles["notice-list-container"]}>
        <div className={styles["error"]}>
          <p>{error}</p>
          {onRetry && (
            <button onClick={onRetry} type="button">
              다시 시도
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles["notice-list-container"]}>
      {showSortOptions && (
        <div className={styles["sort-order-wrapper"]}>
          <div className={styles["sort-dropdown"]} ref={sortOptionsRef}>
            <button
              className={styles["sort-setting"]}
              onClick={() => setShowSort(!showSort)}
              aria-label={`정렬 방식 변경: 현재 ${sortOrder}`}
              type="button"
            >
              {sortOrder}
              <img
                src={ArrowIcon}
                alt="정렬 화살표"
                className={styles["dropdown-arrow"]}
              />
            </button>

            {showSort && (
              <div className={styles["sort-options"]}>
                {["최신순", "오래된 순", "북마크 등록순", "가나다 순"].map((option) => (
                  <button
                    key={option}
                    className={`${styles["sort-option"]} ${sortOrder === option ? styles["active"] : ""}`}
                    onClick={() => handleSortOptionClick(option)}
                    type="button"
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className={styles["notice-content"]}>
        {sortedNotices.length > 0 ? (
          <div className={styles["notice-list"]}>
            {sortedNotices.map((notice) => (
              <div
                key={notice.id}
                className={styles["notice-item"]}
                onClick={() => handleNoticeClick(notice.id)}
                role="button"
                tabIndex={0}
                aria-label={`공지사항: ${notice.title}, 날짜: ${notice.pubDate}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleNoticeClick(notice.id);
                  }
                }}
              >
                <div className={styles["notice-content-area"]}>
                  <h3 className={styles["notice-item-title"]}>
                    {notice.title}
                  </h3>
                  <p className={styles["notice-item-date"]}>
                    {notice.pubDate.split(' ')[0]}
                  </p>
                </div>
                {showBookmarkButton && (
                  <button
                    className={styles["bookmark-button"]}
                    onClick={(e) => handleBookmarkClick(e, notice.id)}
                    aria-label={`북마크 ${notice.isBookMarked ? '해제' : '추가'}`}
                    type="button"
                  >
                    <img
                      src={notice.isBookMarked ? BookmarkFillIcon : BookmarkIcon}
                      alt={notice.isBookMarked ? "북마크됨" : "북마크"}
                      className={styles["bookmark-icon"]}
                    />
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles["empty-notices"]}>
            <p>{emptyMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoticeList;