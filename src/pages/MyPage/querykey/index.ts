export const MYPAGE_QUERY_KEY = {
  USER_PROFILE: ["user-profile"],
  SEARCHED_DEPARTMENTS: (searchText: string) => [
    ...MYPAGE_QUERY_KEY.USER_PROFILE,
    "departments",
    searchText,
  ],
} as const;
