import axiosInstance from "@apis/axiosInstance";
import { ApiResponse } from "@/shared/types";

const MYPAGE_API_URL = {
  userProfile: "/users/profile",
  departmentSearch: "/departments/search",
  departmentUpdate: "/users/department",
};

export interface DepartmentType {
  department: string;
  college: string;
}

export interface UserProfileResponseData {
  profileImage: string | null;
  email: string | null;
  nickname: string;
  loginId: string | null;
  studentId: number;
  departments: DepartmentType[];
}

interface UserProfileResponse extends ApiResponse {
  data: UserProfileResponseData;
}

export const getUserProfileApi = async () => {
  const response = await axiosInstance.get<UserProfileResponse>(
    MYPAGE_API_URL.userProfile,
  );

  return response.data.data;
};

interface SearchedDepartmentsResponse extends ApiResponse {
  data: DepartmentType[];
}

export const getSearchedDepartmentsApi = async (searchText: string) => {
  const response = await axiosInstance.get<SearchedDepartmentsResponse>(
    MYPAGE_API_URL.departmentSearch,
    { params: { query: searchText } },
  );

  return response.data.data;
};

interface UpdateDepartmentResponse extends ApiResponse {
  data: string;
}

export const addDepartmentApi = async (department: string) => {
  const response = await axiosInstance.post<UpdateDepartmentResponse>(
    MYPAGE_API_URL.departmentUpdate,
    {
      department,
    },
  );

  return response.data.data;
};

export const deleteDepartmentApi = async (department: string) => {
  const response = await axiosInstance.delete<UpdateDepartmentResponse>(
    MYPAGE_API_URL.departmentUpdate,
    {
      data: {
        department,
      },
    },
  );

  return response.data.data;
};
