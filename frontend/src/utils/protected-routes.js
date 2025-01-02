import * as React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
export const ProtectedRoute = ({ children }) => {
    const { isLogin, isLoading } = useAuthStore();
    if (!isLogin) {
        return React.createElement(Navigate, { to: '/login', replace: true });
    }
    return children;
};
export const RedirectAuthenticatedUser = ({ children }) => {
    const { isLogin, user, isLoading } = useAuthStore();
    if (isLogin && user.success) {
        return React.createElement(Navigate, { to: '/dashboard', replace: true });
    }
    return children;
};
