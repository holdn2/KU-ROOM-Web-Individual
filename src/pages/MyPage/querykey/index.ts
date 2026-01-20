export const MYPAGE_QUERY_KEY = {
  USER_PROFILE: ["user-profile"],
  SEARCHED_DEPARTMENTS: (searchText: string) => [
    "user-profile",
    "departments",
    searchText,
  ],
};
