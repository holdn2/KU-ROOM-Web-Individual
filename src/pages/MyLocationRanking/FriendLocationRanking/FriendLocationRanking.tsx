import { useLocation } from "react-router-dom";
import Header from "../../../components/Header/Header";
import styles from "./FriendLocationRankin.module.css";
import rank1Icon from "../../../assets/icon/ranking/rank1.png";
import rank2Icon from "../../../assets/icon/ranking/rank2.png";
import rank3Icon from "../../../assets/icon/ranking/rank3.png";

const dummyFriendRankingData = [
  {
    rank: 1,
    rankIcon: rank1Icon,
    location: "신공학관",
    count: 91,
  },
  {
    rank: 2,
    rankIcon: rank2Icon,
    location: "상허기념도서관",
    count: 65,
  },
  {
    rank: 3,
    rankIcon: rank3Icon,
    location: "경영관",
    count: 23,
  },
];

const FriendLocationRanking = () => {
  const location = useLocation();
  const friendNickname = location.state?.nickname;
  return (
    <div>
      <Header>{friendNickname}</Header>
      <div className={styles.FriendRankingContainer}>
        {dummyFriendRankingData.map((item, index) => (
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
    </div>
  );
};

export default FriendLocationRanking;
