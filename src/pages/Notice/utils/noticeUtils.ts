import { BookmarkItem, NoticeItem } from "../types/noticeTypes";

// 모든 공지사항 더미 데이터 - 각 카테고리별 데이터 추가
const dummyNotices: NoticeItem[] = [
  // 학사 공지
  {
    id: "1",
    category: "학사",
    title: "2025학년도 1학기 수강정정 및 초과과목 신청 기간, 방법 안내(수정)",
    date: "2025.03.05",
    content: `교무처 학사팀에서는 2025학년도 1학기 학부 수강정정 및 초과과목 신청 및 처리 방법을 다음과 같이 안내합니다.
    
  1. 수강정정 및 초과과목 신청/승인 기간: 3. 4.(화) 09:30 ~ 3. 10.(월) 17:00까지
  ※ 대상: 전체학생
  ※ 초과과목 추가 수강신청의 경우 교강사의 승인 및 시스템 입력까지 위 기한 내 완료되어야 함.
  
  2. 수강정정 및 초과과목 신청, 처리 절차 및 방법
  
  1) 수강인원 여석이 존재하는 교과목
  ☐ 학생: 온라인으로 수강신청 가능 (수강신청화면: http://sugang.konkuk.ac.kr)
  
  2) 수강인원 초과 교과목
  ☐ 서울권역e러닝 교과목: 추가 수강신청 불가`,
  },
  {
    id: "2",
    category: "학사",
    title: "2025학년도 1학기 수강정정 및 초과과목 신청 기간, 방법 안내(수정)",
    date: "2025.03.05",
    content:
      "교무처 학사팀에서는 2025학년도 1학기 학부 수강정정 및 초과과목 신청 및 처리 방법을 다음과 같이 안내합니다.",
  },
  {
    id: "3",
    category: "학사",
    title: "2025학년도 1학기 수강정정 및 초과과목 신청 기간, 방법 안내(수정)",
    date: "2025.03.05",
  },
  {
    id: "4",
    category: "학사",
    title: "2025학년도 1학기 수강정정 및 초과과목 신청 기간, 방법 안내(수정)",
    date: "2025.03.05",
  },
  {
    id: "5",
    category: "학사",
    title: "2025학년도 1학기 수강정정 및 초과과목 신청 기간, 방법 안내(수정)",
    date: "2025.03.05",
  },

  // 장학 공지
  {
    id: "6",
    category: "장학",
    title: "2025학년도 1학기 장학금 신청 안내",
    date: "2025.03.01",
  },
  {
    id: "7",
    category: "장학",
    title: "2025학년도 성적우수 장학생 선발 결과 안내",
    date: "2025.02.28",
  },

  // 취창업 공지
  {
    id: "8",
    category: "취창업",
    title: "2025년 대기업 채용설명회 일정 안내",
    date: "2025.03.10",
  },
  {
    id: "9",
    category: "취창업",
    title: "취업 특강: 면접 성공 전략",
    date: "2025.03.07",
  },

  // 국제 공지
  {
    id: "10",
    category: "국제",
    title: "2025학년도 2학기 해외 교환학생 모집 안내",
    date: "2025.03.12",
  },
  {
    id: "11",
    category: "국제",
    title: "외국인 유학생 오리엔테이션 일정 안내",
    date: "2025.03.02",
  },

  // 학생 공지
  {
    id: "12",
    category: "학생",
    title: "2025학년도 학생회비 납부 안내",
    date: "2025.03.06",
  },
  {
    id: "13",
    category: "학생",
    title: "캠퍼스 내 자전거 등록제 시행 안내",
    date: "2025.03.01",
  },

  // 일반 공지
  {
    id: "14",
    category: "일반",
    title: "캠퍼스 내 도서관 운영시간 변경 안내",
    date: "2025.03.15",
  },
  {
    id: "15",
    category: "일반",
    title: "2025학년도 학생증 재발급 신청 안내",
    date: "2025.03.08",
  },

  // 신학 공지
  {
    id: "16",
    category: "신학",
    title: "신학과 특별 세미나 개최 안내",
    date: "2025.03.09",
  },

  // 도서관 공지
  {
    id: "17",
    category: "도서관",
    title: "도서관 신착도서 안내 - 2025년 3월",
    date: "2025.03.05",
  },
  {
    id: "18",
    category: "도서관",
    title: "전자도서관 시스템 점검 안내",
    date: "2025.03.02",
  },

  // 학과 공지 (국어국문학과)
  {
    id: "19",
    category: "학과",
    department: "국어국문학과",
    title: "국어국문학과 졸업논문 제출 안내",
    date: "2025.03.10",
  },
  {
    id: "20",
    category: "학과",
    department: "국어국문학과",
    title: "국어국문학과 학술제 개최 안내",
    date: "2025.03.05",
  },

  // 외부 공지 (사람인)
  {
    id: "21",
    category: "외부",
    externalSource: "사람인",
    title: "사람인 취업박람회 개최 안내",
    date: "2025.03.12",
  },

  // 외부 공지 (원티드)
  {
    id: "22",
    category: "외부",
    externalSource: "원티드",
    title: "원티드 온라인 채용설명회 안내",
    date: "2025.03.08",
  },
];

