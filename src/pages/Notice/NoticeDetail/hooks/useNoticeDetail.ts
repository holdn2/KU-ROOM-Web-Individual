import { useState, useEffect } from "react";
import type { NoticeResponse } from "@apis/notice";
import { getNoticeDetail, addBookmark, removeBookmark } from "@apis/notice";
import { NOTICE_DETAIL_MESSAGES } from "../constants";
import { decodeBase64ToUTF8 } from "@/shared/utils/base64";
import { getCategoryId } from "@constant/categoryMapping";

export const useNoticeDetail = (id: string | undefined, category: string | undefined) => {
  const [notice, setNotice] = useState<NoticeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      if (!id || !category) return;

      try {
        setLoading(true);
        setError(null);

        // 카테고리명을 ID로 변환
        const categoryId = getCategoryId(category);
        if (!categoryId) {
          setError(NOTICE_DETAIL_MESSAGES.NOT_FOUND);
          return;
        }

        // 상세 정보 조회
        const detailData = await getNoticeDetail(id);
        const decodedContent = decodeBase64ToUTF8(detailData.content);

        // NoticeResponse 형식에 맞게 데이터 구성
        setNotice({
          id: detailData.id,
          categoryId,
          categoryName: category,
          title: detailData.title,
          link: detailData.link,
          content: decodedContent,
          pubDate: detailData.pubdate,
          author: "",
          description: "",
          isBookMarked: false,
        });
      } catch (err) {
        setError(NOTICE_DETAIL_MESSAGES.FETCH_ERROR);
        console.error("Failed to fetch notice detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticeDetail();
  }, [id, category]);

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