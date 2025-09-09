import { NOTICE_LIST_MESSAGES } from "../../constants";
import styles from "./ErrorState.module.css";

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  return (
    <div className={styles["error"]} role="alert" aria-live="assertive">
      <p>{error}</p>
      {onRetry && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onRetry?.();
          }}
          type="button" 
          aria-label={NOTICE_LIST_MESSAGES.RETRY_BUTTON}
        >
          {NOTICE_LIST_MESSAGES.RETRY_BUTTON}
        </button>
      )}
    </div>
  );
};