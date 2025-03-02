import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileSetting.css";

import Input from "../../components/profilesetting/Input/Input";
import Select from "../../components/profilesetting/Select/Select";
import Button from "../../components/Button/Button";
import BottomSheet from "../../components/profilesetting/BottomSheet/BottomSheet";
import SelectItem from "../../components/profilesetting/SelectItem/SelectItem";

// 더미 데이터
const colleges = [
  "문과대학",
  "이과대학",
  "건축대학",
  "공과대학",
  "사회과학대학",
  "경영대학",
  "부동산과학원",
  "KU융합과학기술원",
  "상허생명과학대학",
  "수의과대학",
  "예술디자인대학",
  "사범대학",
  "상허교양대학",
  "국제대학",
  "융합과학기술원",
  "생명과학대학",
];

const departments = {
  문과대학: [
    "국어국문학과",
    "영어영문학과",
    "중어중문학과",
    "철학과",
    "사학과",
    "지리학과",
    "미디어커뮤니케이션학과",
    "문화콘텐츠학과",
    "문과대학자유전공학부",
  ],
  이과대학: ["수학과", "화학과", "물리학과", "이과대학자유전공학부"],
  건축대학: ["건축학부"],
  공과대학: [
    "사회환경공학부",
    "기계항공공학부",
    "전기전자공학부",
    "화학공학부",
    "컴퓨터공학부",
    "산업경영공학부 산업공학과",
    "산업경영공학부 신산업융합학과",
    "생물공학과",
    "K뷰티산업융합학과",
    "기계・로봇・자동차공학부",
    "화공학부",
    "첨단융합공학부 재료공학과",
    "첨단융합공학부 항공우주・모빌리티공학과",
    "첨단융합공학부 생물공학과",
    "첨단융합공학부 산업공학과",
    "공과대학자유전공학부",
  ],
  사회과학대학: [
    "정치외교학과",
    "경제학과",
    "행정학과",
    "국제무역학과",
    "응용통계학과",
    "융합인재학과",
    "글로벌비즈니스학과",
    "사회과학대학융합전공학부",
  ],
  경영대학: ["경영학과", "기술경영학과"],
  부동산과학원: ["부동산학과"],
  KU융합과학기술원: [
    "미래에너지공학과",
    "스마트운행체공학과",
    "스마트ICT융합공학과",
    "화장품공학과",
    "줄기세포재생공학과",
    "의생명공학과",
    "시스템생명공학과",
    "융합생명공학과",
  ],
  상허생명과학대학: [
    "생명과학특성학과",
    "동물자원과학과",
    "식량자원과학과",
    "축산식품생명공학과",
    "식품유통공학과",
    "환경보건과학과",
    "산림조경학과",
  ],
  수의과대학: ["수의예과", "수의학과"],
  예술디자인대학: [
    "커뮤니케이션디자인학과",
    "산업디자인학과",
    "의상디자인학과",
    "리빙디자인학과",
    "현대미술학과",
    "영상학과",
    "매체연기학과",
  ],
  사범대학: [
    "일어교육과",
    "수학교육과",
    "체육교육과",
    "음악교육과",
    "교육공학과",
    "영어교육과",
    "교직과",
  ],
  상허교양대학: ["KU자유전공학부", "교양교육센터", "국제학부"],
  국제대학: ["국제통상학과", "문화미디어학과", "국제교양교육센터"],
  융합과학기술원: [
    "첨단바이오공학부",
    "생명공학부 시스템생명공학과",
    "생명공학부 융합생명공학과",
    "융합과학기술원자유전공학부",
  ],
  생명과학대학: [
    "동물자원・식품과학・유통학부 동물자원전공",
    "동물자원・식품과학・유통학부 식품과학전공",
    "동물자원・식품과학・유통학부 식품유통전공",
    "환경보건・산림조경학부 환경보건전공",
    "환경보건・산림조경학부 산림조경전공",
    "생명과학특성학과",
    "식량자원과학과",
    "생명과학대학자유전공학부",
  ],
};

