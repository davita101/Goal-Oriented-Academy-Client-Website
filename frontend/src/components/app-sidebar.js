"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSidebar = AppSidebar;
var React = require("react");
var lucide_react_1 = require("lucide-react");
var aside_dashboard_1 = require("@/components/aside-dashboard");
var nav_user_1 = require("@/components/nav-user");
var sidebar_1 = require("@/components/ui/sidebar");
var scroll_area_1 = require("./ui/scroll-area");
var react_router_dom_1 = require("react-router-dom");
var nav_projects_1 = require("./nav-projects");
var sidebar_tree_1 = require("./ui/sidebar-tree");
function AppSidebar(_a) {
    var props = __rest(_a, []);
    var userId = (0, react_router_dom_1.useParams)().userId;
    // This is sample data.
    var data = {
        user: {
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
        },
        navMain: [
            {
                title: "Dashboard",
                url: "#",
                icon: lucide_react_1.SquareTerminal,
                isActive: true,
                items: [
                    {
                        title: "Default",
                        url: "/dashboard/default",
                    },
                    {
                        title: "Analytics",
                        url: "/dashboard/analytics",
                    },
                    {
                        title: "More...",
                        url: "#",
                    },
                ],
            },
        ],
        widgets: [
            {
                name: "Statistics",
                url: "/widgets/statistics",
                icon: lucide_react_1.ChartBarIncreasing,
            },
            {
                name: "Data",
                url: "/widgets/data",
                icon: lucide_react_1.FileText,
            },
            {
                name: "Charts",
                url: "/widgets/charts",
                icon: lucide_react_1.ChartColumnStacked,
            },
        ],
        applications: [
            {
                name: "Inbox",
                url: "/applications/inbox",
                icon: lucide_react_1.Inbox,
            },
            {
                name: "Calendar",
                url: "/applications/calendar",
                icon: lucide_react_1.CalendarDays,
            },
            {
                name: "Profile",
                url: "/applications/profile",
                icon: lucide_react_1.UserRoundPen,
            },
        ],
        controllers: [
            {
                title: "Mentor",
                url: "/mentor",
                icon: lucide_react_1.ComputerIcon,
                isActive: true,
                items: [
                    {
                        title: "Rating",
                        url: "/controller/mentor/rating",
                        items: [
                            {
                                title: "Cards",
                                url: "/controller/mentor/cards",
                            },
                            {
                                title: "GithubCheck",
                                url: "/controller/squad-member",
                            },
                        ],
                    },
                    {
                        title: "More...",
                        url: "#",
                    },
                ],
            },
        ],
        tree: [
            [
                "Mentor",
                [
                    "Rating",
                    "Github-Check",
                ],
                ["Exams", "Exam-one", "Exam-two"],
                "Data",
                "Cards",
                "Rating",
                "Charts",
            ],
            [
                "Mentor-Assistant",
                [
                    "Rating",
                    "Github-Check",
                ],
                ["Exams", "Exam-one", "Exam-two"],
                "Data",
                "Cards",
                "Rating",
                "Charts"
            ],
            [
                "Leaders",
                [
                    "Rating",
                    "Github-Check",
                    "Leader-Codewars",
                    "Leader-Github",
                    "Parent-Rating",
                ],
                ["Exams", "Exam-one", "Exam-two"],
                ["Github-Check",
                    "First-Check", "Second-Check",
                ],
                "Cards",
                "Rating",
                "Charts"
            ],
            [
                "Mini-Leaders",
                [
                    "Rating",
                    "Github-Check",
                ],
                ["Github-Check",
                    "First-Check", "Second-Check",
                ],
                "Cards",
                "Rating",
                "Charts"
            ],
            [
                "Mini-Mentor",
                [
                    "Rating",
                    "Github-Check",
                ],
                ["Exams", "Exam-one", "Exam-two"],
                "Cards",
                "Rating",
                "Charts"
            ],
        ],
    };
    return (React.createElement(sidebar_1.Sidebar, __assign({ collapsible: "icon" }, props),
        React.createElement(scroll_area_1.ScrollArea, null,
            React.createElement(sidebar_1.SidebarHeader, { className: "sticky top-0 z-[2]" },
                React.createElement(nav_user_1.NavUser, { user: data.user })),
            React.createElement(sidebar_1.SidebarContent, null,
                React.createElement(aside_dashboard_1.AsideDashboard, { items: data.navMain, title: "Dashboard" }),
                React.createElement(nav_projects_1.NavProjects, { items: data.widgets, title: "Widgets" }),
                React.createElement(nav_projects_1.NavProjects, { items: data.applications, title: "Applications" }),
                React.createElement(sidebar_1.SidebarMenu, null,
                    React.createElement(sidebar_1.SidebarHeader, null, "Controllers"),
                    data.tree.map(function (item, index) { return (React.createElement(sidebar_tree_1.default, { key: index, item: item })); })),
                React.createElement(sidebar_1.SidebarMenu, null,
                    React.createElement(sidebar_1.SidebarHeader, null, "Admin"),
                    React.createElement("b", null, "COMING SOON..."))),
            React.createElement(sidebar_1.SidebarRail, null))));
}
