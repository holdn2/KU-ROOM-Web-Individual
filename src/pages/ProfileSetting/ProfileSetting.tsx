import React, { useState, ChangeEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProfileSetting.css";

import Select from "../../components/profilesetting/Select/Select";
import Button from "../../components/Button/Button";
import BottomSheet from "../../components/profilesetting/BottomSheet/BottomSheet";
import SelectItem from "../../components/profilesetting/SelectItem/SelectItem";
import InputBar from "../../components/InputBar/InputBar";
import { isValidStudentId } from "../../utils/validations";
import { colleges, departments } from "../../constants/dummyData";
import { signupApi } from "../../apis/signup";

const ProfileSetting: React.FC = () => {
  const location = useLocation();
  const { signupEmail, signupId, signupPw, isMarketingOk } =
    location.state || {};

  const [nickname, setNickname] = useState("");
  const [isDuplicatedNickname, setIsDupliactedNickname] = useState(false);
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [studentId, setStudentId] = useState("");
  const [isDuplicatedStudentId, setIsDuplicatedStudentId] = useState(false);

  // 임시 선택값 (바텀시트에서 선택한 값)
  const [tempSelectedCollege, setTempSelectedCollege] = useState("");
  const [tempSelectedDepartment, setTempSelectedDepartment] = useState("");

  const [isCollegeSheetOpen, setIsCollegeSheetOpen] = useState(false);
  const [isDepartmentSheetOpen, setIsDepartmentSheetOpen] = useState(false);
  const navigate = useNavigate();

  // 닉네임이 유효한지 확인하는 변수
  const isNicknameValid = nickname.length > 0 && nickname.length <= 8;

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

  const handleSubmit = async () => {
    const userData = {
      email: signupEmail,
      loginId: signupId,
      password: signupPw,
      studentId: studentId,
      department: department,
      nickname: nickname,
      agreementStatus: isMarketingOk ? "AGREED" : "DISAGREED",
    };
    console.log(userData);
    try {
      const response = await signupApi(
        userData,
        setIsDupliactedNickname,
        setIsDuplicatedStudentId
      );
      console.log("회원가입 성공", response);
      navigate("/welcome");
    } catch (error: any) {
      // console.log("오류 발생", error.message);
    }
  };

  // 프로필 설정이 완료되었는지 확인
  const isProfileComplete =
    isNicknameValid &&
    college &&
    department &&
    studentId.length >= 9 &&
    isValidStudentId(studentId);

  useEffect(() => {
    setIsDupliactedNickname(false);
  }, [nickname]);
  useEffect(() => {
    setIsDuplicatedStudentId(false);
  }, [studentId]);

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
        <InputBar
          label="닉네임"
          type="text"
          value={nickname}
          onChange={handleNicknameChange}
          placeholder="닉네임을 입력해주세요 (8자 이하)"
          maxLength={8}
        />
        {isDuplicatedNickname && (
          <span className="ErrorMsg">이미 존재하는 닉네임입니다.</span>
        )}
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
          <InputBar
            label="학번"
            type="text"
            value={studentId}
            onChange={handleStudentIdChange}
            placeholder="학번을 입력해주세요"
            isInvalid={studentId.length >= 9 && !isValidStudentId(studentId)}
            errorMessage="유효하지 않은 학번입니다."
          />
        )}
        {isDuplicatedStudentId && (
          <span className="ErrorMsg">이미 존재하는 학번입니다.</span>
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
