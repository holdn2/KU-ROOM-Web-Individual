import React, { useEffect } from "react";
import "./BottomSheet.css";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: (selectedItem: string) => void;
  title: string;
  children: React.ReactNode;
  selectedItem?: string;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  isOpen,
  onClose,
  onApply,
  title,
  children,
  selectedItem,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleApply = () => {
    if (onApply && selectedItem) {
      onApply(selectedItem);
    }
    onClose();
  };

  return (
    <div className="bottom-sheet-container">
      <div className="bottom-sheet-overlay" onClick={onClose}></div>
      <div className="bottom-sheet">
        <div className="bottom-sheet-indicator"></div>
        <div className="bottom-sheet-header">
          <h3 className="bottom-sheet-title">{title}</h3>
          <button className="bottom-sheet-close" onClick={onClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="bottom-sheet-content">{children}</div>
        <button
          className={`apply-button ${selectedItem ? "active" : ""}`}
          onClick={handleApply}
          disabled={!selectedItem}
        >
          적용하기
        </button>
      </div>
      <div className="bottom-sheet-shadow" />
    </div>
  );
};

export default BottomSheet;
