import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Leaderboards from "./pages/Leaderboards";
import ThreadDetail from "./pages/ThreadDetail";
import CreateDiskusi from "./pages/CreateDiskusi";
import RootPage from "./pages/RootPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootPage />,
      errorElement: <div>Error</div>,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/leaderboards",
          element: <Leaderboards />,
        },
        {
          path: "/threads/:id",
          element: <ThreadDetail />,
        },
        {
          path: "/create-diskusi",
          element: <CreateDiskusi />,
        },
      ].filter((item) => item),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
