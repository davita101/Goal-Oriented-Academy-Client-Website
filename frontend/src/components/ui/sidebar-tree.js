import { ChevronRight, File, Folder } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub } from "./sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import * as React from "react";
export default function Tree({ item }) {
    const [name, ...items] = Array.isArray(item) ? item : [item];
    if (!items.length) {
        return (React.createElement(SidebarMenuButton, { isActive: name === "button.tsx", className: "data-[active=true]:bg-transparent" },
            React.createElement(File, null),
            name));
    }
    return (React.createElement(SidebarMenuItem, null,
        React.createElement(Collapsible, { className: "group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90", defaultOpen: name === "components" || name === "ui" },
            React.createElement(CollapsibleTrigger, { asChild: true },
                React.createElement(SidebarMenuButton, null,
                    React.createElement(ChevronRight, { className: "transition-transform" }),
                    React.createElement(Folder, null),
                    name)),
            React.createElement(CollapsibleContent, null,
                React.createElement(SidebarMenuSub, null, items.map((subItem, index) => (React.createElement(Tree, { key: index, item: subItem }))))))));
}
