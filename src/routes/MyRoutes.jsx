import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import CreateBlog from "../components/createBlog/CreateBlog";
import ReadingPage from "../pages/ReadingPage";
import Profile from "../pages/Profile";
import AdminPanel from "../pages/AdminPanel";
import NotFoundPage from "../pages/NotFoundPage";

const MyRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/createblog",
        element: <CreateBlog />,
      },
      {
        path: "/readblog",
        element: <ReadingPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/admin-panel",
        element: <AdminPanel />,
      },
      {
        path: "/*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default MyRoutes;
