import React from "react";
import "./Header.css";
import bookmarkIcon from "../../assets/headericon/bookmark.svg";
import searchIcon from "../../assets/headericon/search.svg";
import arrowBackIcon from "../../assets/nav/arrowback.svg";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  children?: React.ReactNode;
}

const renderHeaderContent = (children: React.ReactNode) => {
  const navigate = useNavigate();
  switch (children) {
    case "공지사항":
      return (
        <div className="notice-header-content-wrapper">
          <img src={bookmarkIcon} alt="북마크" />
          <img src={searchIcon} alt="검색" />
        </div>
      );
    case "프로필 설정":
      return (
        <img
          className="profilechange-header-content"
          src={arrowBackIcon}
          alt="뒤로가기"
          onClick={() => navigate(-1)}
        />
      );
    default:
      return;
  }
};

const Header: React.FC<HeaderProps> = ({ children = "" }) => {
  return (
    <>
      <div className="header-container">
        <span className="header-title">{children}</span>
        {renderHeaderContent(children)}
      </div>
    </>
  );
};

export default Header;
