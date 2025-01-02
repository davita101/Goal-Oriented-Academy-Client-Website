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
import * as React from "react";
import { Book, BookA, BookCopy, BookMarked, CalendarDays, ChartBarIncreasing, ChartColumnStacked, FileText, GalleryVertical, Inbox, MonitorCog, Presentation, SquareTerminal, UserRoundPen, } from "lucide-react";
import { AsideDashboard } from "./aside-dashboard";
import { NavUser } from "./nav-user";
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail, } from "./ui/sidebar";
import { ScrollArea } from "./ui/scroll-area";
import { useParams } from "react-router-dom";
import { NavProjects } from "./nav-projects";
export function AppSidebar(_a) {
    var props = __rest(_a, []);
    const { userId } = useParams();
    // This is sample data.
    const data = {
        user: {
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
        },
        navMain: [
            {
                title: "Dashboard",
                url: "#",
                icon: SquareTerminal,
                items: [
                    {
                        title: "Default",
                        url: "/dashboard",
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
                name: "all",
                url: "/widgets",
                icon: GalleryVertical,
            },
            {
                name: "Statistics",
                url: "/widgets/statistics",
                icon: ChartBarIncreasing,
            },
            {
                name: "Data",
                url: "/widgets/data",
                icon: FileText,
            },
            {
                name: "Charts",
                url: "/widgets/charts",
                icon: ChartColumnStacked,
            },
        ],
        applications: [
            {
                name: "all",
                url: "/applications",
                icon: GalleryVertical,
            },
            {
                name: "Inbox",
                url: "/applications/inbox",
                icon: Inbox,
            },
            {
                name: "Calendar",
                url: "/applications/calendar",
                icon: CalendarDays,
            },
            {
                name: "Profile",
                url: "/applications/profile",
                icon: UserRoundPen,
            },
        ],
        controls: [
            {
                name: "all",
                url: "/controls",
                icon: GalleryVertical,
            },
            {
                name: "Students",
                url: "/controls/students",
                icon: Book,
            },
            {
                name: "Leader",
                url: "/controls/leader",
                icon: BookCopy,
            },
            {
                name: "Mini Leader",
                url: "/controls/mini-leader",
                icon: BookA,
            },
            {
                name: "Mini students",
                url: "/controls/mini-students",
                icon: BookMarked,
            },
            {
                name: "Mentor",
                url: "/controls/mentor",
                icon: Presentation,
            },
            {
                name: "Mentor Assistant",
                url: "/controls/mentor-assistant",
                icon: MonitorCog,
            },
        ],
    };
    return (React.createElement(Sidebar, Object.assign({ collapsible: "icon" }, props, { className: "data-[state=open]" }),
        React.createElement(ScrollArea, null,
            React.createElement(SidebarHeader, { className: "sticky top-0 z-[2]" },
                React.createElement(NavUser, null)),
            React.createElement(SidebarContent, null,
                React.createElement(AsideDashboard, { items: data.navMain, title: "Dashboard" }),
                React.createElement(NavProjects, { items: data.widgets, title: "Widgets" }),
                React.createElement(NavProjects, { items: data.applications, title: "Applications" }),
                React.createElement(NavProjects, { items: data.controls, title: "Controls" })),
            React.createElement(SidebarRail, null))));
}
