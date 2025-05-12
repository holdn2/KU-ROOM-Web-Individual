// 단과대 및 학과 조회 api
import axios from "axios";

const GET_ALL_COLLEGES = "https://kuroom.shop/api/v1/colleges";
const GET_DEPARTMENTS = "https://kuroom.shop/api/v1/departments?collegeName";

// 단과대 조회
interface GetCollegesDepartmentsResponse {
  code: number;
  status: string;
  message: string;
  data: { name: string[] };
}
export const getAllColleges = async () => {
  try {
    const response = await axios.get<GetCollegesDepartmentsResponse>(
      GET_ALL_COLLEGES,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response.data.data.name);
    return response.data.data.name;
  } catch (error: any) {
    console.error("단과대 조회 실패:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "단과대 조회 중 오류 발생"
    );
  }
};

// 해당 단과대 내 학과 조회
export const getDepartments = async (college: string) => {
  try {
    const response = await axios.get<GetCollegesDepartmentsResponse>(
      `${GET_DEPARTMENTS}=${college}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // console.log(response.data.data.name);
    return response.data.data.name;
  } catch (error: any) {
    console.error("학과 조회 실패:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "학과 조회 중 오류 발생");
  }
};
