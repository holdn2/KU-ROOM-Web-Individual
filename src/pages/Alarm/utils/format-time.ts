export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const diffMs = now.getTime() - date.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  const diffDays = diffHours / 24;

  if (diffHours < 24) {
    const hours = Math.floor(diffHours);
    return `${hours === 0 ? 1 : hours}시간 전`;
  }

  if (diffDays < 7) {
    const days = Math.floor(diffDays);
    return `${days === 0 ? 1 : days}일 전`;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};
