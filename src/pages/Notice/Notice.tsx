import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Notice.module.css';
import Select from '../../components/profilesetting/Select/Select';
import BottomSheet from '../../components/profilesetting/BottomSheet/BottomSheet';
import Header from '../../components/Header/Header';
import BottomBar from '../../components/BottomBar/BottomBar';
import chatbot from "../../assets/icon/chat-bot.svg";
import { departments, colleges } from '../../constants/dummyData';

type DepartmentsType = {
  [key: string]: string[];
};

const Notice: React.FC = () => {
  const navigate = useNavigate();
  const tabs = useMemo(() => ['학사', '장학', '취창업', '국제', '학생', '일반', '신학', '도서관', '학과', '외부'], []);
  const [activeTab, setActiveTab] = useState<string>('학사');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('국어국문학과');
  const [isDepartmentBottomSheetOpen, setIsDepartmentBottomSheetOpen] = useState<boolean>(false);
  
  // 외부 탭을 위한 카테고리 상태
  const externalCategories = useMemo(() => ['사람인', '원티드'], []);
  const [selectedExternalCategory, setSelectedExternalCategory] = useState<string>(externalCategories[0]);
  const [isExternalCategoryBottomSheetOpen, setIsExternalCategoryBottomSheetOpen] = useState<boolean>(false);
  
  const typedDepartments = departments as DepartmentsType;
  
  const allDepartments = useMemo(() => {
    let allDepts: string[] = [];
    colleges.forEach((college) => {
      if (typedDepartments[college]) {
        allDepts = [...allDepts, ...typedDepartments[college]];
      }
    });
    return allDepts;
  }, [typedDepartments]);
  
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: '0px',
    width: '0px'
  });

  useEffect(() => {
    const activeTabIndex = tabs.indexOf(activeTab);
    const activeTabElement = tabsRef.current[activeTabIndex];
    
    if (activeTabElement) {
      const left = activeTabElement.offsetLeft;
      const width = activeTabElement.offsetWidth;
      setIndicatorStyle({
        left: `${left}px`,
        width: `${width}px`
      });
    }
  }, [activeTab, tabs]);

  // 더미 공지사항 데이터
  const notices = [
    {
      id: 1,
      title: '2025학년도 1학기 수강정정 및 초과과목 신청 기간, 방법 안내(수정)',
      date: '2025.03.05'
    },
    {
      id: 2,
      title: '2025학년도 1학기 수강정정 및 초과과목 신청 기간, 방법 안내(수정)',
      date: '2025.03.05'
    },
    {
      id: 3,
      title: '2025학년도 1학기 수강정정 및 초과과목 신청 기간, 방법 안내(수정)',
      date: '2025.03.05'
    },
    {
      id: 4,
      title: '2025학년도 1학기 수강정정 및 초과과목 신청 기간, 방법 안내(수정)',
      date: '2025.03.05'
    },
    {
      id: 5,
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
  
  const handleExternalCategorySelect = (category: string) => {
    setSelectedExternalCategory(category);
  };
  
  const handleOpenExternalCategoryBottomSheet = () => {
    setIsExternalCategoryBottomSheetOpen(true);
  };
  
  const navigateToNoticeDetail = (noticeId: number) => {
    navigate(`/notice/${activeTab}/${noticeId}`);
  };

  useEffect(() => {
    tabsRef.current = Array(tabs.length).fill(null);
  }, [tabs]);

  return (
    <div className={styles['notice-container']}>
      <div className={styles['fixed-header']}>
        <Header>공지사항</Header>
      </div>

      <div className={styles['category-section']}>
        <div className={styles['notice-tabs-container']}>
          <div className={styles['notice-tabs']}>
            {tabs.map((tab, index) => (
              <button
                key={tab}
                ref={(el) => { tabsRef.current[index] = el; }}
                className={`${styles['notice-tab']} ${activeTab === tab ? styles['active'] : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div 
            className={styles['active-tab-indicator']} 
            style={indicatorStyle} 
          />
        </div>
      </div>

      <div className={styles['scrollable-content']}>
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
        
        {activeTab === '외부' && (
          <div className={styles['department-selector']}>
            <div className={styles['select-wrapper']} onClick={handleOpenExternalCategoryBottomSheet}>
              <Select
                label=""
                value={selectedExternalCategory}
                placeholder="카테고리 선택"
                onClick={handleOpenExternalCategoryBottomSheet}
              />
            </div>
          </div>
        )}

        <div className={styles['notice-list']}>
          {notices.map((notice) => (
            <div 
              key={notice.id} 
              className={styles['notice-item']}
              onClick={() => navigateToNoticeDetail(notice.id)}
            >
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
      </div>

      <BottomSheet
        isOpen={isDepartmentBottomSheetOpen}
        onClose={() => setIsDepartmentBottomSheetOpen(false)}
        onApply={handleDepartmentSelect}
        title="학과 선택"
        selectedItem={selectedDepartment}
      >
        <div className={styles['bottom-sheet-list']}>
          {allDepartments.map((department) => (
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
      
      <BottomSheet
        isOpen={isExternalCategoryBottomSheetOpen}
        onClose={() => setIsExternalCategoryBottomSheetOpen(false)}
        onApply={handleExternalCategorySelect}
        title="카테고리 선택"
        selectedItem={selectedExternalCategory}
      >
        <div className={styles['bottom-sheet-list']}>
          {externalCategories.map((category) => (
            <div
              key={category}
              className={`${styles['bottom-sheet-item']} ${selectedExternalCategory === category ? styles['selected'] : ''}`}
              onClick={() => setSelectedExternalCategory(category)}
            >
              {category}
            </div>
          ))}
        </div>
      </BottomSheet>

      <button className={styles['chat-button']}>
        <img src={chatbot} alt="챗봇" />
      </button>

      <BottomBar />
    </div>
  );
};

export default Notice;