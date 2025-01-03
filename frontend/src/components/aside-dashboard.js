import * as React from "react";
import { ChevronRight } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "./ui/collapsible";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, } from "./ui/sidebar";
export function AsideDashboard({ items, title }) {
    return (React.createElement(SidebarGroup, null,
        React.createElement(SidebarGroupLabel, null, title),
        React.createElement(SidebarMenu, null, items.map((item) => {
            var _a;
            return (React.createElement(Collapsible, { key: item.title, asChild: true, defaultOpen: item.isActive, className: "group/collapsible" },
                React.createElement(SidebarMenuItem, null,
                    React.createElement(CollapsibleTrigger, { asChild: true },
                        React.createElement(SidebarMenuButton, { tooltip: item.title },
                            item.icon && React.createElement(item.icon, null),
                            React.createElement("span", null, item.title),
                            React.createElement(ChevronRight, { className: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" }))),
                    React.createElement(CollapsibleContent, null,
                        React.createElement(SidebarMenuSub, null, (_a = item.items) === null || _a === void 0 ? void 0 : _a.map((subItem) => (React.createElement(SidebarMenuSubItem, { key: subItem.title },
                            React.createElement(SidebarMenuSubButton, { asChild: true },
                                React.createElement("a", { href: subItem.url },
                                    React.createElement("span", null, subItem.title)))))))))));
        }))));
}
