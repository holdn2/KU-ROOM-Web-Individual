export const NOTICE_TABS = [
  "학사",
  "장학",
  "국제",
  "학생",
  "일반",
  "기타",
] as const;

export const NOTICE_CONFIG = {
  DEFAULT_TAB: "학사",
  DEFAULT_PAGE_SIZE: 20,
  LAST_TAB_STORAGE_KEY: "notice_last_tab",
} as const;

export const NOTICE_MESSAGES = {
  EMPTY_MESSAGE: "공지사항이 없습니다.",
  LOADING_MESSAGE: "로딩 중...",
  ERROR_FETCH: "공지사항 로드 실패:",
} as const;

export const NOTICE_OTHERS = [
  {
    name: "산학",
    url: "https://www.konkuk.ac.kr/konkuk/19329/subview.do",
  },
  {
    name: "도서관",
    url: "https://library.konkuk.ac.kr/library-guide/bulletins/notice",
  },
  {
    name: "취창업",
    url: "https://www.konkuk.ac.kr/konkuk/2240/subview.do",
  },
] as const;
