import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Home from "../pages/Home/Home";
import AllInstructors from "../pages/AllInstructors";
import AllClasses from "../pages/AllClasses";
import Dashboard from "../layouts/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
      {
        path: "allInstructors",
        element: <AllInstructors />
      },
      {
        path: "allClasses",
        element: <AllClasses />
      }
    ],
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      
    ]
  }
]);

export default router;
