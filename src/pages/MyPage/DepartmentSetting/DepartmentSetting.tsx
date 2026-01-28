import { useState } from "react";

import useToast from "@hooks/use-toast";
import Header from "@components/Header/Header";

import DepartmentSearch from "./components/DepartmentSearchBar/DepartmentSearchBar";
import UserDepartmentList from "./components/UserDepartmentList/UserDepartmentList";
import SearchDepartmentList from "./components/SearchDepartmentList/SearchDepartmentList";
import styles from "./DepartmentSetting.module.css";
import { useUserProfile } from "../hooks/use-user-profile";
import useMutationDepartment from "./hooks/use-mutation-department";

const DepartmentSetting = () => {
  const toast = useToast();
  const { userProfileData, isPendingUserProfile } = useUserProfile();
  const { addDepartment, deleteDepartment } = useMutationDepartment();

  const [searchText, setSearchText] = useState("");

  const handleDeleteDepartment = (department: string) => {
    if (userProfileData?.departments.length === 1) {
      // TODO: 추후 멘트 수정
      toast.error("최소 하나 이상 설정해야 합니다.");
      return;
    }
    deleteDepartment(department);
  };
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
