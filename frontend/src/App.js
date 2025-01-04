var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from "react";
import { AppSidebar } from "./components/app-sidebar";
import { NavigationMenuNotification } from "./components/nav-notification";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, } from "./components/ui/breadcrumb";
import { Separator } from "./components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "./components/ui/sidebar";
import ToggleDarkMode from "./components/ui/togle-dark-mode";
import { Route, Routes, useNavigate } from "react-router-dom";
import NotFound from "./page/NotFound";
import { RedirectAuthenticatedUser } from "./utils/protected-routes";
import Login from "./page/Login";
import { useAuthStore } from "./store/authStore";
import Loading from "./components/loading";
import DashboardRoutes from "./routes/dashboard-routes";
export default function AppRoutes() {
    const { user, checkAuth, isLogin } = useAuthStore();
    const [loading, setLoading] = React.useState(true);
    const path = location.pathname;
    const navigate = useNavigate();
    React.useEffect(() => {
        const authenticate = () => __awaiter(this, void 0, void 0, function* () {
            yield checkAuth();
            setLoading(false);
        });
        authenticate();
    }, [checkAuth]);
    React.useEffect(() => {
        if (!loading && !user) {
            navigate("/login");
        }
    }, [user, navigate, loading]);
    const BreadRender = (name) => {
        return (React.createElement(React.Fragment, null,
            React.createElement(BreadcrumbItem, { className: "hidden md:block" },
                React.createElement(BreadcrumbLink, { href: `/${name}` }, name)),
            React.createElement(BreadcrumbSeparator, { className: "hidden md:block" }),
            !path.includes(`/${name}/${name}`) && (React.createElement(React.Fragment, null,
                React.createElement(BreadcrumbItem, { className: "hidden md:block" },
                    React.createElement(BreadcrumbLink, { href: `${path}` }, path.replace(`${name}`, "").replace(/\/+/g, "")))))));
    };
    if (loading) {
        return React.createElement(Loading, { className: "h-screen" });
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(SidebarProvider, { style: {
                "--sidebar-width": "250px",
            } },
            (isLogin && (user === null || user === void 0 ? void 0 : user.success)) && (React.createElement(AppSidebar, null)),
            React.createElement(SidebarInset, null,
                user && (React.createElement("header", { className: "sticky top-0 left-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 z-[2]" },
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
                        "(!loading ? ",
                        React.createElement(Route, { path: "*", element: React.createElement(NotFound, null) }),
                        ")",
                        React.createElement(Route, { path: "/dashboard/*", element: React.createElement(DashboardRoutes, null) })))))));
}
