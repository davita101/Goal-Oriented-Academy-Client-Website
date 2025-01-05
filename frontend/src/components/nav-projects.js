import * as React from "react";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, } from "./ui/sidebar";
export function NavProjects({ items, title }) {
    return (React.createElement(SidebarGroup, null,
        React.createElement(SidebarGroupLabel, null, title),
        React.createElement(SidebarMenu, null, items.map((item) => (React.createElement(SidebarMenuItem, { key: item.name },
            React.createElement(SidebarMenuButton, { asChild: true, tooltip: item.name },
                React.createElement("a", { href: item.url },
                    React.createElement(item.icon, null),
                    React.createElement("span", null, item.name)))))))));
}
