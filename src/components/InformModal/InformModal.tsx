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
  setModalState: React.Dispatch<React.SetStateAction<boolean>>;
  setFindStep: React.Dispatch<React.SetStateAction<number>>;
};

const InformModal = ({
  modalType,
  modalState,
  setModalState,
  setFindStep,
}: Props) => {
  const navigate = useNavigate();
  const handleVerifyCloseModal = () => {
    setFindStep(1);
    setModalState(false);
  };
  const handleReLoginCloseModal = () => {
    setModalState(false);
    navigate("/login");
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
      default:
        return null;
    }
  };
  return <div>{renderInformModal()}</div>;
};

export default InformModal;
