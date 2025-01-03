import * as React from "react";
import { AppSidebar } from "./components/app-sidebar";
import { NavigationMenuNotification } from "./components/nav-notification";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, } from "./components/ui/breadcrumb";
import { Separator } from "./components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "./components/ui/sidebar";
import ToggleDarkMode from "./components/ui/togle-dark-mode";
import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from "./page/NotFound";
import { ProtectedRoute, RedirectAuthenticatedUser } from "./utils/protected-routes";
import Login from "./page/Login";
import { useAuthStore } from "./store/authStore";
import Dashboard from "./page/Dashboard";
export default function App() {
    const location = useLocation();
    const { user, isLogin, isLoading } = useAuthStore();
    const path = location.pathname;
    const BreadRender = (name) => {
        return (React.createElement(React.Fragment, null,
            React.createElement(BreadcrumbItem, { className: "hidden md:block" },
                React.createElement(BreadcrumbLink, { href: `/${name}` }, name)),
            React.createElement(BreadcrumbSeparator, { className: "hidden md:block" }),
            !path.includes(`/${name}/${name}`) && (React.createElement(React.Fragment, null,
                React.createElement(BreadcrumbItem, { className: "hidden md:block" },
                    React.createElement(BreadcrumbLink, { href: `${path}` }, path.replace(`${name}`, "").replace(/\/+/g, "")))))));
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(SidebarProvider, { style: {
                "--sidebar-width": "250px",
            } },
            (isLogin && (user === null || user === void 0 ? void 0 : user.success)) && (React.createElement(AppSidebar, null)),
            React.createElement(SidebarInset, null,
                true && (React.createElement("header", { className: "sticky top-0 left-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 z-[2]" },
                    React.createElement(SidebarTrigger, { className: "-ml-1" }),
                    React.createElement(Separator, { orientation: "vertical", className: "mr-2 h-4" }),
                    React.createElement(Breadcrumb, { className: "flex-1 flex justify-between items-center" },
                        React.createElement("div", null,
                            React.createElement(BreadcrumbList, null,
                                React.createElement(BreadcrumbItem, { className: "hidden md:block" },
                                    React.createElement(BreadcrumbLink, { href: `/dashboard` }, "home")),
                                React.createElement(BreadcrumbSeparator, { className: "hidden md:block" }),
                                path.includes(`/dashboard`) && BreadRender("dashboard"),
                                path.includes(`/widgets`) && BreadRender("widgets"),
                                path.includes(`/applications`) && BreadRender("applications"),
                                path.includes(`/controls`) && BreadRender("controls"))),
                        React.createElement("div", { className: "flex gap-2" },
                            React.createElement(NavigationMenuNotification, null),
                            React.createElement(ToggleDarkMode, null))))),
                React.createElement("div", null,
                    React.createElement(Routes, null,
                        React.createElement(Route, { path: "/login", element: React.createElement(RedirectAuthenticatedUser, null, React.createElement(Login, null)) }),
                        React.createElement(Route, { path: "/*", element: React.createElement(ProtectedRoute, null,
                                React.createElement(Dashboard, null)) }),
                        React.createElement(Route, { path: "*", element: React.createElement(NotFound, null) })))))));
}
