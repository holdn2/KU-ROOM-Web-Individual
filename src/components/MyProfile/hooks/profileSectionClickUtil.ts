import { useNavigate } from "react-router-dom";
import {
  PrivacyPolicyLink,
  ServiceCenterLink,
  TermsAndPoliciesLink,
} from "../../../constants/appInfo";

// 마이페이지 섹션 별 클릭 시 이벤트 처리
export const useHandleSectionClick = (
  setModalType?: (value: string) => void,
  setModalState?: (value: boolean) => void
) => {
  const navigate = useNavigate();
  return (item: string) => {
    switch (item) {
      case "비밀번호 변경하기":
        navigate("/changepw");
        break;
      case "닉네임 변경하기":
        navigate("/changenickname");
        break;
      case "알림 설정":
        navigate("/alarmsetting");
        break;
      case "친구 목록":
        navigate("/friendlist");
        break;
      case "친구 추가":
        navigate("/friendadd");
        break;
      case "약관 및 정책":
        window.open(TermsAndPoliciesLink, "_blank");
        break;

      case "개인정보 처리방침":
        window.open(PrivacyPolicyLink, "_blank");
        break;
      case "고객 센터":
        window.open(ServiceCenterLink, "_blank");
        break;
      case "로그아웃":
        if (setModalType && setModalState) {
          setModalType("logout");
          setModalState(true);
        }
        break;
      case "탈퇴하기":
        if (setModalType && setModalState) {
          setModalType("withdraw");
          setModalState(true);
        }
        break;
      default:
        console.log(item, "실행하기");
    }
  };
};
