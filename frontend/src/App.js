import * as React from "react";
import Login from "./page/Login";
import { Route, Routes, useNavigate, } from "react-router-dom";
import NavigationRouter from "./page/NavigationRouter";
import { Toaster } from "./components/ui/sonner";
import { useAuthStore } from "./store/authStore";
import { ProtectedRoute, RedirectAuthenticatedUser } from "./utils/protected-routes";
export default function App() {
    const navigate = useNavigate();
    const { checkAuth, user, isLogin } = useAuthStore();
    React.useEffect(() => {
        checkAuth();
    }, [checkAuth]);
    React.useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user]);
    return (React.createElement("div", null,
        React.createElement("header", { className: "text-green-300  text-3xl font-bold p-2 absolute" }, "GOA"),
        React.createElement(Routes, null,
            React.createElement(Route, { path: "/login", element: React.createElement(RedirectAuthenticatedUser, null,
                    React.createElement(Login, null)) }),
            React.createElement(Route, { path: "/*", element: React.createElement(ProtectedRoute, null,
                    React.createElement(NavigationRouter, null)) })),
        React.createElement(Toaster, null)));
}
