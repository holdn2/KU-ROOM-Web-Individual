import type { NoticeResponse } from "@apis/notice";
import type { SortOption } from "../types";

export const sortNotices = (notices: NoticeResponse[], sortOrder: SortOption): NoticeResponse[] => {
  const sortedArray = [...notices];

  switch (sortOrder) {
    case "최신순":
      return sortedArray.sort((a, b) => {
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      });
      
    case "오래된 순":
      return sortedArray.sort((a, b) => {
        return new Date(a.pubDate).getTime() - new Date(b.pubDate).getTime();
      });
      
    case "북마크 등록순":
      return sortedArray.sort((a, b) => {
        // 1) 북마크된 항목을 먼저, 2) 동일하면 최신순
        const bm = Number(b.isBookMarked) - Number(a.isBookMarked);
        if (bm !== 0) return bm;
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      });
      
    case "가나다 순":
      return sortedArray.sort((a, b) => {
        return a.title.localeCompare(b.title, "ko");
      });
      
    default:
      return sortedArray.sort((a, b) => {
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
      });
  }
};