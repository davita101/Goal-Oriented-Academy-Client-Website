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
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, } from "./ui/navigation-menu";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "../lib/utils";
const components = [
    {
        title: "Mini Leader",
        href: "/docs/primitives/alert-dialog",
        description: "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Leader Control",
        href: "/docs/primitives/hover-card",
        description: "For sighted users to preview content available behind a link.",
    },
    {
        title: "leader Control",
        href: "/docs/primitives/progress",
        description: "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Leader Exam",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description: "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description: "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
];
export function NavigationMenuNotification() {
    return (React.createElement(NavigationMenu, null,
        React.createElement(NavigationMenuList, null,
            React.createElement(NavigationMenuItem, { className: "ml-[10.5rem]" },
                React.createElement(NavigationMenuTrigger, null, "Notification"),
                React.createElement(NavigationMenuContent, null,
                    React.createElement(ScrollArea, { className: "h-72 rounded-md border" },
                        React.createElement("ul", { className: "grid w-[300px] gap-3 p-4 md:w-[300px] md:grid-cols-1 lg:w-[300px] z-[999] " }, components.map((component) => (React.createElement(ListItem, { key: component.title, title: component.title, href: component.href }, component.description))))))))));
}
const ListItem = React.forwardRef((_a, ref) => {
    var { className, title, children } = _a, props = __rest(_a, ["className", "title", "children"]);
    return (React.createElement("li", null,
        React.createElement(NavigationMenuLink, { asChild: true },
            React.createElement("a", Object.assign({ ref: ref, className: cn("block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground", className) }, props),
                React.createElement("div", { className: "text-sm font-medium leading-none" }, title),
                React.createElement("p", { className: "line-clamp-2 text-sm leading-snug text-muted-foreground" }, children)))));
});
ListItem.displayName = "ListItem";
