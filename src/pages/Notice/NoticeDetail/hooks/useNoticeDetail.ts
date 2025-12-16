import { useState, useEffect } from "react";
import type { NoticeResponse } from "@apis/notice";
import { getNotices, getNoticeDetail, addBookmark, removeBookmark } from "@apis/notice";
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

        // 여러 카테고리에서 작은 크기로 나눠서 조회
        const categories = ["234", "235", "237", "238", "240", "4083", "4214", "4274"];
        let foundNotice: NoticeResponse | null = null;

        for (const category of categories) {
          try {
            const response = await getNotices({ category, size: 100 });
            const notice = response.content.find((n: NoticeResponse) => n.id === parseInt(id));
            if (notice) {
              foundNotice = notice;
              break;
            }
          } catch (err) {
            console.warn(`카테고리 ${category} 조회 실패:`, err);
          }
        }

        if (foundNotice) {
          try {
            const detailData = await getNoticeDetail(id);
            // Base64 디코딩 후 UTF-8로 변환
            const binaryString = atob(detailData.content);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
              bytes[i] = binaryString.charCodeAt(i);
            }
            const decodedContent = new TextDecoder('utf-8').decode(bytes);
            setNotice({ ...foundNotice, content: decodedContent });
          } catch (detailErr) {
            console.warn("상세 콘텐츠를 가져오는데 실패했습니다:", detailErr);
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