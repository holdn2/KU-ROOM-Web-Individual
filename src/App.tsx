import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./styles/global.css";
import Home from "./pages/Home/Home";
import Community from "./pages/Community";
import Notice from "./pages/Notice/Notice";
import NoticeDetail from "./pages/Notice/NoticeDetail";
import Login from "./pages/Login/Login";
import FindIdPw from "./pages/FindIdPw/FindIdPw";
import SignupInfo from "./pages/Signup/SignupInfo";
import IdentityVerify from "./pages/Signup/IdentityVerify";
import ProfileSetting from "./pages/ProfileSetting/ProfileSetting";
import Welcome from "./pages/Welcome/Welcome";
import Agreement from "./pages/Signup/Agreement";
import Map from "./pages/Map";
import MyPage from "./pages/MyPage/MyPage";
import ProfileChange from "./pages/MyPage/ProfileChange/ProfileChange";
import ChangePw from "./pages/MyPage/ChangePw/ChangePw";
import ChangeNickname from "./pages/MyPage/ChangeNickname/ChangeNickname";
import AlarmSetting from "./pages/MyPage/AlarmSetting/AlarmSetting";
import Alarm from "./pages/Alarm/Alarm";
import MyLocationRanking from "./pages/MyLocationRanking/MyLocationRanking";
import FriendList from "./pages/MyPage/FriendList/FriendList";
import FriendAdd from "./pages/MyPage/FriendAdd/FriendAdd";

function App() {
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
          element: <Map />,
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
          path: "mylocationranking",
          element: <MyLocationRanking />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
