import { MYPAGE_QUERY_KEY } from "@pages/MyPage/querykey";

export const NOTICE_QUERY_KEY = {
  OTHERS: [...MYPAGE_QUERY_KEY.USER_PROFILE, "departments"],
} as const;
