import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Community from "./pages/Community";
import Notice from "./pages/Notice";

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
          path: "/notice",
          element: <Notice />,
        },
        {
          path: "/community",
          element: <Community />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
