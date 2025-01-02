import { BadgePercent, Bolt, ChevronsUpDown, ClipboardX, LogOut, X, } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage, } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "./ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar, } from "./ui/sidebar";
import * as React from "react";
import { useAuthStore } from "../store/authStore";
export function NavUser() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
    const { isMobile } = useSidebar();
    const { user, logout, oneLeaderStudent, oneLeaderStudentArr } = useAuthStore();
    const handleLogout = () => {
        logout(user.user.email);
    };
    React.useEffect(() => {
        oneLeaderStudent(user.user._id);
    }, [user.user._id, oneLeaderStudent]);
    return (React.createElement(SidebarMenu, null,
        React.createElement(SidebarMenuItem, null,
            React.createElement(DropdownMenu, null,
                React.createElement(DropdownMenuTrigger, { asChild: true },
                    React.createElement(SidebarMenuButton, { size: "lg", className: " data-[state=open]:bg-gray-100 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" },
                        React.createElement(Avatar, { className: "h-8 w-8 rounded-lg" },
                            React.createElement(AvatarImage, { src: user.user.avatar, alt: `Goal oriented academy user ${user.user.name}` }),
                            React.createElement(AvatarFallback, { className: "rounded-lg capitalize" },
                                user.user.name.split(/\s+/)[0].slice(0, 1),
                                user.user.name.split(/\s+/)[1].slice(0, 1))),
                        React.createElement("div", { className: "grid flex-1 text-left text-sm leading-tight" },
                            React.createElement("span", { className: "truncate font-semibold" }, user.user.name),
                            React.createElement("span", { className: "truncate text-xs" }, user.user.email)),
                        React.createElement(ChevronsUpDown, { className: "ml-auto size-4" }))),
                React.createElement(DropdownMenuContent, { className: "w-[--radix-dropdown-menu-trigger-width] min-w-[330px] rounded-lg", side: isMobile ? "bottom" : "right", align: "end", sideOffset: 4 },
                    React.createElement(DropdownMenuLabel, { className: "p-0 font-normal" },
                        React.createElement("div", { className: "flex items-center gap-2 px-1 py-1.5 text-left text-sm" },
                            React.createElement(Avatar, { className: "h-8 w-8 rounded-lg" },
                                React.createElement(AvatarImage, { src: user.user.avatar, alt: `Goal oriented academy user ${user.user.avatar}` }),
                                React.createElement(AvatarFallback, { className: "rounded-lg capitalize" },
                                    user.user.name.split(/\s+/)[0].slice(0, 1),
                                    user.user.name.split(/\s+/)[1].slice(0, 1))),
                            React.createElement("div", { className: "grid flex-1 text-left text-sm leading-tight" },
                                React.createElement("span", { className: "truncate font-semibold" }, user.user.name),
                                React.createElement("span", { className: "truncate text-xs" }, user.user.email)))),
                    React.createElement(DropdownMenuSeparator, null),
                    React.createElement(DropdownMenuGroup, { className: "grid grid-cols-2 w-full" },
                        React.createElement(DropdownMenuItem, null,
                            React.createElement("div", { className: "flex items-center gap-1" },
                                React.createElement(Bolt, { size: 18 }),
                                "Roles ",
                                React.createElement("span", null, user.user.role.length))),
                        React.createElement(DropdownMenuItem, null,
                            React.createElement("div", { className: "flex items-center gap-1" },
                                React.createElement(ClipboardX, { size: 18 }),
                                "Cards ",
                                React.createElement("span", null, ((_c = (_b = (_a = user.user) === null || _a === void 0 ? void 0 : _a.rating) === null || _b === void 0 ? void 0 : _b.cards) === null || _c === void 0 ? void 0 : _c.leaderCards.black) +
                                    ((_f = (_e = (_d = user.user) === null || _d === void 0 ? void 0 : _d.rating) === null || _e === void 0 ? void 0 : _e.cards) === null || _f === void 0 ? void 0 : _f.leaderCards.green) +
                                    ((_j = (_h = (_g = user.user) === null || _g === void 0 ? void 0 : _g.rating) === null || _h === void 0 ? void 0 : _h.cards) === null || _j === void 0 ? void 0 : _j.leaderCards.purple) +
                                    ((_m = (_l = (_k = user.user) === null || _k === void 0 ? void 0 : _k.rating) === null || _l === void 0 ? void 0 : _l.cards) === null || _m === void 0 ? void 0 : _m.leaderCards.yellow) +
                                    ((_q = (_p = (_o = user.user) === null || _o === void 0 ? void 0 : _o.rating) === null || _p === void 0 ? void 0 : _p.cards) === null || _q === void 0 ? void 0 : _q.mentorCards.black) +
                                    ((_t = (_s = (_r = user.user) === null || _r === void 0 ? void 0 : _r.rating) === null || _s === void 0 ? void 0 : _s.cards) === null || _t === void 0 ? void 0 : _t.mentorCards.green) +
                                    ((_w = (_v = (_u = user.user) === null || _u === void 0 ? void 0 : _u.rating) === null || _v === void 0 ? void 0 : _v.cards) === null || _w === void 0 ? void 0 : _w.mentorCards.purple) +
                                    ((_z = (_y = (_x = user.user) === null || _x === void 0 ? void 0 : _x.rating) === null || _y === void 0 ? void 0 : _y.cards) === null || _z === void 0 ? void 0 : _z.mentorCards.yellow))))),
                    React.createElement(DropdownMenuGroup, { className: "grid grid-cols-2 w-full" }),
                    React.createElement(DropdownMenuSeparator, null),
                    React.createElement(DropdownMenuGroup, { className: "grid grid-cols-2  " },
                        React.createElement(DropdownMenuItem, null,
                            oneLeaderStudentArr.length,
                            " ",
                            React.createElement("span", null, "Squad Members")),
                        React.createElement(DropdownMenuItem, null,
                            oneLeaderStudentArr.filter(student => student.role === "miniLeader").length,
                            " ",
                            React.createElement("span", null, "Mini Leader")),
                        React.createElement(DropdownMenuItem, { className: "text-slate-400 hover:text-slate-400 " },
                            React.createElement(X, null),
                            " ",
                            React.createElement("span", null, "Groups")),
                        React.createElement(DropdownMenuItem, { className: "text-slate-400 hover:text-slate-400 " },
                            React.createElement(X, null),
                            " ",
                            React.createElement("span", null, "Mini Member"))),
                    React.createElement(DropdownMenuSeparator, null),
                    React.createElement(DropdownMenuItem, { className: "text-slate-400 hover:text-slate-400 " },
                        React.createElement(X, null),
                        React.createElement(BadgePercent, null),
                        React.createElement("span", null, "salary")),
                    React.createElement(DropdownMenuGroup, null,
                        React.createElement(DropdownMenuItem, { onClick: () => handleLogout() },
                            React.createElement(LogOut, null),
                            "Log out")))))));
}
