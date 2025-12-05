import axiosInstance from "@/apis/axiosInstance";
import { ApiResponse } from "@/shared/types";
import { AlarmDataType } from "@pages/Alarm/types";
import { PAGE_SIZE } from "@/shared/constant/page";

const ALARM_API_URL = {
  BASE: "/alarm",
};

export interface AlarmListResponseData extends ApiResponse {
  alarms: AlarmDataType[];
  hasNext: boolean;
  nextCursor: string;
}

interface AlarmListResponse {
  data: AlarmListResponseData;
}

// 알림 관련 api
export const getAlarmListApi = async (lastKnown?: string) => {
  const response = await axiosInstance.get<AlarmListResponse>(
    ALARM_API_URL.BASE,
    { params: { lastKnown, limit: PAGE_SIZE } }
  );

  return response.data.data;
};
