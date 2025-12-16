import { useState, useEffect } from "react";
import type { NoticeResponse } from "@apis/notice";
import { getNotices, getNoticeDetail, addBookmark, removeBookmark } from "@apis/notice";
import { NOTICE_DETAIL_MESSAGES } from "../constants";
import { decodeBase64ToUTF8 } from "@/shared/utils/base64";

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
            const decodedContent = decodeBase64ToUTF8(detailData.content);
            setNotice({
              ...foundNotice,
              content: decodedContent,
              link: detailData.link
            });
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