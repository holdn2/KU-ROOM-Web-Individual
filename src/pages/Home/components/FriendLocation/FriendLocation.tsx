import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import arrowRight from "@assets/nav/arrowRight.svg";
import locationIcon from "@assets/icon/locationIcon.png";
import defaulProfileImg from "@assets/defaultProfileImg.svg";
import exampleProfileImg1 from "@assets/exampleProfileImg1.png";
import exampleProfileImg2 from "@assets/exampleProfileImg2.png";
import exampleProfileImg3 from "@assets/exampleProfileImg3.png";

import styles from "./FriendLocation.module.css";

const dummyFriendLocationData = [
  {
    location: "상허기념도서관",
    friends: [
      {
        nickname: "김쿠룸",
        profileImg: defaulProfileImg,
      },
      {
        nickname: "박쿠룸",
        profileImg: exampleProfileImg1,
      },
      {
        nickname: "최쿠룸",
        profileImg: defaulProfileImg,
      },
      {
        nickname: "이쿠룸",
        profileImg: defaulProfileImg,
      },
      {
        nickname: "송쿠룸",
        profileImg: defaulProfileImg,
      },
    ],
  },
  {
    location: "제1 학생회관",
    friends: [
      {
        nickname: "김쿠룸",
        profileImg: exampleProfileImg2,
      },
      {
        nickname: "박쿠룸",
        profileImg: defaulProfileImg,
      },
    ],
  },
  {
    location: "경영관",
    friends: [
      {
        nickname: "백쿠룸",
        profileImg: defaulProfileImg,
      },
      {
        nickname: "신쿠룸",
        profileImg: exampleProfileImg3,
      },
    ],
  },
];

interface FriendLocationProps {
  isSharedLocation: boolean;
}

const FriendLocation: React.FC<FriendLocationProps> = ({
  isSharedLocation,
}) => {
  const navigate = useNavigate();
  // 화면 너비에 따라 개수 다르게 보이기. 크기에 따라 최대 3 혹은 4개
  const [maxVisibleFriends, setMaxVisibleFriends] = useState(4);

  useEffect(() => {
    const updateVisibleFriends = () => {
      setMaxVisibleFriends(window.innerWidth < 410 ? 3 : 4);
    };

    updateVisibleFriends(); // 초기 실행
    window.addEventListener("resize", updateVisibleFriends);
    return () => window.removeEventListener("resize", updateVisibleFriends);
  }, []);

  const handleClickArrow = () => {
    console.log("지도로 이동");
    navigate("/map");
  };

  return (
    <div className={styles.FriendLocationContentWrapper}>
      <div className={styles.FriendLocationSectionTitle}>
        <div className={styles.TitleWrapper}>
          <h1 className={styles.SectionTitleBold}>친구 위치 공유</h1>
          <span className={styles.NormalText}>
            친구들이 어디에 있는지 알려드릴게요 :)
          </span>
        </div>
        <img
          className={styles.ArrowButton}
          src={arrowRight}
          alt="자세히 보기"
          onClick={handleClickArrow}
        />
      </div>

      {dummyFriendLocationData.map((item, index) => {
        const shouldShowMore = item.friends.length > maxVisibleFriends;
        const visibleFriends = item.friends.slice(0, maxVisibleFriends);

        return (
          <div
            key={index}
            className={`${styles.EachLocationWrapper} ${
              isSharedLocation && item.location === "상허기념도서관"
                ? styles.HighlightBorder
                : ""
            }`}
          >
            <div className={styles.EachLocationTitleWrapper}>
              <img
                className={styles.LocationIcon}
                src={locationIcon}
                alt="핀포인트 아이콘"
              />
              <h1 className={styles.EachLocationTitle}>{item.location}</h1>
            </div>

            <div className={styles.LocationFriendWrapper}>
              {visibleFriends.map((friend, index) => (
                <div key={index} className={styles.EachFriendProfile}>
                  <img
                    style={{ width: "49px", height: "49px" }}
                    src={friend.profileImg}
                    alt="프로필 사진"
                  />
                  <span className={styles.Nickname}>{friend.nickname}</span>
                </div>
              ))}

              {shouldShowMore && (
                <button
                  className={styles.EachFriendProfile}
                  onClick={() => console.log("더보기 클릭")}
                >
                  <div className={styles.LearnMoreWrapper}>
                    <div className={styles.Dotstyle} />
                    <div className={styles.Dotstyle} />
                    <div className={styles.Dotstyle} />
                  </div>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FriendLocation;
