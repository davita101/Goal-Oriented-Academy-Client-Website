"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Tree;
var lucide_react_1 = require("lucide-react");
var sidebar_1 = require("./sidebar");
var collapsible_1 = require("./collapsible");
function Tree(_a) {
    var item = _a.item;
    var _b = Array.isArray(item) ? item : [item], name = _b[0], items = _b.slice(1);
    if (!items.length) {
        return (React.createElement(sidebar_1.SidebarMenuButton, { isActive: name === "button.tsx", className: "data-[active=true]:bg-transparent" },
            React.createElement(lucide_react_1.File, null),
            name));
    }
    return (React.createElement(sidebar_1.SidebarMenuItem, null,
        React.createElement(collapsible_1.Collapsible, { className: "group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90", defaultOpen: name === "components" || name === "ui" },
            React.createElement(collapsible_1.CollapsibleTrigger, { asChild: true },
                React.createElement(sidebar_1.SidebarMenuButton, null,
                    React.createElement(lucide_react_1.ChevronRight, { className: "transition-transform" }),
                    React.createElement(lucide_react_1.Folder, null),
                    name)),
            React.createElement(collapsible_1.CollapsibleContent, null,
                React.createElement(sidebar_1.SidebarMenuSub, null, items.map(function (subItem, index) { return (React.createElement(Tree, { key: index, item: subItem })); }))))));
}
