// 형식에 맞는지 확인하는 함수들

// 이메일 형식이 맞는지
export const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// 비밀번호 형식이 맞는지
export const isValidPassword = (password: string) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

// 학번 형식이 맞는지
export const isValidStudentId = (id: string) => {
  // 학번이 8자리 이상이고, 앞 4자리(연도)가 현재 연도보다 크지 않은지 확인
  if (id.length >= 9) {
    const yearPrefix = parseInt(id.substring(0, 4));
    const currentYear = new Date().getFullYear();
    return yearPrefix <= currentYear && id.length < 10;
  }
  return true; // 아직 8자리가 안되면 유효하다고 처리 (경고 표시 안함)
};
