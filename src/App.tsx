import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/global.css";
import Home from "./pages/Home/Home";
import Notice from "./pages/Notice/Notice/Notice";
import NoticeDetail from "./pages/Notice/Notice/NoticeDetail/NoticeDetail";
import Login from "./pages/Login/Login";
import FindIdPw from "./pages/FindIdPw/FindIdPw";
import SignupInfo from "./pages/Signup/SignupInfo";
import IdentityVerify from "./pages/Signup/IdentityVerify";
import ProfileSetting from "./pages/ProfileSetting/ProfileSetting";
import Welcome from "./pages/Welcome/Welcome";
import Agreement from "./pages/Signup/Agreement";
import MyPage from "./pages/MyPage/MyPage";
import ProfileChange from "./pages/MyPage/ProfileChange/ProfileChange";
import ChangePw from "./pages/MyPage/ChangePw/ChangePw";
import ChangeNickname from "./pages/MyPage/ChangeNickname/ChangeNickname";
import AlarmSetting from "./pages/MyPage/AlarmSetting/AlarmSetting";
import Alarm from "./pages/Alarm/Alarm";
import MyLocationRanking from "./pages/MyLocationRanking/MyLocationRanking";
import FriendList from "./pages/MyPage/FriendList/FriendList";
import FriendAdd from "./pages/MyPage/FriendAdd/FriendAdd";
import FriendLocationRanking from "./pages/MyLocationRanking/FriendLocationRanking/FriendLocationRanking";
import MapPage from "./pages/Map/MapPage";
import DepartmentSetting from "./pages/MyPage/DepartmentSetting/DepartmentSetting";
import Bookmark from "./pages/Notice/Bookmark/Bookmark";
import Search from "./pages/Notice/Search/Search";
import OAuthCallback from "./pages/OAuthCallback/OAuthCallback";

function App() {
  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     const path = window.location.pathname;
  //     // 토큰이 없을 경우에도 보일 수 있는 화면들.
  //     // 홈이나 지도, 공지사항 등의 경우 페이지는 보임
  //     // 페이지 속 요소들 몇가지만 비활성화시키는 것
  //     // 마이페이지에 접근하는 것도 가능하지만 토큰이 없을 시 모달창으로 회원가입 시에만 접근 가능하다고 표시 후 뒤로 리다이렉트
  //     const excludedPaths = [
  //       "/",
  //       "/login",
  //       "/signup",
  //       "/agreement",
  //       "/findidpw",
  //       "/map",
  //       "/identityverifictaion",
  //       "/agreement",
  //       "/profilesetting",
  //       "/welcome",
  //       "/search",
  //       "/myinfo",
  //       "/oauth/callback",
  //     ];
  //     if (excludedPaths.includes(path)) return;
  //     if (window.location.pathname.startsWith("/notice")) return;

  //     // 토큰 없을 경우 보이면 안되는 화면들
  //     if (document.visibilityState === "visible") {
  //       checkAndReissueToken();
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "alarm",
          element: <Alarm />,
        },
        {
          path: "notice",
          element: <Notice />,
        },
        {
          path: "notice/:category/:id",
          element: <NoticeDetail />,
        },
        {
          path: "signup",
          element: <SignupInfo />,
        },
        {
          path: "identityverifictaion",
          element: <IdentityVerify />,
        },
        {
          path: "agreement",
          element: <Agreement />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "findidpw",
          element: <FindIdPw />,
        },
        {
          path: "oauth/callback",
          element: <OAuthCallback />,
        },
        {
          path: "profilesetting",
          element: <ProfileSetting />,
        },
        {
          path: "welcome",
          element: <Welcome />,
        },
        {
          path: "map",
          element: <MapPage />,
        },
        {
          path: "myinfo",
          element: <MyPage />,
        },
        {
          path: "profilechange",
          element: <ProfileChange />,
        },
        {
          path: "changepw",
          element: <ChangePw />,
        },
        {
          path: "changenickname",
          element: <ChangeNickname />,
        },
        {
          path: "alarmsetting",
          element: <AlarmSetting />,
        },
        {
          path: "friendadd",
          element: <FriendAdd />,
        },
        {
          path: "friendlist",
          element: <FriendList />,
        },
        {
          path: "departmentsetting",
          element: <DepartmentSetting />,
        },
        {
          path: "mylocationranking",
          children: [
            {
              index: true,
              element: <MyLocationRanking />,
            },
            {
              path: "friendlocationranking",
              element: <FriendLocationRanking />,
            },
          ],
        },
        {
          path: "bookmark",
          element: <Bookmark />,
        },
        {
          path: "search",
          element: <Search />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
