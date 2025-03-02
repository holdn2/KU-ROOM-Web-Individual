import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Community from "./pages/Community";
import Notice from "./pages/Notice";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import FindIdPw from "./pages/FindIdPw/FindIdPw";

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
          element: <Signup />,
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
