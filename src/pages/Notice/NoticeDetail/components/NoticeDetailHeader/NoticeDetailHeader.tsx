import Header from "@components/Header/Header";
import type { NoticeResponse } from "@apis/notice";
import { NOTICE_DETAIL_CONFIG } from "../../constants";

interface NoticeDetailHeaderProps {
  notice: NoticeResponse | null;
  category?: string;
  onBookmarkToggle: () => void;
}

export const NoticeDetailHeader = ({ 
  notice, 
  category, 
  onBookmarkToggle 
}: NoticeDetailHeaderProps) => {
  return (
    <Header 
      onBookmarkClick={onBookmarkToggle}
      isBookmarked={notice?.isBookMarked || false}
    >
      {notice?.categoryName || category || NOTICE_DETAIL_CONFIG.DEFAULT_CATEGORY}
    </Header>
  );
};