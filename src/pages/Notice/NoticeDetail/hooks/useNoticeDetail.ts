import { useState, useEffect } from "react";
import type { NoticeResponse } from "@apis/notice";
import { getNoticeDetailHtml, addBookmark, removeBookmark } from "@apis/notice";
import { NOTICE_DETAIL_MESSAGES } from "../constants";

export const useNoticeDetail = (id: string | undefined) => {
  const [notice, setNotice] = useState<NoticeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        try {
          const htmlContent = await getNoticeDetailHtml(id);
          // HTML을 성공적으로 받아왔으면 최소한의 notice 객체 생성
          setNotice({
            id: parseInt(id),
            categoryId: 0,
            categoryName: "",
            title: "",
            link: "",
            content: htmlContent,
            pubDate: "",
            author: "",
            description: "",
            isBookMarked: false,
          });
        } catch (htmlErr) {
          console.error("HTML 콘텐츠를 가져오는데 실패했습니다:", htmlErr);
          setError(NOTICE_DETAIL_MESSAGES.FETCH_ERROR);
        }
      } catch (err) {
        setError(NOTICE_DETAIL_MESSAGES.FETCH_ERROR);
        console.error("Failed to fetch notice detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticeDetail();
  }, [id]);

  const handleBookmarkToggle = async () => {
    if (!notice) return;
    
    try {
      if (notice.isBookMarked) {
        await removeBookmark(notice.id);
      } else {
        await addBookmark(notice.id);
      }
      
      // 북마크 상태 업데이트
      setNotice(prev => prev ? { ...prev, isBookMarked: !prev.isBookMarked } : null);
    } catch (error) {
      console.error(NOTICE_DETAIL_MESSAGES.BOOKMARK_TOGGLE_ERROR, error);
    }
  };

  return {
    notice,
    loading,
    error,
    handleBookmarkToggle,
  };
};