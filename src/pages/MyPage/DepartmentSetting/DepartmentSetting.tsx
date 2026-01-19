import React, { useEffect, useState } from "react";

import Header from "@components/Header/Header";

import DepartmentSearch from "./components/DepartmentSearchBar/DepartmentSearchBar";
import UserDepartmentList from "./components/UserDepartmentList/UserDepartmentList";
import SearchDepartmentList from "./components/SearchDepartmentList/SearchDepartmentList";
import styles from "./DepartmentSetting.module.css";
import { useUserProfile } from "../hooks/use-user-profile";

const dummySearchData = [
  { department: "컴퓨터공학과", college: "공과대학" },
  { department: "경영학과", college: "경영대학" },
];

const DepartmentSetting = () => {
  const { userProfileData, isPendingUserProfile } = useUserProfile();

  const [searchTarget, setSearchTarget] = useState("");

  const [filteredDepartment, setFilteredDepartment] = useState<
    { department: string; college: string }[]
  >([]);

  const [trySearch, setTrySearch] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    setTrySearch(false);
    setFilteredDepartment([]);
  }, [searchTarget]);

  // 검색 시 로직. 서버에 요청해야함.
  const filteringSearch = () => {
    const result = dummySearchData.filter((department) =>
      department.department.includes(searchTarget.trim()),
    );
    setFilteredDepartment(result);
  };
  // 엔터 시 검색 로직
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (searchTarget.trim() === "") return;
    if (e.key === "Enter") {
      setTrySearch(true);
      filteringSearch();
    }
  };

  // TODO: 검색 디바운싱으로 구현하기
  // 검색창에 입력 후 다른 곳 클릭했을 때(포커스 잃을 때) 검색되도록
  const handleBlurSearch = () => {
    setTrySearch(true);
    if (searchTarget.trim() === "") {
      setSearchTarget("");
      setIsSearchFocused(false);
      setFilteredDepartment([]);
    } else {
      // 포커스를 잃었지만 검색 결과가 아직 없으면 자동 필터링
      filteringSearch();
    }
  };

  // 서버에 삭제 요청
  const handleDeleteDepartment = (department: string) => {
    console.log(department, "를 목록에서 삭제");
  };
  // 서버에 추가 요청
  const handleAddUserDepartment = (department: string) => {
    console.log(department, "를 목록에 추가");
    setSearchTarget("");
    setIsSearchFocused(false);
    setFilteredDepartment([]);
  };

  return (
    <div>
      <Header>학과 설정</Header>
      <div className={styles.DepartmentSettingPage}>
        <div className={styles.SearchBarContainer}>
          <DepartmentSearch
            searchTarget={searchTarget}
            setSearchTarget={setSearchTarget}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={handleBlurSearch}
            onKeyDown={handleSearchKeyDown}
          />
        </div>
        {isPendingUserProfile ? (
          <div>로딩중...</div>
        ) : isSearchFocused ? (
          <SearchDepartmentList
            trySearch={trySearch}
            searchTarget={searchTarget}
            filteredDepartment={filteredDepartment}
            handleAddUserDepartment={handleAddUserDepartment}
          />
        ) : (
          <UserDepartmentList
            userDepartment={userProfileData?.departments}
            handleDeleteDepartment={handleDeleteDepartment}
          />
        )}
      </div>
    </div>
  );
};

export default DepartmentSetting;
