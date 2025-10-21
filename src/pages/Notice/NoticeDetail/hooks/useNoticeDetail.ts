import { useState, useEffect } from "react";
import type { NoticeResponse } from "@apis/notice";
import { getNotices, getNoticeDetailHtml, addBookmark, removeBookmark } from "@apis/notice";
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

        const allNotices = await getNotices({ size: 1000 });
        const foundNotice = allNotices.content.find((n: NoticeResponse) => n.id === parseInt(id));

        if (foundNotice) {
          try {
            const htmlContent = await getNoticeDetailHtml(id);
            setNotice({ ...foundNotice, content: htmlContent });
          } catch (htmlErr) {
            console.warn("HTML 콘텐츠를 가져오는데 실패했습니다:", htmlErr);
            setNotice(foundNotice);
          }
        } else {
          setError(NOTICE_DETAIL_MESSAGES.NOT_FOUND);
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