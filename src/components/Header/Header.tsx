import React from "react";
import "./Header.css";
import bookmarkIcon from "../../assets/headericon/bookmark.svg";
import searchIcon from "../../assets/headericon/search.svg";

interface HeaderProps {
  children: React.ReactNode;
}

const renderHeaderContent = (children: React.ReactNode) => {
  switch (children) {
    case "공지사항":
      return (
        <div className="header-content-wrapper">
          <img src={bookmarkIcon} alt="북마크" />
          <img src={searchIcon} alt="검색" />
        </div>
      );
    default:
      return;
  }
};

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <>
      <div className="header-container">
        <span className="header-title">{children}</span>
        {renderHeaderContent(children)}
      </div>
      {children === "공지사항" && (
        <div className="notice-category-container">카테고리 부분</div>
      )}
    </>
  );
};

export default Header;
