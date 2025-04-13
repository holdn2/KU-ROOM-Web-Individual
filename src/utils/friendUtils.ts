// 케밥 버튼을 눌렀을 때 팝업이 뜨도록 하는 로직
export const openFriendEditPopup = (
  event: React.MouseEvent,
  nickname: string,
  setEditPopupState: React.Dispatch<
    React.SetStateAction<{
      isPopupOpen: boolean;
      popupPosition: { top: number; left: number };
      editFriend: string;
    }>
  >
) => {
  // getBoundingClientRect는 요소의 크기와 뷰포트에 상대적인 위치 정보를 제공하는 DOMRect 객체 반환
  // 픽셀단위로 나타낸다.
  const friendContainer = (event.target as HTMLElement).getBoundingClientRect();
  // 팝업 관련 상태 변경
  setEditPopupState({
    isPopupOpen: true,
    popupPosition: {
      top: friendContainer.bottom + window.scrollY + 5,
      left: friendContainer.left + window.scrollX - 200,
    },
    editFriend: nickname,
  });
};

// 친구 수정 팝업 뜬 상태에서 외부 클릭 시 팝업 닫기
export const useOutsideClick = (
  popupRef: React.RefObject<HTMLDivElement | null>,
  isPopupOpen: boolean,
  setIsPopupOpen: (value: boolean) => void
) => {
  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsPopupOpen(false);
    }
  };

  if (isPopupOpen) {
    document.addEventListener("mousedown", handleClickOutside);
  }

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
};
