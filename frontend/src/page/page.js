"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = User;
var react_1 = require("react");
var app_sidebar_1 = require("@/components/app-sidebar");
var nav_notification_1 = require("@/components/nav-notification");
var breadcrumb_1 = require("@/components/ui/breadcrumb");
var input_1 = require("@/components/ui/input");
var separator_1 = require("@/components/ui/separator");
var sidebar_1 = require("@/components/ui/sidebar");
var togle_dark_mode_1 = require("@/components/ui/togle-dark-mode");
var react_router_dom_1 = require("react-router-dom");
function User() {
    var location = (0, react_router_dom_1.useLocation)();
    var path = location.pathname;
    var userId = path.split('/')[2];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(sidebar_1.SidebarProvider, { style: {
                "--sidebar-width": "350px",
            } },
            react_1.default.createElement(app_sidebar_1.AppSidebar, null),
            react_1.default.createElement(sidebar_1.SidebarInset, null,
                react_1.default.createElement("header", { className: "sticky top-0 left-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 z-[2]" },
                    react_1.default.createElement(sidebar_1.SidebarTrigger, { className: "-ml-1" }),
                    react_1.default.createElement(separator_1.Separator, { orientation: "vertical", className: "mr-2 h-4" }),
                    react_1.default.createElement(breadcrumb_1.Breadcrumb, { className: "flex-1 flex justify-between items-center" },
                        react_1.default.createElement("div", null,
                            react_1.default.createElement(breadcrumb_1.BreadcrumbList, null,
                                react_1.default.createElement(breadcrumb_1.BreadcrumbItem, { className: "hidden md:block" },
                                    react_1.default.createElement(breadcrumb_1.BreadcrumbLink, { href: "/dashboard/".concat(userId, "/") }, "home")),
                                react_1.default.createElement(breadcrumb_1.BreadcrumbSeparator, { className: "hidden md:block" }),
                                path.includes("/dashboard/".concat(userId, "/")) && (react_1.default.createElement(react_1.default.Fragment, null,
                                    react_1.default.createElement(breadcrumb_1.BreadcrumbItem, { className: "hidden md:block" },
                                        react_1.default.createElement(breadcrumb_1.BreadcrumbLink, { href: "/dashboard/".concat(userId, "/") }, "dashboard")),
                                    react_1.default.createElement(breadcrumb_1.BreadcrumbSeparator, { className: "hidden md:block" }))),
                                path === "/dashboard/".concat(userId, "/all-squad-member") && (react_1.default.createElement(react_1.default.Fragment, null,
                                    react_1.default.createElement(breadcrumb_1.BreadcrumbItem, { className: "hidden md:block" },
                                        react_1.default.createElement(breadcrumb_1.BreadcrumbLink, { href: "#" }, "All Squad Members")),
                                    react_1.default.createElement(breadcrumb_1.BreadcrumbSeparator, { className: "hidden md:block" }))),
                                path === "/dashboard/".concat(userId, "/all-leader-info") && (react_1.default.createElement(react_1.default.Fragment, null,
                                    react_1.default.createElement(breadcrumb_1.BreadcrumbItem, { className: "hidden md:block" },
                                        react_1.default.createElement(breadcrumb_1.BreadcrumbLink, { href: "#" }, "All Leader info")),
                                    react_1.default.createElement(breadcrumb_1.BreadcrumbSeparator, { className: "hidden md:block" }))),
                                path === "/dashboard/".concat(userId, "/all-inboxes") && (react_1.default.createElement(react_1.default.Fragment, null,
                                    react_1.default.createElement(breadcrumb_1.BreadcrumbItem, { className: "hidden md:block" },
                                        react_1.default.createElement(breadcrumb_1.BreadcrumbLink, { href: "#" }, "All Inboxes")),
                                    react_1.default.createElement(breadcrumb_1.BreadcrumbSeparator, { className: "hidden md:block" }))),
                                path === "/dashboard/".concat(userId, "/account") && (react_1.default.createElement(react_1.default.Fragment, null,
                                    react_1.default.createElement(breadcrumb_1.BreadcrumbItem, { className: "hidden md:block" },
                                        react_1.default.createElement(breadcrumb_1.BreadcrumbLink, { href: "#" }, "account")),
                                    react_1.default.createElement(breadcrumb_1.BreadcrumbSeparator, { className: "hidden md:block" }))))),
                        react_1.default.createElement("div", { className: "flex gap-2" },
                            react_1.default.createElement(nav_notification_1.NavigationMenuNotification, null),
                            react_1.default.createElement(input_1.Input, { placeholder: "Search Student", className: " h-10 w-56 sm:block hidden" }),
                            react_1.default.createElement(togle_dark_mode_1.default, null)))),
                react_1.default.createElement("div", { className: "flex flex-1 flex-col gap-4 p-4 pt-0" },
                    react_1.default.createElement(react_router_dom_1.Routes, null))))));
}
