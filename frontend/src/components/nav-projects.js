"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavProjects = NavProjects;
var sidebar_1 = require("@/components/ui/sidebar");
function NavProjects(_a) {
    var items = _a.items, title = _a.title;
    return (React.createElement(sidebar_1.SidebarGroup, { className: "group-data-[collapsible=icon]:hidden" },
        React.createElement(sidebar_1.SidebarGroupLabel, null, title),
        React.createElement(sidebar_1.SidebarMenu, null, items.map(function (item) { return (React.createElement(sidebar_1.SidebarMenuItem, { key: item.name },
            React.createElement(sidebar_1.SidebarMenuButton, { asChild: true },
                React.createElement("a", { href: item.url },
                    React.createElement(item.icon, null),
                    React.createElement("span", null, item.name))))); }))));
}
