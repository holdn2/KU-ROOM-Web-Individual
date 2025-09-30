import Header from "@components/Header/Header";
import styles from "./BookmarkHeader.module.css";

interface BookmarkHeaderProps {
  title?: string;
}

export const BookmarkHeader = ({ title = "북마크" }: BookmarkHeaderProps) => {
  return (
    <div className={styles["fixed-header"]}>
      <Header>{title}</Header>
    </div>
  );
};
