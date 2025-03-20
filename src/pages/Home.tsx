// 홈 페이지
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomBar from "../components/BottomBar/BottomBar";
import { logoutApi } from "../apis/login";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      navigate("/login"); // 토큰이 없으면 로그인 페이지로 이동
    }
  }, [navigate]);

  const handleLogout = () => {
    const response = logoutApi();
    console.log(response);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };
  return (
    <div>
      Home
      <button onClick={handleLogout}>로그아웃</button>
      <BottomBar />
    </div>
  );
};

export default Home;
