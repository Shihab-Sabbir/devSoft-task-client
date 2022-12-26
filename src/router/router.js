import { createBrowserRouter } from "react-router-dom";
import Booking from "../pages/Booking/Booking";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Logout from "../pages/Logout/Logout";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";
import Layout from "../Layout/Layout";
import Errorpages from "../pages/ErrorPage/ErrorPage"
import DashBoardLayout from "../Layout/DashBoardLayout"
import ProtectedRoute from "./ProtectedRoute";
import DashboardWellcome from "../pages/DashboardWellcome/DashboardWellcome";
import AdminRoute from "./AdminRoute";
import AdminPanel from "../pages/admin/AdminPanel";
import MyBooking from "../pages/User/MyBooking";
export const router = createBrowserRouter([
    {
        path: '/', errorElement: <Errorpages />, element: <Layout />, children: [
            { path: '/', element: <Home /> },
            { path: '/login', element: <Login /> },
            { path: '/logout', element: <Logout /> },
            { path: '/register', element: <Register /> },
            { path: '/profile', element: <Profile /> },
            { path: '/booking', element: <Booking /> },
        ]
    },
    {
        path: '/dashboard', errorElement: <Errorpages />, element: <ProtectedRoute><DashBoardLayout /></ProtectedRoute>, children: [
            { path: '/dashboard', element: <DashboardWellcome /> },
            { path: '/dashboard/my-booking', element: <MyBooking /> },
            { path: '/dashboard/all-bookings', element: <AdminRoute><AdminPanel /></AdminRoute> }
        ]
    }
])