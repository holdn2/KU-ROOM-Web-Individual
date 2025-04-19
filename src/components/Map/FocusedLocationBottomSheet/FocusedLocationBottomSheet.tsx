import React from "react";
import styles from "./FocusedLocationBottomSheet.module.css";

interface FocusedLocationBottomSheetProps {
  hasFocusedMarker: boolean;
  isExpandedFocusedSheet: boolean;
  setIsExpandedFocusedSheet: (value: boolean) => void;
  focusedMarkerTitle: string | null;
}

const FocusedLocationBottomSheet: React.FC<FocusedLocationBottomSheetProps> = ({
  hasFocusedMarker,
  isExpandedFocusedSheet,
  setIsExpandedFocusedSheet,
  focusedMarkerTitle,
}) => {
  console.log(
    hasFocusedMarker,
    isExpandedFocusedSheet,
    setIsExpandedFocusedSheet,
    focusedMarkerTitle
  );
  return <div className={styles.asdf}>FocusedLocationBottomSheet</div>;
};

export default FocusedLocationBottomSheet;
