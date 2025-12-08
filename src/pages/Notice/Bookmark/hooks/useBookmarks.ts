import { useState, useEffect, useRef } from "react";
import type { NoticeResponse } from "@apis/notice";
import { getBookmarks as getBookmarksAPI } from "@apis/notice";
import { transformBookmarkToNotice } from "../utils/bookmarkTransform";

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<NoticeResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  const fetchBookmarks = async () => {
    if (!isMounted.current) return;

    try {
      setLoading(true);
      setError(null);
      const apiBookmarks = await getBookmarksAPI();
      const notices = transformBookmarkToNotice(apiBookmarks);
      if (isMounted.current) {
        setBookmarks(notices);
      }
    } catch (err: unknown) {
      if (isMounted.current) {
        setError("북마크 데이터를 불러오는데 실패했습니다.");
        console.error("Failed to fetch bookmarks:", err);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  };

  const handleBookmarkToggle = (noticeId: number) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== noticeId));
  };

  useEffect(() => {
    isMounted.current = true;
    fetchBookmarks();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return {
    bookmarks,
    loading,
    error,
    fetchBookmarks,
    handleBookmarkToggle,
  };
};