import React, { useState } from 'react';
import styles from './Notice.module.css';
import Select from '../../components/profilesetting/Select/Select';
import BottomSheet from '../../components/profilesetting/BottomSheet/BottomSheet';
import Header from '../../components/Header/Header';
import BottomBar from '../../components/BottomBar/BottomBar';
import { departments } from '../../constants/dummyData';

const Notice: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('학과');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('응용통계학과');
  const [isDepartmentBottomSheetOpen, setIsDepartmentBottomSheetOpen] = useState<boolean>(false);

  // 카테고리 탭 데이터
  const tabs = ['학생', '일반', '신학', '도서관', '학과', '외부'];

  // 더미 공지사항 데이터
  const notices = [
    {
      title: '2025학년도 1학기 수강정정 및 초과과목 신청 기간, 방법 안내(수정)',
      date: '2025.03.05'
    },
    {
      title: '2025학년도 1학기 수강정정 및 초과과목 신청 기간, 방법 안내(수정)',
      date: '2025.03.05'
    },
    {
      title: '2025학년도 1학기 수강정정 및 초과과목 신청 기간, 방법 안내(수정)',
      date: '2025.03.05'
    },
    {
      title: '2025학년도 1학기 수강정정 및 초과과목 신청 기간, 방법 안내(수정)',
      date: '2025.03.05'
    },
    {
      title: '2025학년도 1학기 수강정정 및 초과과목 신청 기간, 방법 안내(수정)',
      date: '2025.03.05'
    }
  ];

  const handleDepartmentSelect = (department: string) => {
    setSelectedDepartment(department);
  };

  const handleOpenDepartmentBottomSheet = () => {
    setIsDepartmentBottomSheetOpen(true);
  };

  return (
    <div className={styles['notice-container']}>
      {/* Header 컴포넌트 */}
      <Header>공지사항</Header>

      {/* 카테고리 탭 */}
      <div className={styles['notice-tabs-container']}>
        <div className={styles['notice-tabs']}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`${styles['notice-tab']} ${activeTab === tab ? styles['active'] : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div 
          className={styles['active-tab-indicator']} 
          style={{ left: `calc((100% / ${tabs.length}) * ${tabs.indexOf(activeTab)})` }} 
        />
      </div>

      {/* 학과 선택 영역 */}
      {activeTab === '학과' && (
        <div className={styles['department-selector']}>
          <div className={styles['select-wrapper']} onClick={handleOpenDepartmentBottomSheet}>
            <Select
              label=""
              value={selectedDepartment}
              placeholder="학과 선택"
              onClick={handleOpenDepartmentBottomSheet}
            />
          </div>
        </div>
      )}

      {/* 공지사항 리스트 */}
      <div className={styles['notice-list']}>
        {notices.map((notice, index) => (
          <div key={index} className={styles['notice-item']}>
            <div className={styles['notice-content']}>
              <h3 className={styles['notice-item-title']}>{notice.title}</h3>
              <p className={styles['notice-item-date']}>{notice.date}</p>
            </div>
            <div className={styles['notice-arrow']}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 18L15 12L9 6"
                  stroke="#CCCCCC"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* 학과 선택 바텀시트 */}
      <BottomSheet
        isOpen={isDepartmentBottomSheetOpen}
        onClose={() => setIsDepartmentBottomSheetOpen(false)}
        onApply={handleDepartmentSelect}
        title="학과 선택"
        selectedItem={selectedDepartment}
      >
        <div className={styles['bottom-sheet-list']}>
          {departments['사회과학대학'].map((department) => (
            <div
              key={department}
              className={`${styles['bottom-sheet-item']} ${selectedDepartment === department ? styles['selected'] : ''}`}
              onClick={() => setSelectedDepartment(department)}
            >
              {department}
            </div>
          ))}
        </div>
      </BottomSheet>

      {/* 챗봇 버튼 */}
      <button className={styles['chat-button']}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M14 20.5C17.5899 20.5 20.5 17.5899 20.5 14C20.5 10.4101 17.5899 7.5 14 7.5C10.4101 7.5 7.5 10.4101 7.5 14C7.5 15.3805 7.97411 16.6578 8.78249 17.6922C8.94458 17.8917 9.01191 18.1497 8.95835 18.3988L8.5499 20.4299C8.4399 21.0369 8.96311 21.5601 9.57009 21.4501L11.6012 21.0416C11.8503 20.9881 12.1083 21.0554 12.3078 21.2175C13.3422 22.0259 14.6195 22.5 16 22.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 15.5L18 11.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* BottomBar 컴포넌트 */}
      <BottomBar />
    </div>
  );
};

export default Notice;