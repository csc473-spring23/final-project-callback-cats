import React from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import userAuth from "../Custom_hook/UserAuth";

const UserRequired = () => {
  let auth_: any;
  auth_ = userAuth();
  const { auth } = auth_;
  const location = useLocation();
  const nav = useNavigate();

  return auth?.dataEmail ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default UserRequired;
