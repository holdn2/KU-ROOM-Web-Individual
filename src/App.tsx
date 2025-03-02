import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Community from "./pages/Community";
import Notice from "./pages/Notice";
import Login from "./pages/Login/Login";
import FindIdPw from "./pages/FindIdPw/FindIdPw";
import SignupInfo from "./pages/Signup/SignupInfo";
import IdentityVerify from "./pages/Signup/IdentityVerify";

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
          path: "notice",
          element: <Notice />,
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
          path: "login",
          element: <Login />,
        },
        {
          path: "findidpw",
          element: <FindIdPw />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
