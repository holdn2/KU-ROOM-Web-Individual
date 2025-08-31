import { useNavigate } from "react-router-dom";
import styles from "./MyLocationRanking.module.css";
import Header from "../../shared/components/Header/Header";
import Button from "../../shared/components/Button/Button";
import rank1Icon from "../../assets/icon/ranking/rank1.png";
import rank2Icon from "../../assets/icon/ranking/rank2.png";
import rank3Icon from "../../assets/icon/ranking/rank3.png";
import { useEffect, useState } from "react";
import ShareBottomSheet from "../../components/ShareBottomSheet/ShareBottomSheet";
import { RankListType } from "../../../types/rankTypes";
import { getSharingRanking } from "../../apis/home";

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

  const [myRankData, setMyRankData] = useState<RankListType[]>([]);

  const [isSharedSheetOpen, setIsSharedSheetOpen] = useState(false);
  const [isSheetVisible, setIsSheetVisible] = useState(false);

  const getMyLocationRanking = async () => {
    try {
      const response = await getSharingRanking();
      console.log(response);
      setMyRankData(response);
    } catch (error) {
      console.error("내 장소 랭킹 조회 중 에러", error);
    }
  };

  const handleNavToFriendRanking = (nickname: string) => {
    navigate("friendlocationranking", { state: { nickname: nickname } });
  };

  const openBottomSheet = () => {
    console.log("공유하기");
    setIsSheetVisible(true); // 먼저 보여주기
    setTimeout(() => setIsSharedSheetOpen(true), 0); // 열리는 애니메이션 트리거
  };
  const closeBottomSheet = () => {
    setIsSharedSheetOpen(false); // 닫히는 애니메이션 시작
    setTimeout(() => setIsSheetVisible(false), 300); // 0.3초 후 제거
  };

  useEffect(() => {
    getMyLocationRanking();
  }, []);

  return (
    <div>
      <Header>내 장소 랭킹</Header>
      <div className={styles.PageContentWrapper}>
        <div className={styles.MyRankingContainer}>
          {myRankData.map((item, index) => (
            <div key={index} className={styles.EachRankingContainer}>
              <img
                className={styles.RankIcon}
                src={
                  index === 0 ? rank1Icon : index === 1 ? rank2Icon : rank3Icon
                }
                alt="랭킹 아이콘"
              />
              <div className={styles.EachRankingContentWrapper}>
                <span className={styles.EachRankLocation}>{item.name}</span>
                <span className={styles.EachRankCount}>
                  {item.sharingCount}회
                </span>
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
      {isSheetVisible && (
        <div className={styles.BottomSheetOverlay} onClick={closeBottomSheet}>
          <div
            className={styles.ShareBottomSheet}
            onClick={(e) => e.stopPropagation()}
          >
            <ShareBottomSheet isSharedSheetOpen={isSharedSheetOpen} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MyLocationRanking;
