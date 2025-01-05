import { BadgePercent, Bolt, ChevronsUpDown, ClipboardX, LogOut, X, } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage, } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "./ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar, } from "./ui/sidebar";
import * as React from "react";
import { useAuthStore } from "../store/authStore";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Button } from "./ui/button";
import { useLeaderStore } from "../store/leaderStore";
export function NavUser() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13;
    const { isMobile } = useSidebar();
    const { user, logout } = useAuthStore();
    const { getLeaderStudents, leaderStudents } = useLeaderStore();
    const handleLogout = () => {
        var _a;
        logout((_a = user.user) === null || _a === void 0 ? void 0 : _a.email);
    };
    React.useEffect(() => {
        var _a;
        getLeaderStudents((_a = user === null || user === void 0 ? void 0 : user.user) === null || _a === void 0 ? void 0 : _a._id);
    }, [user === null || user === void 0 ? void 0 : user.user._id, getLeaderStudents]);
    return (React.createElement(SidebarMenu, { className: "mt-[-.5rem]" },
        React.createElement(SidebarMenuItem, null,
            React.createElement(DropdownMenu, null,
                React.createElement(DropdownMenuTrigger, { asChild: true, className: "dark:bg-[var(--background)] bg-slate-50 mt-0" },
                    React.createElement(SidebarMenuButton, { size: "lg", className: " data-[state=open]:bg-gray-100 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground" },
                        React.createElement(Avatar, { className: "h-8 w-8 rounded-lg" },
                            React.createElement(AvatarImage, { src: (_a = user === null || user === void 0 ? void 0 : user.user) === null || _a === void 0 ? void 0 : _a.avatar, alt: `Goal oriented academy user ${(_b = user === null || user === void 0 ? void 0 : user.user) === null || _b === void 0 ? void 0 : _b.name}` }),
                            React.createElement(AvatarFallback, { className: "rounded-lg capitalize" }, (_c = user === null || user === void 0 ? void 0 : user.user) === null || _c === void 0 ? void 0 :
                                _c.name.split(/\s+/)[0].slice(0, 1), (_d = user === null || user === void 0 ? void 0 : user.user) === null || _d === void 0 ? void 0 :
                                _d.name.split(/\s+/)[1].slice(0, 1))),
                        React.createElement("div", { className: "grid flex-1 text-left text-sm leading-tight" },
                            React.createElement("span", { className: "truncate font-semibold" }, (_e = user === null || user === void 0 ? void 0 : user.user) === null || _e === void 0 ? void 0 : _e.name),
                            React.createElement("span", { className: "truncate text-xs" }, (_f = user === null || user === void 0 ? void 0 : user.user) === null || _f === void 0 ? void 0 : _f.email)),
                        React.createElement(ChevronsUpDown, { className: "ml-auto size-4" }))),
                React.createElement(DropdownMenuContent, { className: "w-[--radix-dropdown-menu-trigger-width] min-w-[330px] rounded-lg", side: isMobile ? "bottom" : "right", align: "end", sideOffset: 4 },
                    React.createElement(DropdownMenuLabel, { className: "p-0 font-normal" },
                        React.createElement("div", { className: "flex items-center gap-2 px-1 py-1.5 text-left text-sm" },
                            React.createElement(Avatar, { className: "h-8 w-8 rounded-lg" },
                                React.createElement(AvatarImage, { src: (_g = user === null || user === void 0 ? void 0 : user.user) === null || _g === void 0 ? void 0 : _g.avatar, alt: `Goal oriented academy user ${(_h = user === null || user === void 0 ? void 0 : user.user) === null || _h === void 0 ? void 0 : _h.avatar}` }),
                                React.createElement(AvatarFallback, { className: "rounded-lg capitalize" }, (_j = user === null || user === void 0 ? void 0 : user.user) === null || _j === void 0 ? void 0 :
                                    _j.name.split(/\s+/)[0].slice(0, 1), (_k = user === null || user === void 0 ? void 0 : user.user) === null || _k === void 0 ? void 0 :
                                    _k.name.split(/\s+/)[1].slice(0, 1))),
                            React.createElement("div", { className: "grid flex-1 text-left text-sm leading-tight" },
                                React.createElement("span", { className: "truncate font-semibold" }, (_l = user === null || user === void 0 ? void 0 : user.user) === null || _l === void 0 ? void 0 : _l.name),
                                React.createElement("span", { className: "truncate text-xs" }, (_m = user === null || user === void 0 ? void 0 : user.user) === null || _m === void 0 ? void 0 : _m.email)))),
                    React.createElement(DropdownMenuSeparator, null),
                    React.createElement(DropdownMenuGroup, { className: "grid grid-cols-2 w-full" },
                        React.createElement(DropdownMenuItem, null,
                            React.createElement("div", { className: "flex items-center gap-1" },
                                React.createElement(HoverCard, null,
                                    React.createElement(HoverCardTrigger, { asChild: true },
                                        React.createElement(Button, { className: " w-[140px]" },
                                            React.createElement(Bolt, { size: 18 }),
                                            "Roles ",
                                            React.createElement("span", null, (_o = user === null || user === void 0 ? void 0 : user.user) === null || _o === void 0 ? void 0 : _o.role.length))),
                                    React.createElement(HoverCardContent, { className: "w-40 duration-100" }, (_p = user === null || user === void 0 ? void 0 : user.user) === null || _p === void 0 ? void 0 : _p.role.map((role) => React.createElement("div", { key: `${role}`, className: "flex justify-between" },
                                        React.createElement("span", null, role))))))),
                        React.createElement(DropdownMenuItem, null,
                            React.createElement("div", { className: "flex items-center gap-1" },
                                React.createElement(ClipboardX, { size: 18 }),
                                "Cards ",
                                React.createElement("span", null, ((_s = (_r = (_q = user === null || user === void 0 ? void 0 : user.user) === null || _q === void 0 ? void 0 : _q.rating) === null || _r === void 0 ? void 0 : _r.cards) === null || _s === void 0 ? void 0 : _s.leaderCards.black) +
                                    ((_v = (_u = (_t = user === null || user === void 0 ? void 0 : user.user) === null || _t === void 0 ? void 0 : _t.rating) === null || _u === void 0 ? void 0 : _u.cards) === null || _v === void 0 ? void 0 : _v.leaderCards.green) +
                                    ((_y = (_x = (_w = user === null || user === void 0 ? void 0 : user.user) === null || _w === void 0 ? void 0 : _w.rating) === null || _x === void 0 ? void 0 : _x.cards) === null || _y === void 0 ? void 0 : _y.leaderCards.purple) +
                                    ((_1 = (_0 = (_z = user === null || user === void 0 ? void 0 : user.user) === null || _z === void 0 ? void 0 : _z.rating) === null || _0 === void 0 ? void 0 : _0.cards) === null || _1 === void 0 ? void 0 : _1.leaderCards.yellow) +
                                    ((_4 = (_3 = (_2 = user === null || user === void 0 ? void 0 : user.user) === null || _2 === void 0 ? void 0 : _2.rating) === null || _3 === void 0 ? void 0 : _3.cards) === null || _4 === void 0 ? void 0 : _4.mentorCards.black) +
                                    ((_7 = (_6 = (_5 = user === null || user === void 0 ? void 0 : user.user) === null || _5 === void 0 ? void 0 : _5.rating) === null || _6 === void 0 ? void 0 : _6.cards) === null || _7 === void 0 ? void 0 : _7.mentorCards.green) +
                                    ((_10 = (_9 = (_8 = user === null || user === void 0 ? void 0 : user.user) === null || _8 === void 0 ? void 0 : _8.rating) === null || _9 === void 0 ? void 0 : _9.cards) === null || _10 === void 0 ? void 0 : _10.mentorCards.purple) +
                                    ((_13 = (_12 = (_11 = user === null || user === void 0 ? void 0 : user.user) === null || _11 === void 0 ? void 0 : _11.rating) === null || _12 === void 0 ? void 0 : _12.cards) === null || _13 === void 0 ? void 0 : _13.mentorCards.yellow))))),
                    React.createElement(DropdownMenuGroup, { className: "grid grid-cols-2 w-full" }),
                    React.createElement(DropdownMenuSeparator, null),
                    React.createElement(DropdownMenuGroup, { className: "grid grid-cols-2  " },
                        React.createElement(DropdownMenuItem, null,
                            leaderStudents.length,
                            " ",
                            React.createElement("span", null, "Squad Members")),
                        React.createElement(DropdownMenuItem, null,
                            leaderStudents.filter(student => student.role === "miniLeader").length,
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
