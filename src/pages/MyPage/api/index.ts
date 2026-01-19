import axiosInstance from "@apis/axiosInstance";
import { ApiResponse } from "@/shared/types";

const MYPAGE_API_URL = {
  userProfile: "/users/profile",
  departmentSearch: "/departments/search",
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
