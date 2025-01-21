import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
    const { currentUser } = useSelector((state) => state.user);

    // <Outlet /> ใช้สำหรับแสดงผล chiild element ที่ถูกส่งเข้ามา
    return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}
