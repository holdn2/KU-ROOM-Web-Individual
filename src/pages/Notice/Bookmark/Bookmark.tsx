import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@components/Header/Header";
import BottomBar from "@components/BottomBar/BottomBar";
import NoticeList from "../components/NoticeList/NoticeList";

import {
  getBookmarks as getBookmarksAPI,
  type BookmarkResponse,
  type NoticeResponse,
} from "@apis/notice";
import styles from "./Bookmark.module.css";

const Bookmark = () => {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState<NoticeResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transformBookmarkData = (apiData: BookmarkResponse[]): NoticeResponse[] => {
    return apiData.map((item) => ({
      id: item.id,
      categoryId: 0,
      categoryName: "",
      title: item.title,
      link: item.link || "",
      pubDate: item.pubDate,
      author: "",
      description: "",
      isBookMarked: item.bookmarked,
    }));
  };

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiBookmarks = await getBookmarksAPI();
      const transformedBookmarks = transformBookmarkData(apiBookmarks);
      setBookmarks(transformedBookmarks);
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

  const handleGoBack = (): void => {
    navigate(-1);
  };

  const handleBookmarkToggle = (noticeId: number) => {
    // 북마크 해제 시 목록에서 제거
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== noticeId));
  };


  return (
    <div className={styles["bookmark-container"]}>
      <div className={styles["fixed-header"]}>
        <Header>북마크</Header>
        <button
          className={styles["back-button"]}
          onClick={handleGoBack}
          aria-label="뒤로가기"
          type="button"
        />
      </div>

      <div className={styles["scrollable-content"]}>
        <NoticeList
          notices={bookmarks}
          loading={loading}
          error={error}
          showBookmarkButton={false}
          showSortOptions={true}
          emptyMessage="북마크한 공지사항이 없습니다."
          onBookmarkToggle={handleBookmarkToggle}
          onRetry={fetchBookmarks}
        />
      </div>

      <BottomBar />
    </div>
  );
};

export default Bookmark;