import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import bookmarkIcon from "../../assets/headericon/bookmark.svg";
import searchIcon from "../../assets/headericon/search.svg";
import arrowBackIcon from "../../assets/nav/arrowback.svg";
import kuroomIcon from "../../assets/icon/cloud.svg";
import homeAlarmIcon from "../../assets/icon/homealarm.svg";
interface HeaderProps {
  children?: React.ReactNode;
  hasNewAlarm?: boolean;
}

const renderHeaderContent = (
  children: React.ReactNode,
  newAlarmState: boolean
) => {
  const navigate = useNavigate();

  switch (children) {
    case "홈":
      return (
        <div className="home-header-wrapper">
          <h1 className="home-header-title">KURUM</h1>
          <div style={{ position: "relative" }}>
            <img
              src={homeAlarmIcon}
              alt="알림"
              onClick={() => navigate("/alarm")}
            />
            {newAlarmState ? <div className="new-alarm-marker" /> : <></>}
          </div>
        </div>
      );
    case "공지사항":
      return (
        <div className="notice-header-content-wrapper">
          <img
            src={bookmarkIcon}
            alt="북마크"
            onClick={() => navigate("/bookmark")}
          />
          <img
            src={searchIcon}
            alt="검색"
            onClick={() => navigate("/search")}
          />
        </div>
      );
    case "":
      return (
        <>
          <img
            className="profilechange-header-content"
            src={arrowBackIcon}
            alt="뒤로가기"
            onClick={() => navigate(-1)}
          />
          <img
            className="header-kuroom-icon"
            src={kuroomIcon}
            alt="쿠룸 아이콘"
          />
        </>
      );
    default:
      return (
        <img
          className="profilechange-header-content"
          src={arrowBackIcon}
          alt="뒤로가기"
          onClick={() => navigate(-1)}
        />
      );
  }
};

const Header: React.FC<HeaderProps> = ({ children = "", hasNewAlarm }) => {
  const newAlarmState = children === "홈" && hasNewAlarm === true;

  return (
    <>
      <header className="header-container">
        {children === "홈" ? (
          <></>
        ) : (
          <span className="header-title">{children}</span>
        )}
        {renderHeaderContent(children, newAlarmState)}
      </header>
    </>
  );
};

export default Header;
