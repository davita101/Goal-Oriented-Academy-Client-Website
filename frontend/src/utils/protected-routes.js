import * as React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
export const ProtectedRoute = ({ children }) => {
    const { isLogin } = useAuthStore();
    if (!isLogin) {
        return React.createElement(Navigate, { to: '/login', replace: true });
    }
    return children;
};
export const RedirectAuthenticatedUser = ({ children }) => {
    const { isLogin, user } = useAuthStore();
    if (isLogin && (user === null || user === void 0 ? void 0 : user.success)) {
        return React.createElement(Navigate, { to: '/dashboard', replace: true });
    }
    return children;
};
