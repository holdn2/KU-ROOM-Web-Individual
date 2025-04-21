import React, { useEffect, useState } from "react";
import styles from "./DepartmentSetting.module.css";
import Header from "../../../components/Header/Header";
import DepartmentSearch from "../../../components/MyProfile/DepartmentSearchBar/DepartmentSearchBar";
import UserDepartmentList from "../../../components/DepartmentList/UserDepartmentList";
import SearchDepartmentList from "../../../components/DepartmentList/SearchDepartmentList";

const dummyUserDepartmentData = [
  { department: "융합생명공학과", college: "KU융합과학기술원" },
  { department: "응용통계학과", college: "사회과학대학" },
];

const dummySearchData = [
  { department: "컴퓨터공학과", college: "공과대학" },
  { department: "경영학과", college: "경영대학" },
];

const DepartmentSetting = () => {
  const [searchTarget, setSearchTarget] = useState("");
  const [userDepartment, setUserDepartment] = useState<
    { department: string; college: string }[]
  >([]);
  const [filteredDepartment, setFilteredDepartment] = useState<
    { department: string; college: string }[]
  >([]);

  const [trySearch, setTrySearch] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // 렌더링 시 서버에 유저가 추가해둔 학과 정보 받아오기
  useEffect(() => {
    setUserDepartment(dummyUserDepartmentData);
  }, []);

  useEffect(() => {
    setTrySearch(false);
    setFilteredDepartment([]);
  }, [searchTarget]);

  // 검색 시 로직. 서버에 요청해야함.
  const filteringSearch = () => {
    const result = dummySearchData.filter((department) =>
      department.department.includes(searchTarget.trim())
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
        {isSearchFocused ? (
          <SearchDepartmentList
            trySearch={trySearch}
            searchTarget={searchTarget}
            filteredDepartment={filteredDepartment}
            handleAddUserDepartment={handleAddUserDepartment}
          />
        ) : (
          <UserDepartmentList
            userDepartment={userDepartment}
            handleDeleteDepartment={handleDeleteDepartment}
          />
        )}
      </div>
    </div>
  );
};

export default DepartmentSetting;
