import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Community from "./pages/Community";

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
          path: "/community",
          element: <Community />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
