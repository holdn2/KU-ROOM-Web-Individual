// 로직 진행 시 뜨는 모달창 관련
import React from "react";
import ReactModal from "react-modal";
import styles from "./InformModal.module.css";
import cloudIcon from "../../assets/icon/cloud.svg";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

type Props = {
  modalType: string;
  modalState: boolean;
  changedNickname?: string;
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  setModalType?: React.Dispatch<React.SetStateAction<string>>;
  setFindStep?: React.Dispatch<React.SetStateAction<number>>;
};

const InformModal = ({
  modalType,
  modalState,
  changedNickname,
  setModalState,
  setModalType,
  setFindStep,
}: Props) => {
  const navigate = useNavigate();
  const handleVerifyCloseModal = () => {
    if (setFindStep) {
      setFindStep(1);
    }
    setModalState(false);
  };
  const handleFailedCloseModal = () => {
    if (setModalType) {
      setModalType("informEmail");
    }
    setModalState(false);
  };
  const handleReLoginCloseModal = () => {
    setModalState(false);
    navigate("/login");
  };
  const handleNicknameChangeCloseModal = () => {
    setModalState(false);
    navigate(-1);
  };
  const renderInformModal = () => {
    switch (modalType) {
      case "informEmail":
        return (
          <ReactModal
            isOpen={modalState}
            className={styles.InformModalContainer}
            overlayClassName={styles.Overlay}
            ariaHideApp={false}
          >
            <img src={cloudIcon} alt="쿠룸아이콘" style={{ width: "30px" }} />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <span className={styles.InformText}>
                안내 이메일을 발송하였습니다.
              </span>
              <span className={styles.Graytext}>
                메일이 안 왔다면, 스팸함을 확인해주세요.
              </span>
            </div>
            <Button onClick={handleVerifyCloseModal}>확인</Button>
          </ReactModal>
        );
      case "EmailFailed":
        return (
          <ReactModal
            isOpen={modalState}
            className={styles.InformModalContainer}
            overlayClassName={styles.Overlay}
            ariaHideApp={false}
          >
            <img src={cloudIcon} alt="쿠룸아이콘" style={{ width: "30px" }} />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <span className={styles.InformText}>
                이메일 전송에 실패했습니다.
              </span>
              <span className={styles.Graytext}>
                입력하신 이메일이 맞는지 확인해주세요.
              </span>
            </div>
            <Button onClick={handleFailedCloseModal}>확인</Button>
          </ReactModal>
        );
      case "NewPassword":
        return (
          <ReactModal
            isOpen={modalState}
            className={styles.InformModalContainer}
            overlayClassName={styles.Overlay}
            ariaHideApp={false}
          >
            <img src={cloudIcon} alt="쿠룸아이콘" style={{ width: "30px" }} />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <span className={styles.InformText}>
                비밀번호가 재설정되었습니다.
              </span>
              <span className={styles.Graytext}>다시 로그인해주세요.</span>
            </div>
            <Button onClick={handleReLoginCloseModal}>확인</Button>
          </ReactModal>
        );
      case "NicknameChange":
        return (
          <ReactModal
            isOpen={modalState}
            className={styles.InformModalContainer}
            overlayClassName={styles.Overlay}
            ariaHideApp={false}
          >
            <img src={cloudIcon} alt="쿠룸아이콘" style={{ width: "30px" }} />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "6px" }}
            >
              <span className={styles.InformText}>
                {changedNickname} (으)로
              </span>
              <span className={styles.Graytext}>
                닉네임 변경이 완료되었습니다.
              </span>
            </div>
            <Button onClick={handleNicknameChangeCloseModal}>확인</Button>
          </ReactModal>
        );
      default:
        return null;
    }
  };
  return <div>{renderInformModal()}</div>;
};

export default InformModal;
