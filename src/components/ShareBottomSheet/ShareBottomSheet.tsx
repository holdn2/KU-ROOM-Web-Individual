import styles from "./ShareBottomSheet.module.css";
import kakaoIcon from "../../assets/ShareIcon/Kakaotalk.png";
import facebookIcon from "../../assets/ShareIcon/Facebook.png";
import linkIcon from "../../assets/ShareIcon/linkIcon.svg";

const ShareBottomSheet = () => {
  const kakaoShare = () => {
    console.log("카카오로 공유하기");
  };
  const facebookShare = () => {
    console.log("페이스북으로 공유하기");
  };
  const urlShare = () => {
    console.log("url로 공유하기");
  };
  const handleViewmore = () => {
    console.log("더보기");
  };
  return (
    <div className={styles.ShareBottomSheetContainer}>
      <div className={styles.SheetIndicator} />
      <span className={styles.SheetTitle}>공유하기</span>
      <div className={styles.ShareMethodWrapper}>
        <button className={styles.EachMethodContainer} onClick={kakaoShare}>
          <img className={styles.MethodIcon} src={kakaoIcon} alt="카카오" />
          <span className={styles.MethodText}>카카오</span>
        </button>
        <button className={styles.EachMethodContainer} onClick={facebookShare}>
          <img
            className={styles.MethodIcon}
            src={facebookIcon}
            alt="페이스북"
          />
          <span className={styles.MethodText}>페이스북</span>
        </button>
        <button className={styles.EachMethodContainer} onClick={urlShare}>
          <div className={styles.MethodIconGray}>
            <img src={linkIcon} alt="url복사" />
          </div>
          <span className={styles.MethodText}>URL복사</span>
        </button>
        <button className={styles.EachMethodContainer} onClick={handleViewmore}>
          <div className={styles.MethodIconLightgray}>
            <div className={styles.moredots} />
            <div className={styles.moredots} />
            <div className={styles.moredots} />
          </div>
          <span className={styles.MethodText}>더보기</span>
        </button>
      </div>
    </div>
  );
};

export default ShareBottomSheet;
