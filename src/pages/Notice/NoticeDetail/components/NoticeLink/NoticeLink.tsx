import Button from "@/shared/components/Button/Button";
import styles from "./NoticeLink.module.css";

interface NoticeLinkProps {
  link: string;
}

function NoticeLink({ link }: NoticeLinkProps) {
  const handleLinkClick = () => {
    window.open(link, "_blank", "noopener,noreferrer");
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
