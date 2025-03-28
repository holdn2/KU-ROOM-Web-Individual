import styles from "./MyLocationRanking.module.css";
import arrowRight from "../../../assets/nav/arrowRight.svg";
import rank1Icon from "../../../assets/icon/ranking/rank1.png";
import rank2Icon from "../../../assets/icon/ranking/rank2.png";
import rank3Icon from "../../../assets/icon/ranking/rank3.png";

const dummyRankData = [
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

const MyLocationRanking = () => {
  return (
    <div className={styles.MyLocationRankingBackground}>
      <div className={styles.MyLocationRankingWrapper}>
        <div className={styles.MyLocationRankingSectionTitle}>
          <div className={styles.TitleWrapper}>
            <h1 className={styles.SectionTitleBold}>내 장소 랭킹</h1>
            <span className={styles.NormalText}>
              내가 자주 간 장소를 모아 보여드려요 :)
            </span>
          </div>
          <img
            className={styles.ArrowButton}
            src={arrowRight}
            alt="자세히 보기"
            onClick={() => console.log("자세히 보기 클릭")}
          />
        </div>
        <div className={styles.RankingContentWrapper}>
          {dummyRankData.map((item, index) => (
            <div
              key={index}
              className={`${styles.EachRankingContentContainer} ${
                item.rank === 1
                  ? styles.RankBg1
                  : item.rank === 2
                    ? styles.RankBg2
                    : item.rank === 3
                      ? styles.RankBg3
                      : styles.RankBgDefault
              }`}
            >
              <img
                className={styles.RankIcon}
                src={item.rankIcon}
                alt="등 수"
              />
              <div className={styles.RankingTextWrapper}>
                <span className={styles.RankingLocationText}>
                  {item.location}
                </span>
                <span className={styles.RankingCountText}>{item.count}회</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyLocationRanking;
