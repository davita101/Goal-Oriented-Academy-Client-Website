"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamSwitcher = TeamSwitcher;
var React = require("react");
var lucide_react_1 = require("lucide-react");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var sidebar_1 = require("@/components/ui/sidebar");
function TeamSwitcher(_a) {
    var teams = _a.teams;
    var isMobile = (0, sidebar_1.useSidebar)().isMobile;
    var _b = React.useState(teams[0]), activeTeam = _b[0], setActiveTeam = _b[1];
    return (React.createElement(sidebar_1.SidebarMenu, null,
        React.createElement(sidebar_1.SidebarMenuItem, null,
            React.createElement(dropdown_menu_1.DropdownMenu, null,
                React.createElement(dropdown_menu_1.DropdownMenuTrigger, { asChild: true },
                    React.createElement(sidebar_1.SidebarMenuButton, { size: "lg", className: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" },
                        React.createElement("div", { className: "flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground" },
                            React.createElement(activeTeam.logo, { className: "size-4" })),
                        React.createElement("div", { className: "grid flex-1 text-left text-sm leading-tight" },
                            React.createElement("span", { className: "truncate font-semibold" }, activeTeam.name),
                            React.createElement("span", { className: "truncate text-xs" }, activeTeam.plan)),
                        React.createElement(lucide_react_1.ChevronsUpDown, { className: "ml-auto" }))),
                React.createElement(dropdown_menu_1.DropdownMenuContent, { className: "w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg", align: "start", side: isMobile ? "bottom" : "right", sideOffset: 4 },
                    React.createElement(dropdown_menu_1.DropdownMenuLabel, { className: "text-xs text-muted-foreground" }, "Teams"),
                    teams.map(function (team, index) { return (React.createElement(dropdown_menu_1.DropdownMenuItem, { key: team.name, onClick: function () { return setActiveTeam(team); }, className: "gap-2 p-2" },
                        React.createElement("div", { className: "flex size-6 items-center justify-center rounded-sm border" },
                            React.createElement(team.logo, { className: "size-4 shrink-0" })),
                        team.name,
                        React.createElement(dropdown_menu_1.DropdownMenuShortcut, null,
                            "\u2318",
                            index + 1))); }),
                    React.createElement(dropdown_menu_1.DropdownMenuSeparator, null),
                    React.createElement(dropdown_menu_1.DropdownMenuItem, { className: "gap-2 p-2" },
                        React.createElement("div", { className: "flex size-6 items-center justify-center rounded-md border bg-background" },
                            React.createElement(lucide_react_1.Plus, { className: "size-4" })),
                        React.createElement("div", { className: "font-medium text-muted-foreground" }, "Add team")))))));
}
