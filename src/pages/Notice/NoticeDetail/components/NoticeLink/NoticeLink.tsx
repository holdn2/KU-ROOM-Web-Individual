import Button from "@/shared/components/Button/Button";
import styles from "./NoticeLink.module.css";

interface NoticeLinkProps {
  link: string;
}

function NoticeLink({ link }: NoticeLinkProps) {
  if (!link || link.trim() === "") {
    return null;
  }

  const handleLinkClick = () => {
    try {
      new URL(link);
      const newWindow = window.open(link, "_blank", "noopener,noreferrer");
      if (!newWindow) {
        console.error("팝업이 차단되었습니다!");
      }
    } catch (error) {
      console.error("유효하지 않은 URL:", error);
    }
  };

  return (
    <div className={styles["notice-link-container"]}>
      <Button onClick={handleLinkClick} variant="primary">
        공지사항 바로가기
      </Button>
    </div>
  );
}

export default NoticeLink;
