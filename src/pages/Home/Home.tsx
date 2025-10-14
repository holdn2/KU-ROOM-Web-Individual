// 홈 페이지
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { checkIsSharedApi } from "@apis/map";
import { getTokenByAuthCode } from "@apis/auth";
import { useUserStore } from "@stores/userStore";
// import Splash from "@components/Splash";
import BottomBar from "@components/BottomBar/BottomBar";
import Header from "@components/Header/Header";
import ShareLocationModal from "@components/ShareLocationModal/ShareLocationModal";
import { isMyLocationInSchool } from "@utils/mapRangeUtils";
import { Coordinate } from "@/shared/types";

import HomeMenu from "./components/HomeMenu/HomeMenu";
import HomeMiniMap from "./components/HomeMiniMap/HomeMiniMap";
import HomeSildeBanner from "./components/HomeSlideBanner/HomeSildeBanner";
import FriendLocation from "./components/FriendLocation/FriendLocation";
import MyLocationRanking from "./components/MyLocationRanking/MyLocationRanking";
import HomeNotice from "./components/HomeNotice/HomeNotice";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser } = useUserStore();
  // const [showSplash, setShowSplash] = useState(true);
  const [isSharedLocation, setIsSharedLocation] = useState(false); // 내 위치 공유상태인지 아닌지
  const [sharedLocationName, setSharedLocationName] = useState<string | null>(
    null
  );
  const [hasNewAlarm, setHasNewAlarm] = useState(false); // 새로운 알람이 있는지
  // 공유 상태 확인 트리거 키
  const [locationSharedRefreshKey, setLocationSharedRefreshKey] = useState(0);

  // 학교 내부에 있는지 상태
  const [isInSchool, setIsInSchool] = useState(false);
  // vercel 배포 시 에러 방지용
  console.log("학교 내부인지?:", isInSchool);

  // 유저의 위치와 가장 가까운 위치 저장할 상태
  const [nearLocation, setNearLocation] = useState("");
  const [ableToShare, setAbleToShare] = useState(false);

  // 내 위치 공유 버튼 모달 상태
  const [shareModalState, setShareModalState] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Coordinate | null>(
    null
  ); // 현재 위치

  const [tryToRerender, setTryToRerender] = useState(false);

  // 현재 내 위치 공유 상태 확인 함수
  const getIsMySharedInfo = async () => {
    try {
      const response = await checkIsSharedApi();
      console.log("현재 내 위치 공유 상태 : ", response);
      setIsSharedLocation(response.isActive);
      setSharedLocationName(response.placeName);
    } catch (error) {
      console.error("위치 공유 상태 확인 실패 : ", error);
    }
  };

  useEffect(() => {
    console.log("위치공유 상태는?:", isSharedLocation);

    // OAuth 콜백 처리 중이면 API 호출 스킵
    const authCode =
      searchParams.get("token") ||
      searchParams.get("authCode") ||
      searchParams.get("code");

    if (authCode) return;

    // 현재 내 위치 공유 상태 확인
    getIsMySharedInfo();
  }, [locationSharedRefreshKey, searchParams]);
  useEffect(() => {
    // 현재 내 위치가 학교 내부인지 검증
    isMyLocationInSchool(setIsInSchool, setCurrentLocation);
  }, []);
  // **********************************************************************

  // OAuth 콜백 처리 (백엔드가 /?token=xxx 로 리다이렉트하는 경우)
  useEffect(() => {
    const handleOAuthCallback = async () => {
      const authCode =
        searchParams.get("token") ||
        searchParams.get("authCode") ||
        searchParams.get("code");

      if (!authCode) return;

      try {
        const response = await getTokenByAuthCode(authCode);

        if (response?.data) {
          const {
            tokenResponse: { accessToken, refreshToken, isFirstLogin },
            userResponse,
          } = response.data;

          // 신규 회원인 경우
          if (isFirstLogin) {
            sessionStorage.setItem("tempAccessToken", accessToken);
            sessionStorage.setItem("tempRefreshToken", refreshToken);
            sessionStorage.setItem("socialAuthCode", authCode);
            sessionStorage.setItem(
              "oauthUserInfo",
              JSON.stringify(userResponse)
            );
            navigate("/agreement");
            return;
          }

          // 기존 회원인 경우
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          setUser(userResponse);

          // URL에서 token 파라미터 제거
          window.history.replaceState({}, "", "/");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("OAuth 토큰 교환 중 오류:", error);

        // 에러 발생 시 잠시 후 토큰 파라미터 제거하고 페이지 새로고침
        // (백엔드에서 토큰은 발급했지만 응답 중 에러가 발생한 경우 대응)
        setTimeout(() => {
          window.history.replaceState({}, "", "/");
          window.location.reload();
        }, 1000);
      }
    };

    handleOAuthCallback();
  }, [searchParams, navigate, setUser]);

  // 로그인 여부 확인
  useEffect(() => {
    const authCode =
      searchParams.get("token") ||
      searchParams.get("authCode") ||
      searchParams.get("code");

    // OAuth 콜백 처리 중이면 로그인 체크 스킵
    if (authCode) return;

    const token = localStorage.getItem("accessToken");
    if (!token) {
      localStorage.clear();
      navigate("/login");
      return;
    }

    setHasNewAlarm(true);
  }, [searchParams, navigate]);

  // OAuth 콜백 처리 중이거나 토큰이 없으면 로딩 화면 표시
  const authCode =
    searchParams.get("token") ||
    searchParams.get("authCode") ||
    searchParams.get("code");
  const hasToken = localStorage.getItem("accessToken");

  if (authCode || !hasToken) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div>로그인 처리 중...</div>
      </div>
    );
  }

  return (
    <div>
      <Header hasNewAlarm={hasNewAlarm}>홈</Header>
      <div className={styles.HomeContentWrapper}>
        <HomeSildeBanner />
        <HomeMenu />
        {/* {isInSchool && (
          <HomeMiniMap
            isSharedLocation={isSharedLocation}
            setModalState={setShareModalState}
          />
        )} */}
        {currentLocation !== null && (
          <HomeMiniMap
            isSharedLocation={isSharedLocation}
            setModalState={setShareModalState}
            currentLocation={currentLocation}
            sharedLocationName={sharedLocationName}
            setNearLocation={setNearLocation}
            setAbleToShare={setAbleToShare}
          />
        )}
        <FriendLocation userSharedLocation={sharedLocationName} />
        <MyLocationRanking updateTrigger={tryToRerender} />
        <HomeNotice />
      </div>
      <BottomBar />
      <ShareLocationModal
        modalState={shareModalState}
        isSharedLocation={isSharedLocation}
        ableToShare={ableToShare}
        nearLocation={nearLocation}
        setModalState={setShareModalState}
        refreshSharedStatus={() =>
          setLocationSharedRefreshKey((prev) => prev + 1)
        }
        tryRerendering={() => setTryToRerender(!tryToRerender)}
      />
    </div>
  );
};

export default Home;
