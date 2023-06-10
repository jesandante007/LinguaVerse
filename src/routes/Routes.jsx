import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import Home from "../pages/Home/Home";
import AllInstructors from "../pages/AllInstructors";
import AllClasses from "../pages/AllClasses";
import Dashboard from "../layouts/Dashboard";
import SelectedClasses from "../pages/Dashboard/SelectedClasses";
import Payment from "../pages/Dashboard/Payment";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import EnrolledClasses from "../pages/Dashboard/EnrolledClasses";
import PrivateRoute from "./PrivateRoute";
import AddClass from "../pages/Dashboard/AddClass";
import MyClasses from "../pages/Dashboard/MyClasses";
import UpdateClass from "../pages/Dashboard/UpdateClass";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import ManageClasses from "../pages/Dashboard/ManageClasses";
import SinglePayment from "../pages/Dashboard/SinglePayment";

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
        element: <AllInstructors />,
      },
      {
        path: "allClasses",
        element: <AllClasses />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "selectedClasses",
        element: <SelectedClasses />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: 'payment/:id',
        element: <SinglePayment />
      },
      {
        path: "enrolledClasses",
        element: <EnrolledClasses />,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
      {
        path: "addClass",
        element: <AddClass />,
      },
      {
        path: 'myClasses',
        element: <MyClasses />
      },
      {
        path: 'updateClass/:id',
        element: <UpdateClass />,
      },
      {
        path: 'manageUsers',
        element: <ManageUsers />
      },
      {
        path: 'manageClasses',
        element: <ManageClasses />
      }
    ],
  },
]);

export default router;