// 초기 북마크 데이터 설정 함수
export const initializeBookmarks = (): void => {
  // 기존 북마크 데이터가 없는 경우에만 초기화
  const existingBookmarks = localStorage.getItem("noticeBookmarks");
  if (!existingBookmarks) {
    // 처음 여섯 개의 공지사항만 북마크로 설정
    const initialBookmarks: Record<string, BookmarkItem> = {};

    // 선택된 공지사항에 북마크 적용
    const bookmarkIds = ["1", "6", "8", "10", "12", "14"];
    for (let i = 0; i < bookmarkIds.length; i++) {
      const notice = dummyNotices.find((n) => n.id === bookmarkIds[i]);
      if (notice) {
        initialBookmarks[notice.id] = {
          ...notice,
          timestamp: new Date(2025, 2, 5 - i).toISOString(), // 날짜를 다르게 설정하여 정렬 테스트 가능
        };
      }
    }

    localStorage.setItem("noticeBookmarks", JSON.stringify(initialBookmarks));
    console.log("초기 북마크 데이터가 설정되었습니다.");
  }
};

// 공지사항 ID로 공지사항 정보 가져오기
export const getNoticeById = (id: string): NoticeItem | undefined => {
  return dummyNotices.find((notice) => notice.id === id);
};

// 특정 카테고리의 공지사항 가져오기
export const getNoticesByCategory = (category: string): NoticeItem[] => {
  return dummyNotices.filter((notice) => notice.category === category);
};

// 특정 학과의 공지사항 가져오기
export const getNoticesByDepartment = (department: string): NoticeItem[] => {
  return dummyNotices.filter(
    (notice) => notice.category === "학과" && notice.department === department
  );
};

// 특정 외부 소스의 공지사항 가져오기
export const getNoticesByExternalSource = (source: string): NoticeItem[] => {
  return dummyNotices.filter(
    (notice) => notice.category === "외부" && notice.externalSource === source
  );
};

// 모든 공지사항 가져오기
export const getAllNotices = (): NoticeItem[] => {
  return [...dummyNotices];
};

// 공지사항 북마크 추가/제거 함수
export const toggleBookmark = (noticeId: string): boolean => {
  const notice = getNoticeById(noticeId);
  if (!notice) return false;

  const bookmarks = JSON.parse(localStorage.getItem("noticeBookmarks") || "{}");

  if (bookmarks[noticeId]) {
    // 북마크 제거
    delete bookmarks[noticeId];
    localStorage.setItem("noticeBookmarks", JSON.stringify(bookmarks));
    return false;
  }
  // 북마크 추가
  bookmarks[noticeId] = {
    ...notice,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem("noticeBookmarks", JSON.stringify(bookmarks));
  return true;
};

// 북마크 데이터 가져오기
export const getBookmarks = (): Record<string, BookmarkItem> => {
  return JSON.parse(localStorage.getItem("noticeBookmarks") || "{}");
};

// 북마크 여부 확인
export const isBookmarked = (noticeId: string): boolean => {
  const bookmarks = getBookmarks();
  return !!bookmarks[noticeId];
};