const ProfileSetting: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [studentId, setStudentId] = useState("");

  // 임시 선택값 (바텀시트에서 선택한 값)
  const [tempSelectedCollege, setTempSelectedCollege] = useState("");
  const [tempSelectedDepartment, setTempSelectedDepartment] = useState("");

  const [isCollegeSheetOpen, setIsCollegeSheetOpen] = useState(false);
  const [isDepartmentSheetOpen, setIsDepartmentSheetOpen] = useState(false);
  const navigate = useNavigate();

  // 닉네임이 유효한지 확인하는 변수
  const isNicknameValid = nickname.length > 0 && nickname.length <= 10;

  // 학번 유효성 검사 함수
  const isValidStudentId = (id: string) => {
    // 학번이 8자리 이상이고, 앞 4자리(연도)가 현재 연도보다 크지 않은지 확인
    if (id.length >= 9) {
      const yearPrefix = parseInt(id.substring(0, 4));
      const currentYear = new Date().getFullYear();
      return yearPrefix <= currentYear && id.length < 10;
    }
    return true; // 아직 8자리가 안되면 유효하다고 처리 (경고 표시 안함)
  };

  const handleNicknameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleStudentIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setStudentId(value);
  };

  const handleCollegeSelect = (selectedCollege: string) => {
    setTempSelectedCollege(selectedCollege);
  };

  const handleDepartmentSelect = (selectedDepartment: string) => {
    setTempSelectedDepartment(selectedDepartment);
  };

  const handleApplyCollege = (selectedItem: string) => {
    setCollege(selectedItem);
    setDepartment(""); // 대학이 바뀌면 학과 초기화
  };

  const handleApplyDepartment = (selectedItem: string) => {
    setDepartment(selectedItem);
  };

  const handleSubmit = () => {
    // 사용자 정보 저장 로직 (API 호출 등)
    console.log({
      nickname,
      college,
      department,
      studentId,
    });

    navigate("/welcome");
  };

  // 프로필 설정이 완료되었는지 확인
  const isProfileComplete =
    isNicknameValid &&
    college &&
    department &&
    studentId.length >= 9 &&
    isValidStudentId(studentId);

  return (
    <div className="profile-setting">
      <div className="profile-setting-header">
        <div className="profile-setting-cloud"></div>
        <h1 className="profile-setting-title">
          <span className="text-primary">쿠룸</span>에 필요한
          <br />
          프로필을 설정해주세요.
        </h1>
      </div>

      <div className="profile-setting-form">
        <Input
          label="닉네임"
          value={nickname}
          onChange={handleNicknameChange}
          placeholder="닉네임을 입력해주세요 (10자 이하)"
          maxLength={10}
        />

        {/* 닉네임이 유효할 때만 단과대학 선택 표시 */}
        {isNicknameValid && (
          <Select
            label="단과대학"
            value={college}
            placeholder="단과대학을 선택해주세요"
            onClick={() => {
              setTempSelectedCollege(college); // 현재 선택값으로 초기화
              setIsCollegeSheetOpen(true);
            }}
          />
        )}

        {/* 단과대학이 선택되었을 때만 학과 선택 표시 */}
        {isNicknameValid && college && (
          <Select
            label="학과"
            value={department}
            placeholder="학과를 선택해주세요"
            onClick={() => {
              setTempSelectedDepartment(department); // 현재 선택값으로 초기화
              setIsDepartmentSheetOpen(true);
            }}
          />
        )}

        {/* 학과가 선택되었을 때만 학번 입력 표시 */}
        {isNicknameValid && college && department && (
          <Input
            label="학번"
            value={studentId}
            onChange={handleStudentIdChange}
            placeholder="학번을 입력해주세요"
            isInvalid={studentId.length >= 9 && !isValidStudentId(studentId)}
            errorMessage="유효하지 않은 학번입니다."
          />
        )}

        <div className="profile-setting-button">
          <Button onClick={handleSubmit} disabled={!isProfileComplete}>
            다음으로
          </Button>
        </div>
      </div>

      {/* 단과대학 선택 바텀시트 */}
      <BottomSheet
        isOpen={isCollegeSheetOpen}
        onClose={() => setIsCollegeSheetOpen(false)}
        onApply={handleApplyCollege}
        title="단과대학"
        selectedItem={tempSelectedCollege}
      >
        <div className="profile-setting-select-list">
          {colleges.map((item) => (
            <SelectItem
              key={item}
              text={item}
              isSelected={tempSelectedCollege === item}
              onClick={() => handleCollegeSelect(item)}
            />
          ))}
        </div>
      </BottomSheet>

      {/* 학과 선택 바텀시트 */}
      <BottomSheet
        isOpen={isDepartmentSheetOpen}
        onClose={() => setIsDepartmentSheetOpen(false)}
        onApply={handleApplyDepartment}
        title="학과"
        selectedItem={tempSelectedDepartment}
      >
        <div className="profile-setting-select-list">
          {college &&
            departments[college as keyof typeof departments].map((item) => (
              <SelectItem
                key={item}
                text={item}
                isSelected={tempSelectedDepartment === item}
                onClick={() => handleDepartmentSelect(item)}
              />
            ))}
        </div>
      </BottomSheet>
    </div>
  );
};

export default ProfileSetting;
