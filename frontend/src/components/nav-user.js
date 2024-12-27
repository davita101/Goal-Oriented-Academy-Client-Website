"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavUser = NavUser;
var lucide_react_1 = require("lucide-react");
var avatar_1 = require("@/components/ui/avatar");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var sidebar_1 = require("@/components/ui/sidebar");
var react_1 = require("react");
function NavUser(_a) {
    var user = _a.user;
    var isMobile = (0, sidebar_1.useSidebar)().isMobile;
    return (react_1.default.createElement(sidebar_1.SidebarMenu, null,
        react_1.default.createElement(sidebar_1.SidebarMenuItem, null,
            react_1.default.createElement(dropdown_menu_1.DropdownMenu, null,
                react_1.default.createElement(dropdown_menu_1.DropdownMenuTrigger, { asChild: true },
                    react_1.default.createElement(sidebar_1.SidebarMenuButton, { size: "lg", className: " data-[state=open]:bg-gray-100 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" },
                        react_1.default.createElement(avatar_1.Avatar, { className: "h-8 w-8 rounded-lg" },
                            react_1.default.createElement(avatar_1.AvatarImage, { src: user.avatar, alt: user.name }),
                            react_1.default.createElement(avatar_1.AvatarFallback, { className: "rounded-lg" }, "CN")),
                        react_1.default.createElement("div", { className: "grid flex-1 text-left text-sm leading-tight" },
                            react_1.default.createElement("span", { className: "truncate font-semibold" }, user.name),
                            react_1.default.createElement("span", { className: "truncate text-xs" }, user.email)),
                        react_1.default.createElement(lucide_react_1.ChevronsUpDown, { className: "ml-auto size-4" }))),
                react_1.default.createElement(dropdown_menu_1.DropdownMenuContent, { className: "w-[--radix-dropdown-menu-trigger-width] min-w-[330px] rounded-lg", side: isMobile ? "bottom" : "right", align: "end", sideOffset: 4 },
                    react_1.default.createElement(dropdown_menu_1.DropdownMenuLabel, { className: "p-0 font-normal" },
                        react_1.default.createElement("div", { className: "flex items-center gap-2 px-1 py-1.5 text-left text-sm" },
                            react_1.default.createElement(avatar_1.Avatar, { className: "h-8 w-8 rounded-lg" },
                                react_1.default.createElement(avatar_1.AvatarImage, { src: user.avatar, alt: user.name }),
                                react_1.default.createElement(avatar_1.AvatarFallback, { className: "rounded-lg" }, "CN")),
                            react_1.default.createElement("div", { className: "grid flex-1 text-left text-sm leading-tight" },
                                react_1.default.createElement("span", { className: "truncate font-semibold" }, user.name),
                                react_1.default.createElement("span", { className: "truncate text-xs" }, user.email)))),
                    react_1.default.createElement(dropdown_menu_1.DropdownMenuSeparator, null),
                    react_1.default.createElement(dropdown_menu_1.DropdownMenuGroup, { className: "grid grid-cols-2 w-full" },
                        react_1.default.createElement(dropdown_menu_1.DropdownMenuItem, null,
                            react_1.default.createElement("div", { className: "flex items-center gap-1" },
                                react_1.default.createElement(lucide_react_1.Bolt, { size: 18 }),
                                "Roles ",
                                react_1.default.createElement("span", null, "8"))),
                        react_1.default.createElement(dropdown_menu_1.DropdownMenuItem, null,
                            react_1.default.createElement("div", { className: "flex items-center gap-1" },
                                react_1.default.createElement(lucide_react_1.ClipboardX, { size: 18 }),
                                "Cards ",
                                react_1.default.createElement("span", null, "5")))),
                    react_1.default.createElement(dropdown_menu_1.DropdownMenuGroup, { className: "grid grid-cols-2 w-full" }),
                    react_1.default.createElement(dropdown_menu_1.DropdownMenuSeparator, null),
                    react_1.default.createElement(dropdown_menu_1.DropdownMenuGroup, { className: "grid grid-cols-2  " },
                        react_1.default.createElement(dropdown_menu_1.DropdownMenuItem, null,
                            "56 ",
                            react_1.default.createElement("span", null, "Squad Members")),
                        react_1.default.createElement(dropdown_menu_1.DropdownMenuItem, null,
                            "10 ",
                            react_1.default.createElement("span", null, "Mini Leader")),
                        react_1.default.createElement(dropdown_menu_1.DropdownMenuItem, null,
                            "4 ",
                            react_1.default.createElement("span", null, "Groups")),
                        react_1.default.createElement(dropdown_menu_1.DropdownMenuItem, null,
                            "5 ",
                            react_1.default.createElement("span", null, "Mini Member"))),
                    react_1.default.createElement(dropdown_menu_1.DropdownMenuSeparator, null),
                    react_1.default.createElement(dropdown_menu_1.DropdownMenuItem, null,
                        react_1.default.createElement(lucide_react_1.BadgePercent, null),
                        react_1.default.createElement("span", null, "salary")),
                    react_1.default.createElement(dropdown_menu_1.DropdownMenuGroup, null,
                        react_1.default.createElement(dropdown_menu_1.DropdownMenuItem, null,
                            react_1.default.createElement(lucide_react_1.LogOut, null),
                            "Log out")))))));
}
