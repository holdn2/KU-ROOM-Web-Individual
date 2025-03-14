import "./BottomBar.css";
import homenav from "../../assets/nav/homenav.svg";
import noticenav from "../../assets/nav/announcenav.svg";
import mapnav from "../../assets/nav/mapnav.svg";
import myinfonav from "../../assets/nav/myinfonav.svg";
import { useNavigate, useLocation } from "react-router-dom";

const BottomBar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 가져오기

  return (
    <div className="bottom-bar-container">
      <button
        className={`nav-button-wrap ${location.pathname === "/" ? "active" : ""}`}
        onClick={() => navigate("/")}
      >
        <img src={homenav} alt="홈" />
        <span className="bottom-bar-text">홈</span>
      </button>
      <button
        className={`nav-button-wrap ${location.pathname === "/notice" ? "active" : ""}`}
        onClick={() => navigate("/notice")}
      >
        <img src={noticenav} alt="공지사항" />
        <span className="bottom-bar-text">공지사항</span>
      </button>
      <button
        className={`nav-button-wrap ${location.pathname === "/map" ? "active" : ""}`}
        onClick={() => navigate("/map")}
      >
        <img src={mapnav} alt="지도" />
        <span className="bottom-bar-text">지도</span>
      </button>
      <button
        className={`nav-button-wrap ${location.pathname === "/myinfo" ? "active" : ""}`}
        onClick={() => navigate("/myinfo")}
      >
        <img src={myinfonav} alt="내정보" />
        <span className="bottom-bar-text">내정보</span>
      </button>
    </div>
  );
};

export default BottomBar;
