"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownMenuDemo = DropdownMenuDemo;
var button_1 = require("@/components/ui/button");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
function DropdownMenuDemo() {
    return (React.createElement(dropdown_menu_1.DropdownMenu, null,
        React.createElement(dropdown_menu_1.DropdownMenuTrigger, { asChild: true },
            React.createElement(button_1.Button, { variant: "outline" }, "Open")),
        React.createElement(dropdown_menu_1.DropdownMenuContent, { className: "w-56" },
            React.createElement(dropdown_menu_1.DropdownMenuLabel, null, "My Account"),
            React.createElement(dropdown_menu_1.DropdownMenuItem, null,
                "points",
                React.createElement(dropdown_menu_1.DropdownMenuShortcut, null, "\u21E7\u2318Q")))));
}
