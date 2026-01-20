import { useState } from "react";

import Header from "@components/Header/Header";

import DepartmentSearch from "./components/DepartmentSearchBar/DepartmentSearchBar";
import UserDepartmentList from "./components/UserDepartmentList/UserDepartmentList";
import SearchDepartmentList from "./components/SearchDepartmentList/SearchDepartmentList";
import styles from "./DepartmentSetting.module.css";
import { useUserProfile } from "../hooks/use-user-profile";
import useMutationDepartment from "./hooks/use-mutation-department";

const DepartmentSetting = () => {
  const { userProfileData, isPendingUserProfile } = useUserProfile();
  const { addDepartment } = useMutationDepartment();

  const [searchText, setSearchText] = useState("");

  // 서버에 삭제 요청
  const handleDeleteDepartment = (department: string) => {
    console.log(department, "를 목록에서 삭제");
  };
  // 서버에 추가 요청
  const handleAddUserDepartment = (department: string) => {
    addDepartment(department);
    setSearchText("");
  };

  return (
    <div>
      <Header>학과 설정</Header>
      <div className={styles.DepartmentSettingPage}>
        <div className={styles.SearchBarContainer}>
          <DepartmentSearch
            searchTarget={searchText}
            setSearchTarget={setSearchText}
          />
        </div>
        {isPendingUserProfile ? (
          <div>로딩중...</div>
        ) : searchText.trim().length > 0 ? (
          <SearchDepartmentList
            searchText={searchText}
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
