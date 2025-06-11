import React, { useEffect, useState } from "react";
import styles from "./ShareLocationModal.module.css";
import ReactModal from "react-modal";
import Button from "../../Button/Button";
import cautionIcon from "../../../assets/icon/editFriend/cautionIcon.svg";
import { UserLocationData } from "../../../../types/mapTypes";

interface ShareLocationModalProps {
  modalState: boolean;
  isSharedLocation: boolean;
  currentLocation: UserLocationData | null;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSharedLocation: (value: boolean) => void;
}

const ShareLocationModal: React.FC<ShareLocationModalProps> = ({
  modalState,
  isSharedLocation,
  currentLocation,
  setModalState,
  setIsSharedLocation,
}) => {
  const handleCloseModal = () => setModalState(false);
  const [nearBuilding, setNearBuilding] = useState("");

  // 서버에 각각 요청
  const handleSharingLocation = () => {
    console.log("서버에 내 위치 공유 요청");
    console.log("공유하는 현재 위치 : ", currentLocation);
    setIsSharedLocation(true);
    setModalState(false);
  };
  const handleUnSharingLocation = () => {
    console.log("서버에 공유 해제 요청");
    setIsSharedLocation(false);
    setModalState(false);
  };

  useEffect(() => {
    // 현재 위치에 따른 가까운 건물 받아오기. 서버 요청 로직 필요함
    const response = "상허기념도서관";
    setNearBuilding(response);
  }, []);

  return (
    <ReactModal
      isOpen={modalState}
      className={styles.LocationShareModalContainer}
      overlayClassName={styles.Overlay}
      ariaHideApp={false}
    >
      <img className={styles.CautionIcon} src={cautionIcon} alt="느낌표" />
      <div className={styles.TextWrapper}>
        {isSharedLocation ? (
          <>
            <span className={styles.InformText}>
              <span className={styles.BoldText}>위치 공유를 해제</span>
              하시겠습니까?
            </span>
            <span className={styles.AdditionalInform}>
              친구들에게 현재 위치가 보이지 않게 됩니다.
            </span>
          </>
        ) : (
          <>
            <span className={styles.InformText}>
              <span className={styles.BoldText}>{nearBuilding}</span>(으)로
              <br />
              <span className={styles.BoldText}>위치를 공유</span>
              하시겠습니까?
            </span>
            <span className={styles.AdditionalInform}>
              친구들에게 현재 위치가 공유됩니다.
            </span>
          </>
        )}
      </div>
      <div className={styles.ButtonWrapper}>
        <Button variant="tertiary" onClick={handleCloseModal} size="sm">
          취소
        </Button>
        <Button
          onClick={
            isSharedLocation ? handleUnSharingLocation : handleSharingLocation
          }
          size="sm"
        >
          확인
        </Button>
      </div>
    </ReactModal>
  );
};

export default ShareLocationModal;
