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

  const loadNoticesByCategory = useCallback(async (activeTab: string) => {
    const categoryId = getCategoryId(activeTab);
    if (!categoryId) return;

    currentCategoryRef.current = categoryId;
    setPage(0);
    setHasMore(true);
    setLoading(true);

    try {
      const response = await getNotices({
        categoryId,
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
    }
  }, []);

  const loadMoreNotices = useCallback(async () => {
    if (loading || !hasMore || currentCategoryRef.current === null) return;

    const nextPage = page + 1;
    setLoading(true);

    try {
      const response = await getNotices({
        categoryId: currentCategoryRef.current,
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