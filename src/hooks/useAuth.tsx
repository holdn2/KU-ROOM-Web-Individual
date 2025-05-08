import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (
    accessToken: string,
    refreshToken: string,
    isNewUser?: boolean
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  // 앱 시작시 로그인 상태 확인
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const expiresStr = localStorage.getItem("accessTokenExpires");

    if (token && expiresStr) {
      const expires = new Date(expiresStr);
      const now = new Date();

      if (now < expires) {
        setIsLoggedIn(true);
      } else {
        // 토큰이 만료되었으므로 삭제
        localStorage.removeItem("accessToken");
        localStorage.removeItem("accessTokenExpires");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("refreshTokenExpires");
      }
    }
  }, []);

  const login = (
    accessToken: string,
    refreshToken: string,
    isNewUser?: boolean
  ) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setIsLoggedIn(true);

    if (isNewUser) {
      navigate("/agreement");
    } else {
      navigate("/");
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessTokenExpires");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("refreshTokenExpires");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
