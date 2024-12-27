"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsideDashboard = AsideDashboard;
var lucide_react_1 = require("lucide-react");
var collapsible_1 = require("@/components/ui/collapsible");
var sidebar_1 = require("@/components/ui/sidebar");
function AsideDashboard(_a) {
    var items = _a.items, title = _a.title;
    return (React.createElement(sidebar_1.SidebarGroup, null,
        React.createElement(sidebar_1.SidebarGroupLabel, null, title),
        React.createElement(sidebar_1.SidebarMenu, null, items.map(function (item) {
            var _a, _b, _c;
            return (React.createElement(collapsible_1.Collapsible, { key: item.title, asChild: true, defaultOpen: item.isActive, className: "group/collapsible" },
                React.createElement(sidebar_1.SidebarMenuItem, null,
                    React.createElement(collapsible_1.CollapsibleTrigger, { asChild: true },
                        React.createElement(sidebar_1.SidebarMenuButton, { tooltip: item.title },
                            item.icon && React.createElement(item.icon, null),
                            React.createElement("span", null, item.title),
                            React.createElement(lucide_react_1.ChevronRight, { className: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" }))),
                    React.createElement(collapsible_1.CollapsibleContent, null,
                        React.createElement(sidebar_1.SidebarMenuSub, null, (_b = (_a = item.items) === null || _a === void 0 ? void 0 : _a.items) === null || _b === void 0 ? void 0 :
                            _b.map(function (subItem) { return (React.createElement(sidebar_1.SidebarMenuSubItem, { key: subItem.title },
                                React.createElement(sidebar_1.SidebarMenuSubButton, { asChild: true },
                                    React.createElement("a", { href: subItem.url },
                                        React.createElement("span", null, subItem.title))))); }), (_c = item.items) === null || _c === void 0 ? void 0 :
                            _c.map(function (subItem) { return (React.createElement(sidebar_1.SidebarMenuSubItem, { key: subItem.title },
                                React.createElement(sidebar_1.SidebarMenuSubButton, { asChild: true },
                                    React.createElement("a", { href: subItem.url },
                                        React.createElement("span", null, subItem.title))))); }))))));
        }))));
}
