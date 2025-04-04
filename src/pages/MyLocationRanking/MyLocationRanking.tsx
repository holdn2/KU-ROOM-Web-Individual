import styles from "./MyLocationRanking.module.css";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import rank1Icon from "../../assets/icon/ranking/rank1.png";
import rank2Icon from "../../assets/icon/ranking/rank2.png";
import rank3Icon from "../../assets/icon/ranking/rank3.png";
import { useState } from "react";
import ShareBottomSheet from "../../components/ShareBottomSheet/ShareBottomSheet";
import { useNavigate } from "react-router-dom";

const dummyMyRankingData = [
  {
    rank: 1,
    rankIcon: rank1Icon,
    location: "상허기념도서관",
    count: 121,
  },
  {
    rank: 2,
    rankIcon: rank2Icon,
    location: "신공학관",
    count: 85,
  },
  {
    rank: 3,
    rankIcon: rank3Icon,
    location: "학생회관",
    count: 53,
  },
];

const dummyFriendRanking = [
  {
    nickname: "쿠룸",
  },
  {
    nickname: "쿠룸쿠룸",
  },
];

const MyLocationRanking = () => {
  const navigate = useNavigate();

  const [isSharedSheetOpen, setIsSharedSheetOpen] = useState(false);

  const handleNavToFriendRanking = (nickname: string) => {
    navigate("friendlocationranking", { state: { nickname: nickname } });
  };

  const openBottomSheet = () => {
    console.log("공유하기");
    setIsSharedSheetOpen(true);
  };
  const closeBottomSheet = () => {
    setIsSharedSheetOpen(false);
  };
  return (
    <div>
      <Header>내 장소 랭킹</Header>
      <div className={styles.PageContentWrapper}>
        <div className={styles.MyRankingContainer}>
          {dummyMyRankingData.map((item, index) => (
            <div key={index} className={styles.EachRankingContainer}>
              <img
                className={styles.RankIcon}
                src={item.rankIcon}
                alt="랭킹 아이콘"
              />
              <div className={styles.EachRankingContentWrapper}>
                <span className={styles.EachRankLocation}>{item.location}</span>
                <span className={styles.EachRankCount}>{item.count}회</span>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.FriendRankingContainer}>
          <span className={styles.FriendRankingTitle}>친구 랭킹</span>
          <div className={styles.FriendWrapper}>
            {dummyFriendRanking.map((item, index) => (
              <button
                key={index}
                className={styles.FriendNickname}
                onClick={() => handleNavToFriendRanking(item.nickname)}
              >
                {item.nickname}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.ButtonWrapper}>
          <Button onClick={openBottomSheet}>공유하기</Button>
        </div>
      </div>
      {isSharedSheetOpen && (
        <div className={styles.BottomSheetOverlay} onClick={closeBottomSheet}>
          <div onClick={(e) => e.stopPropagation()}>
            <ShareBottomSheet />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLocationRanking;
