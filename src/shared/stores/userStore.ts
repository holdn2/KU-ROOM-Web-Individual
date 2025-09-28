import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Department {
  departmentId: number;
  departmentName: string;
}

interface UserInfo {
  id: number;
  oauthId: string | null;
  loginId: string;
  email: string;
  nickname: string;
  studentId: string;
  imageUrl: string | null;
  departmentResponse: Department[];
}
interface UserState {
  user: UserInfo | null;
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
  getUserName: () => string | null;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      getUserName: () => get().user?.nickname ?? null,
    }),
    // localStorage와 연동하여 새로고침 시에도 데이터 손실 없도록 함.
    // localStorage.setItem("user-storage", JSON.stringify(...)) 가 자동으로 실행되는 것임.
    // clearUser 할 때도 localStorage에 자동 반영됨
    {
      name: "user-storage", // localStorage key
      storage: createJSONStorage(() => localStorage),
    }
  )
);
