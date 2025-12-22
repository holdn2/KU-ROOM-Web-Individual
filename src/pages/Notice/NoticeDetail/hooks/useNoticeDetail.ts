import { useState, useEffect, useRef } from "react";
import type { NoticeResponse } from "@apis/notice";
import { getNoticeDetail, addBookmark, removeBookmark } from "@apis/notice";
import { NOTICE_DETAIL_MESSAGES } from "../constants";
import { decodeBase64ToUTF8 } from "@/shared/utils/base64";
import { getCategoryId } from "@constant/categoryMapping";

export const useNoticeDetail = (
  id: string | undefined,
  category: string | undefined
) => {
  const [notice, setNotice] = useState<NoticeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchedKeyRef = useRef<string | null>(null);

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      const currentKey = `${id}-${category}`;
      if (!id || !category || fetchedKeyRef.current === currentKey) return;

      fetchedKeyRef.current = currentKey;

      try {
        setLoading(true);
        setError(null);

        // 카테고리명을 ID로 변환
        const categoryId = getCategoryId(category);
        if (categoryId === undefined) {
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
          isBookMarked: detailData.isBookmark,
          bookmarkId: detailData.bookmarkId,
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
      if (notice.isBookMarked && notice.bookmarkId) {
        // 북마크 삭제
        await removeBookmark(notice.bookmarkId);
        setNotice((prev) =>
          prev ? { ...prev, isBookMarked: false, bookmarkId: undefined } : null
        );
      } else {
        // 북마크 추가
        const bookmarkId = await addBookmark(notice.id);
        setNotice((prev) =>
          prev ? { ...prev, isBookMarked: true, bookmarkId } : null
        );
      }
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
