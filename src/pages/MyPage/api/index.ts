import axiosInstance from "@apis/axiosInstance";
import { ApiResponse } from "@/shared/types";

const MYPAGE_API_URL = {
  userProfile: "/users/profile",
  departmentSearch: "/departments/search",
};

interface DepartmentType {
  department: string;
  college: string;
}

export interface UserProfileResponseData {
  email: string | null;
  nickname: string;
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
