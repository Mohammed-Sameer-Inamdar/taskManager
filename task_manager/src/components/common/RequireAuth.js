import React from "react";
import { useSelector } from "react-redux";
import { accessToken } from "../../store/slices/authSlice";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Header from "./Header";

const RequireAuth = () => {
    const token = useSelector(accessToken);
    const location = useLocation();
    return token ?
        <div className="App">
            <Header/>
            <Outlet />
        </div>
        :
        <Navigate to="/login" state={{ from: location }} replace />
}

export default RequireAuth;