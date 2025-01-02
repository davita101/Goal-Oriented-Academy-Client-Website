import * as React from "react";
import { AppSidebar } from "../components/app-sidebar";
import { NavigationMenuNotification } from "../components/nav-notification";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, } from "../components/ui/breadcrumb";
import { Input } from "../components/ui/input";
import { Separator } from "../components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger, } from "../components/ui/sidebar";
import ToggleDarkMode from "../components/ui/togle-dark-mode";
import { Route, Routes, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import NotFound from "./NotFound";
export default function NavigationRouter() {
    const location = useLocation();
    const path = location.pathname;
    const [isOpen, setIsOpen] = React.useState(() => {
        const savedState = localStorage.getItem("navigationState");
        return savedState ? JSON.parse(savedState) : false; // Default to closed
    });
    React.useEffect(() => {
        localStorage.setItem("navigationState", JSON.stringify(isOpen));
    }, [isOpen]);
    const handleOpen = () => {
        setIsOpen((prevState) => !prevState);
    };
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
        React.createElement(SidebarProvider, { open: isOpen, style: {
                "--sidebar-width": "350px",
            } },
            React.createElement(AppSidebar, null),
            React.createElement(SidebarInset, null,
                React.createElement("header", { className: "sticky top-0 left-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 z-[2]" },
                    React.createElement(SidebarTrigger, { className: "-ml-1", onClick: handleOpen }),
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
                            React.createElement(Input, { placeholder: "Search Student", className: " h-10 w-56 sm:block hidden" }),
                            React.createElement(ToggleDarkMode, null)))),
                React.createElement("div", null,
                    React.createElement(Routes, null,
                        React.createElement(Route, { path: "/dashboard", element: React.createElement(Dashboard, null) }),
                        React.createElement(Route, { path: "/*", element: React.createElement(NotFound, null) })))))));
}
