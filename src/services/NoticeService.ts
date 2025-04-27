export interface NoticeItem {
    id: string;
    category: string;
    title: string;
    date: string;
    content?: string; // 상세 내용은 선택적으로 포함
  }
  
  // 모든 공지사항 더미 데이터
  const dummyNotices: NoticeItem[] = [
    {
      id: '1',
      category: '학사',
      title: '2025학년도 1학기 수강정정 및 초과과목 신청 기간, 방법 안내(수정)',
      date: '2025.03.05',
      content: `교무처 학사팀에서는 2025학년도 1학기 학부 수강정정 및 초과과목 신청 및 처리 방법을 다음과 같이 안내합니다.
  
  1. 수강정정 및 초과과목 신청/승인 기간: 3. 4.(화) 09:30 ~ 3. 10.(월) 17:00까지
  ※ 대상: 전체학생
  ※ 초과과목 추가 수강신청의 경우 교강사의 승인 및 시스템 입력까지 위 기한 내 완료되어야 함.
  
  2. 수강정정 및 초과과목 신청, 처리 절차 및 방법
  
  1) 수강인원 여석이 존재하는 교과목
  ☐ 학생: 온라인으로 수강신청 가능 (수강신청화면: http://sugang.konkuk.ac.kr)
  
  2) 수강인원 초과 교과목
  ☐ 서울권역e러닝 교과목: 추가 수강신청 불가`
    },
    {
      id: '2',
      category: '학사',
      title: '2025학년도 1학기 수강정정 및 초과과목 신청 기간, 방법 안내(수정)',
      date: '2025.03.05',
      content: `교무처 학사팀에서는 2025학년도 1학기 학부 수강정정 및 초과과목 신청 및 처리 방법을 다음과 같이 안내합니다.`
    },
    {
      id: '3',
      category: '학사',
      title: '2025학년도 1학기 수강정정 및 초과과목 신청 기간, 방법 안내(수정)',
      date: '2025.03.05'
    },
    {
      id: '4',
      category: '학사',
      title: '2025학년도 1학기 수강정정 및 초과과목 신청 기간, 방법 안내(수정)',
      date: '2025.03.05'
    },
    {
      id: '5',
      category: '학사',
      title: '2025학년도 1학기 수강정정 및 초과과목 신청 기간, 방법 안내(수정)',
      date: '2025.03.05'
    },
    {
      id: '6',
      category: '장학',
      title: '2025학년도 1학기 장학금 신청 안내',
      date: '2025.03.01'
    }
  ];
  
  // 북마크 인터페이스 정의
  export interface BookmarkItem extends NoticeItem {
    timestamp: string; // 북마크 추가 시간
  }
  
  // 초기 북마크 데이터 설정 함수
  export const initializeBookmarks = (): void => {
    // 기존 북마크 데이터가 없는 경우에만 초기화
    const existingBookmarks = localStorage.getItem('noticeBookmarks');
    if (!existingBookmarks) {
      // 처음 세 개의 공지사항만 북마크로 설정
      const initialBookmarks: Record<string, BookmarkItem> = {};
      
      // 처음 세 개의 공지사항에 북마크 적용
      for (let i = 0; i < 6; i++) {
        const notice = dummyNotices[i];
        initialBookmarks[notice.id] = {
          ...notice,
          timestamp: new Date(2025, 2, 5 - i).toISOString() // 날짜를 다르게 설정하여 정렬 테스트 가능
        };
      }
      
      localStorage.setItem('noticeBookmarks', JSON.stringify(initialBookmarks));
      console.log('초기 북마크 데이터가 설정되었습니다.');
    }
  };
  
  // 공지사항 ID로 공지사항 정보 가져오기
  export const getNoticeById = (id: string): NoticeItem | undefined => {
    return dummyNotices.find(notice => notice.id === id);
  };
  
  // 특정 카테고리의 공지사항 가져오기
  export const getNoticesByCategory = (category: string): NoticeItem[] => {
    return dummyNotices.filter(notice => notice.category === category);
  };
  
  // 모든 공지사항 가져오기
  export const getAllNotices = (): NoticeItem[] => {
    return [...dummyNotices];
  };
  
  // 공지사항 북마크 추가/제거 함수
  export const toggleBookmark = (noticeId: string): boolean => {
    const notice = getNoticeById(noticeId);
    if (!notice) return false;
    
    const bookmarks = JSON.parse(localStorage.getItem('noticeBookmarks') || '{}');
    
    if (bookmarks[noticeId]) {
      // 북마크 제거
      delete bookmarks[noticeId];
      localStorage.setItem('noticeBookmarks', JSON.stringify(bookmarks));
      return false;
    } else {
      // 북마크 추가
      bookmarks[noticeId] = {
        ...notice,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('noticeBookmarks', JSON.stringify(bookmarks));
      return true;
    }
  };
  
  // 북마크 데이터 가져오기
  export const getBookmarks = (): Record<string, BookmarkItem> => {
    return JSON.parse(localStorage.getItem('noticeBookmarks') || '{}');
  };
  
  // 북마크 여부 확인
  export const isBookmarked = (noticeId: string): boolean => {
    const bookmarks = getBookmarks();
    return !!bookmarks[noticeId];
  };
  
  export default {
    getNoticeById,
    getNoticesByCategory,
    getAllNotices,
    toggleBookmark,
    getBookmarks,
    isBookmarked,
    initializeBookmarks
  };