import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import BottomBar from "../../components/BottomBar/BottomBar";
import styles from "./Bookmark.module.css";
import type { BookmarkItem } from "../../services/NoticeService";
import NoticeService from "../../services/NoticeService";

const Bookmark: React.FC = () => {
  const navigate = useNavigate();
  const [sortedBookmarks, setSortedBookmarks] = useState<BookmarkItem[]>([]);
  const [sortOrder, setSortOrder] = useState("최신순");

  useEffect(() => {
    const storedBookmarks = NoticeService.getBookmarks();
    sortAndSetBookmarks(storedBookmarks, sortOrder);
  }, [sortOrder]);

  const sortAndSetBookmarks = (
    bookmarkData: Record<string, BookmarkItem>,
    order: string
  ): void => {
    const bookmarkArray = Object.values(bookmarkData);
    let sorted: BookmarkItem[];

    if (order === "최신순") {
      sorted = bookmarkArray.sort((a, b) => {
        return (
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      });
    } else {
      // 북마크 등록순 (오래된 순)
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

  const toggleSortOrder = (): void => {
    const newOrder = sortOrder === "최신순" ? "북마크 등록순" : "최신순";
    setSortOrder(newOrder);
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
        <button
          className={styles["bookmark-setting"]}
          onClick={toggleSortOrder}
          aria-label={`정렬 방식 변경: 현재 ${sortOrder}`}
          type="button"
        >
          북마크 등록순 ▼
        </button>
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
