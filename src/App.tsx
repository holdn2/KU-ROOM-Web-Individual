import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/global.css";
import Home from "./pages/Home/Home";
import Community from "./pages/Community";
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
import { useEffect } from "react";
import { scheduleTokenRefresh } from "./apis/utils/tokenManager";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const expireAtStr = localStorage.getItem("accessExpireIn");

    if (token && expireAtStr) {
      const expireAt = parseInt(expireAtStr, 10); // ms 단위로 저장된 값
      const now = Date.now();
      const remain = expireAt - now; // ms 단위로 남은 시간 계산

      if (remain > 60_000) {
        // 1분(60,000ms) 이상 남았을 때만 예약
        scheduleTokenRefresh(remain); // ms 단위 그대로 전달
      }
    }
  }, []);
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
          path: "community",
          element: <Community />,
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
