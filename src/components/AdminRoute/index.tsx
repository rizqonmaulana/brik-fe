import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from '../../redux/store'

const AdminRoute = () => {
    const { userInfo } = useSelector((state:RootState) => state.auth);
    return userInfo && userInfo.role === 'ADMIN' ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
