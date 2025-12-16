import { useState, useCallback, useRef } from "react";
import type { NoticeResponse } from "@apis/notice";
import { getNotices } from "@apis/notice";
import { getCategoryId } from "@constant/categoryMapping";
import { NOTICE_CONFIG } from "../constants";

export const useNotices = () => {
  const [notices, setNotices] = useState<NoticeResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const currentCategoryRef = useRef<number | null>(null);
  const loadingRef = useRef(false);

  const loadNoticesByCategory = useCallback(async (activeTab: string) => {
    const categoryId = getCategoryId(activeTab);
    if (!categoryId) return;

    // 이미 같은 카테고리를 로딩 중이면 중복 호출 방지
    if (loadingRef.current && currentCategoryRef.current === categoryId) {
      return;
    }

    currentCategoryRef.current = categoryId;
    loadingRef.current = true;
    setPage(0);
    setHasMore(true);
    setLoading(true);

    try {
      const response = await getNotices({
        category: String(categoryId),
        page: 0,
        size: NOTICE_CONFIG.DEFAULT_PAGE_SIZE,
      });
      setNotices(response.content);
      setHasMore(!response.last);
    } catch (error) {
      console.error("공지사항 로드 실패:", error);
      setNotices([]);
      setHasMore(false);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, []);

  const loadMoreNotices = useCallback(async () => {
    if (loading || !hasMore || currentCategoryRef.current === null) return;

    const nextPage = page + 1;
    setLoading(true);

    try {
      const response = await getNotices({
        category: String(currentCategoryRef.current),
        page: nextPage,
        size: NOTICE_CONFIG.DEFAULT_PAGE_SIZE,
      });

      setNotices((prev) => [...prev, ...response.content]);
      setHasMore(!response.last);
      setPage(nextPage);
    } catch (error) {
      console.error("추가 공지사항 로드 실패:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page]);

  return {
    notices,
    loading,
    hasMore,
    loadNoticesByCategory,
    loadMoreNotices,
    setNotices,
  };
};
