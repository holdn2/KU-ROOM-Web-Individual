export interface NoticeItem {
  id: string;
  category: string;
  title: string;
  date: string;
  content?: string; // 상세 내용은 선택적으로 포함
  department?: string; // 학과 정보는 선택적으로 포함
  externalSource?: string; // 외부 소스 정보는 선택적으로 포함
}

// 북마크 인터페이스 정의
export interface BookmarkItem extends NoticeItem {
  timestamp: string; // 북마크 추가 시간
}
