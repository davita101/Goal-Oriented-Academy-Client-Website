"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.columns = void 0;
exports.DataTable = DataTable;
var React = require("react");
var react_table_1 = require("@tanstack/react-table");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var checkbox_1 = require("@/components/ui/checkbox");
var dropdown_menu_1 = require("@/components/ui/dropdown-menu");
var input_1 = require("@/components/ui/input");
var table_1 = require("@/components/ui/table");
var react_router_dom_1 = require("react-router-dom");
var hover_card_1 = require("./ui/hover-card");
var dialog_1 = require("./ui/dialog");
var label_1 = require("./ui/label");
var badge_1 = require("./ui/badge");
var scroll_area_1 = require("./ui/scroll-area");
var data = [
    {
        _id: "49c6589f-aba8-4d02-b3ce2-548de0b51d40",
        name: "Alice Johnson",
        age: 21,
        studentFbLink: "https://facebook.com/alicejohnson",
        email: "alicejohnson@example.com",
        githubLink: "https://github.com/alicejohnson",
        speed: 4,
        group: "44",
        role: "miniLeader",
        leaderId: "675dee40a1bb4008aab7ce43",
        parentFbLink: "https://facebook.com/alicejohnsonparent",
        githubToken: "123124145666424564564345345",
        githubLastUpdate: "2021-09-02",
        fines: {
            githubFine: 1,
            miniLeaderFine: 2,
            miniStudentFine: 3
        },
        aura: {
            points: 9999,
            classWork: 9999,
            attendance: 9999,
            help: 9999,
            camera: 9999,
            answers: 99993
        },
        payedInfo: false,
        comment: {
            leaderComment: "123",
            leaderProof: "123",
            controller: {
                miniLeaderController: "miniLeaderController",
                leaderController: "leaderController"
            }
        }
    },
    {
        _id: "49c6589f-a1ba8-4d02-bce2-548de03b51d40",
        name: "gio lomi",
        age: 21,
        studentFbLink: "https://facebook.com/alicejohnson",
        email: "alicejohnson@example.com",
        githubLink: "https://github.com/alicejohnson",
        speed: 6,
        role: "member",
        group: "45",
        leaderId: "675dee40a1bb4008aab7ce43",
        parentFbLink: "https://facebook.com/alicejohnsonparent",
        githubToken: "45347565343454736464564564345345",
        githubLastUpdate: "2021-09-04",
        fines: {
            githubFine: 1,
            miniLeaderFine: 2,
            miniStudentFine: 3
        },
        aura: {
            points: 88,
            classWork: 88,
            attendance: 88,
            help: 88,
            camera: 88,
            answers: 883
        },
        payedInfo: false,
        comment: {
            leaderComment: "123",
            leaderProof: "123",
            controller: {
                miniLeaderController: "miniLeaderController",
                leaderController: "leaderController"
            }
        }
    },
    {
        _id: "49c6589f-aba81-4d02-bce2-54568de0b51d40",
        name: "davit lomim",
        age: 21,
        studentFbLink: "https://facebook.com/alicejohnson",
        email: "alicejohnson@example.com",
        githubLink: "https://github.com/alicejohnson",
        speed: 99,
        role: "member",
        group: "46",
        leaderId: "675dee40a1bb4008aab7ce43",
        parentFbLink: "https://facebook.com/alicejohnsonparent",
        githubToken: "4534534345436464564564345345",
        githubLastUpdate: "2021-09-05",
        fines: {
            githubFine: 1,
            miniLeaderFine: 1,
            miniStudentFine: 1
        },
        aura: {
            points: 9999999,
            classWork: 999999,
            attendance: 999999,
            help: 999999,
            camera: 999999,
            answers: 9993999
        },
        payedInfo: true,
        comment: {
            leaderComment: "123",
            leaderProof: "123",
            controller: {
                miniLeaderController: "123",
                leaderController: "123"
            }
        }
    },
    {
        "_id": "49c6589f-aba8-4d0212-bce2-548de0b51d40",
        "name": "nameless",
        "age": 21,
        "studentFbLink": "https://facebook.com/alicejohnson",
        "email": "alicejohnson@example.com",
        "speed": 5,
        "role": "member",
        "group": "46",
        "leaderId": "675dee40a1bb4008aab7ce43",
        "parentFbLink": "https://facebook.com/alicejohnsonparent",
        "githubLink": "https://github.com/alicejohnson",
        "githubToken": "12345624412423423242342342414",
        "githubLastUpdate": "2021-09-06",
        "fines": {
            "githubFine": 1,
            "miniLeaderFine": 1,
            "miniStudentFine": 1
        },
        "aura": {
            "points": 1,
            "classWork": 1,
            "attendance": 1,
            "help": 1,
            "camera": 1,
            "answers": 1
        },
        "payedInfo": true,
        "comment": {
            "leaderComment": "123",
            "leaderProof": "123",
            "controller": {
                "miniLeaderController": "123",
                "leaderController": "123"
            }
        }
    },
];
var LeaderComment = function (_a) {
    var row = _a.row;
    var _b = React.useState(row.getValue("comment")), comment = _b[0], setComment = _b[1];
    var _c = React.useState(false), isDialogOpen = _c[0], setIsDialogOpen = _c[1];
    var handleChange = function (e) {
        var _a = e.target, id = _a.id, value = _a.value;
        setComment(function (prev) {
            var newComment = __assign({}, prev);
            if (id in newComment) {
                newComment[id] = value;
            }
            else if (id in newComment.controller) {
                newComment.controller[id] = value;
            }
            return newComment;
        });
    };
    var handleSubmit = function (e) {
        e.preventDefault();
        // Save the comment here (e.g., send it to the server)
        setIsDialogOpen(false); // Close the dialog
    };
    return (React.createElement(dialog_1.Dialog, { open: isDialogOpen, onOpenChange: setIsDialogOpen },
        React.createElement(dialog_1.DialogTrigger, { asChild: true },
            React.createElement(button_1.Button, { variant: "outline", onClick: function () { return setIsDialogOpen(true); } }, "Edit Comment")),
        React.createElement(dialog_1.DialogContent, { className: "sm:max-w-[425px]" },
            React.createElement(dialog_1.DialogHeader, null,
                React.createElement(dialog_1.DialogTitle, null, "Edit Comment"),
                React.createElement(dialog_1.DialogDescription, null, "Make changes to the comment here. Click save when you're done.")),
            React.createElement("form", { onSubmit: handleSubmit },
                React.createElement("div", { className: "grid gap-4 py-4" },
                    React.createElement("div", { className: "grid grid-cols-4 items-center gap-4" },
                        React.createElement(label_1.Label, { htmlFor: "leaderComment", className: "text-right" }, "Leader Comment"),
                        React.createElement(input_1.Input, { id: "leaderComment", value: comment.leaderComment, onChange: handleChange, className: "col-span-3" })),
                    React.createElement("div", { className: "grid grid-cols-4 items-center gap-4" },
                        React.createElement(label_1.Label, { htmlFor: "leaderProof", className: "text-right" }, "Leader Proof"),
                        React.createElement(input_1.Input, { id: "leaderProof", value: comment.leaderProof, onChange: handleChange, className: "col-span-3" })),
                    React.createElement("div", { className: "grid grid-cols-4 items-center gap-4" },
                        React.createElement(label_1.Label, { htmlFor: "miniLeaderController", className: "text-right" }, "Mini Leader Controller"),
                        React.createElement(input_1.Input, { id: "miniLeaderController", value: comment.controller.miniLeaderController, onChange: handleChange, className: "col-span-3" })),
                    React.createElement("div", { className: "grid grid-cols-4 items-center gap-4" },
                        React.createElement(label_1.Label, { htmlFor: "leaderController", className: "text-right" }, "Leader Controller"),
                        React.createElement(input_1.Input, { id: "leaderController", value: comment.controller.leaderController, onChange: handleChange, className: "col-span-3" }))),
                React.createElement(dialog_1.DialogFooter, null,
                    React.createElement(button_1.Button, { type: "submit" }, "Save changes"))))));
};
exports.default = LeaderComment;
exports.columns = [
    {
        id: "select",
        header: function (_a) {
            var table = _a.table;
            return (React.createElement(checkbox_1.Checkbox, { checked: table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate"), onCheckedChange: function (value) { return table.toggleAllPageRowsSelected(!!value); }, "aria-label": "Select all" }));
        },
        cell: function (_a) {
            var row = _a.row;
            return (React.createElement(checkbox_1.Checkbox, { checked: row.getIsSelected(), onCheckedChange: function (value) { return row.toggleSelected(!!value); }, "aria-label": "Select row" }));
        },
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "role",
        header: function (_a) {
            var column = _a.column;
            return (React.createElement(button_1.Button, { variant: "ghost", onClick: function () { return column.toggleSorting(column.getIsSorted() === "asc"); } },
                "role",
                React.createElement(lucide_react_1.ArrowUpDown, null)));
        },
        cell: function (_a) {
            var row = _a.row;
            return (React.createElement("div", { className: "capitalize text-center" }, React.createElement(badge_1.Badge, null, row.getValue("role"))));
        },
    },
    {
        accessorKey: "name",
        header: function (_a) {
            var column = _a.column;
            return (React.createElement(button_1.Button, { variant: "ghost", onClick: function () { return column.toggleSorting(column.getIsSorted() === "asc"); } },
                "name",
                React.createElement(lucide_react_1.ArrowUpDown, null)));
        },
        cell: function (_a) {
            var row = _a.row;
            return (React.createElement("div", { className: "capitalize text-center" }, row.getValue("name")));
        },
    },
    {
        accessorKey: "age",
        header: "age",
        cell: function (_a) {
            var row = _a.row;
            return (React.createElement("div", { className: "capitalize text-center" },
                React.createElement(badge_1.Badge, { variant: "outline" }, row.getValue("age"))));
        },
    },
    {
        accessorKey: "email",
        header: "email",
        cell: function (_a) {
            var row = _a.row;
            return React.createElement("div", { className: "lowercase" }, row.getValue("email"));
        },
    },
    {
        accessorKey: "studentFbLink",
        header: "studentFbLink",
        cell: function (_a) {
            var row = _a.row;
            return (React.createElement("div", { className: "capitalize text-center" },
                React.createElement(react_router_dom_1.Link, { target: "_blank", to: row.getValue("studentFbLink") },
                    React.createElement(button_1.Button, { variant: "link" }, "Facebook"))));
        },
    },
    {
        accessorKey: "githubLastUpdate",
        header: function (_a) {
            var column = _a.column;
            return (React.createElement(button_1.Button, { variant: "ghost", onClick: function () { return column.toggleSorting(column.getIsSorted() === "asc"); } },
                "LastUpdate",
                React.createElement(lucide_react_1.ArrowUpDown, null)));
        },
        cell: function (_a) {
            var row = _a.row;
            return (React.createElement("div", { className: "capitalize text-center" }, row.getValue("githubLastUpdate")));
        },
    },
    {
        accessorKey: "githubLink",
        header: "githubLink",
        cell: function (_a) {
            var row = _a.row;
            return (React.createElement("div", { className: "capitalize text-center" },
                React.createElement(react_router_dom_1.Link, { target: "_blank", to: row.getValue("githubLink") },
                    React.createElement(button_1.Button, { variant: "link" }, "githubLink"))));
        },
    },
    {
        accessorKey: "speed",
        header: function (_a) {
            var column = _a.column;
            return (React.createElement(button_1.Button, { variant: "ghost", onClick: function () { return column.toggleSorting(column.getIsSorted() === "asc"); } },
                "speed",
                React.createElement(lucide_react_1.ArrowUpDown, null)));
        },
        cell: function (_a) {
            var row = _a.row;
            return (React.createElement("div", { className: "capitalize text-center " },
                React.createElement(badge_1.Badge, { variant: "outline" }, row.getValue("speed"))));
        },
    },
    {
        accessorKey: "group",
        header: function (_a) {
            var column = _a.column;
            return (React.createElement(button_1.Button, { variant: "ghost", onClick: function () { return column.toggleSorting(column.getIsSorted() === "asc"); } },
                "group",
                React.createElement(lucide_react_1.ArrowUpDown, null)));
        },
        cell: function (_a) {
            var row = _a.row;
            return (React.createElement("div", { className: "capitalize text-center" },
                React.createElement(badge_1.Badge, { variant: "outline" }, row.getValue("group"))));
        },
    },
    {
        accessorKey: "leaderId",
        header: "leaderId",
        cell: function (_a) {
            var row = _a.row;
            return (React.createElement("div", { className: "capitalize text-center" },
                React.createElement(react_router_dom_1.Link, { target: "_blank", to: row.getValue("leaderId") },
                    React.createElement(button_1.Button, { variant: "link" }, "leaderID"))));
        },
    },
    {
        accessorKey: "parentFbLink",
        header: "parentFbLink",
        cell: function (_a) {
            var row = _a.row;
            return (React.createElement("div", { className: "capitalize text-center" },
                React.createElement(react_router_dom_1.Link, { target: "_blank", to: row.getValue("parentFbLink") },
                    React.createElement(button_1.Button, { variant: "link" }, "parenLink"))));
        },
    },
    {
        accessorKey: "fines",
        header: function () {
            return (React.createElement(button_1.Button, { variant: "destructive" },
                "fines",
                React.createElement(lucide_react_1.ArrowUpDown, null)));
        },
        cell: function (_a) {
            var row = _a.row;
            return (React.createElement(hover_card_1.HoverCard, null,
                React.createElement(hover_card_1.HoverCardTrigger, { asChild: true },
                    React.createElement(button_1.Button, { variant: "link" }, "@fines")),
                React.createElement(hover_card_1.HoverCardContent, { className: "w-40 duration-100" },
                    React.createElement("div", { className: "flex justify-between" },
                        React.createElement("span", null, "githubFine"),
                        React.createElement("span", null, row.getValue("fines")["githubFine"])),
                    React.createElement("div", { className: "flex justify-between" },
                        React.createElement("span", null, "miniLeaderFine"),
                        React.createElement("span", null, row.getValue("fines")["miniLeaderFine"])),
                    React.createElement("div", { className: "flex justify-between" },
                        React.createElement("span", null, "miniStudentFine"),
                        React.createElement("span", null, row.getValue("fines")["miniStudentFine"])))));
        },
    },
    {
        accessorKey: "aura",
        header: function () {
            return (React.createElement(button_1.Button, { variant: "destructive" },
                "aura",
                React.createElement(lucide_react_1.ArrowUpDown, null)));
        },
        cell: function (_a) {
            var row = _a.row;
            return (React.createElement(hover_card_1.HoverCard, null,
                React.createElement(hover_card_1.HoverCardTrigger, { asChild: true },
                    React.createElement(button_1.Button, { variant: "link", onTouchStart: function (event) { return event.preventDefault(); } }, "@Aura")),
                React.createElement(hover_card_1.HoverCardContent, { className: "w-40 duration-100" },
                    React.createElement("div", { className: "flex justify-between" },
                        React.createElement("span", null, "points"),
                        React.createElement("span", null, row.getValue("aura")["points"])),
                    React.createElement("div", { className: "flex justify-between" },
                        React.createElement("span", null, "classWork"),
                        React.createElement("span", null, row.getValue("aura")["classWork"])),
                    React.createElement("div", { className: "flex justify-between" },
                        React.createElement("span", null, "attendance"),
                        React.createElement("span", null, row.getValue("aura")["attendance"])),
                    React.createElement("div", { className: "flex justify-between" },
                        React.createElement("span", null, "help"),
                        React.createElement("span", null, row.getValue("aura")["help"])),
                    React.createElement("div", { className: "flex justify-between" },
                        React.createElement("span", null, "camera"),
                        React.createElement("span", null, row.getValue("aura")["camera"])),
                    React.createElement("div", { className: "flex justify-between" },
                        React.createElement("span", null, "answers"),
                        React.createElement("span", null, row.getValue("aura")["answers"])))));
        },
    },
    {
        accessorKey: "payedInfo",
        header: "payedInfo",
        cell: function (_a) {
            var row = _a.row;
            return (React.createElement("div", { className: "capitalize text-center" }, row.getValue("payedInfo") ? "True" : "False"));
        },
    },
    {
        accessorKey: "comment",
        header: "comment",
        cell: function (_a) {
            var row = _a.row;
            return React.createElement(LeaderComment, { row: row });
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: function (_a) {
            var row = _a.row;
            var payment = row.original;
            var _b = React.useState(function () {
                var savedColors = JSON.parse(localStorage.getItem('rowColors') || '{}');
                return savedColors[payment._id] || '';
            }), rowColor = _b[0], setRowColor = _b[1];
            React.useEffect(function () {
                var savedColors = JSON.parse(localStorage.getItem('rowColors') || '{}');
                savedColors[payment._id] = rowColor;
                localStorage.setItem('rowColors', JSON.stringify(savedColors));
            }, [rowColor, payment._id]);
            var handleColorChange = function (color) {
                setRowColor(color);
            };
            return (React.createElement(dropdown_menu_1.DropdownMenu, null,
                React.createElement(dropdown_menu_1.DropdownMenuTrigger, { asChild: true },
                    React.createElement(button_1.Button, { variant: "ghost", className: "h-8 w-8 p-0" },
                        React.createElement("span", { className: "sr-only" }, "Open menu"),
                        React.createElement(lucide_react_1.MoreHorizontal, null))),
                React.createElement(dropdown_menu_1.DropdownMenuContent, { align: "end" },
                    React.createElement(dropdown_menu_1.DropdownMenuLabel, null, "Actions"),
                    React.createElement(dropdown_menu_1.DropdownMenuItem, { onClick: function () { return navigator.clipboard.writeText(payment._id); } }, "Copy payment ID"),
                    React.createElement(dropdown_menu_1.DropdownMenuSeparator, null),
                    React.createElement(dropdown_menu_1.DropdownMenuGroup, null,
                        React.createElement(dropdown_menu_1.DropdownMenuSub, null,
                            React.createElement(dropdown_menu_1.DropdownMenuSubTrigger, null, "colors"),
                            React.createElement(dropdown_menu_1.DropdownMenuPortal, null,
                                React.createElement(dropdown_menu_1.DropdownMenuSubContent, null,
                                    React.createElement(dropdown_menu_1.DropdownMenuItem, { onClick: function () { return handleColorChange('inherit'); } }, "none"),
                                    React.createElement(dropdown_menu_1.DropdownMenuItem, { onClick: function () { return handleColorChange('var(action-color-white)'); } },
                                        React.createElement(lucide_react_1.Circle, { color: "var(--action-color-white)" }),
                                        "white"),
                                    React.createElement(dropdown_menu_1.DropdownMenuItem, { onClick: function () { return handleColorChange('var(--action-color-red)'); } },
                                        React.createElement(lucide_react_1.Circle, { color: "var(--action-color-red)" }),
                                        "red"),
                                    React.createElement(dropdown_menu_1.DropdownMenuItem, { onClick: function () { return handleColorChange('var(--action-color-green)'); } },
                                        React.createElement(lucide_react_1.Circle, { color: "var(--action-color-green)" }),
                                        "green"),
                                    React.createElement(dropdown_menu_1.DropdownMenuItem, { onClick: function () { return handleColorChange('var(--action-color-yellow)'); } },
                                        React.createElement(lucide_react_1.Circle, { color: "var(--action-color-yellow)" }),
                                        "yellow"),
                                    React.createElement(dropdown_menu_1.DropdownMenuItem, { onClick: function () { return handleColorChange('var(--action-color-purple)'); } },
                                        React.createElement(lucide_react_1.Circle, { color: "var(--action-color-purple)" }),
                                        "purple"),
                                    React.createElement(dropdown_menu_1.DropdownMenuItem, { onClick: function () { return handleColorChange('var(--action-color-orange)'); } },
                                        React.createElement(lucide_react_1.Circle, { color: "var(--action-color-orange)" }),
                                        "orange"),
                                    React.createElement(dropdown_menu_1.DropdownMenuItem, { onClick: function () { return handleColorChange('var(--action-color-pink)'); } },
                                        React.createElement(lucide_react_1.Circle, { color: "var(--action-color-pink)" }),
                                        "pink"))))))));
        },
    },
];
function DataTable() {
    var _a, _b, _c;
    var _d = React.useState(function () {
        var savedSorting = localStorage.getItem('sorting');
        return savedSorting ? JSON.parse(savedSorting) : [];
    }), sorting = _d[0], setSorting = _d[1];
    var _e = React.useState(function () {
        var savedFilters = localStorage.getItem('columnFilters');
        return savedFilters ? JSON.parse(savedFilters) : [];
    }), columnFilters = _e[0], setColumnFilters = _e[1];
    var _f = React.useState(function () {
        var savedVisibility = localStorage.getItem('columnVisibility');
        return savedVisibility ? JSON.parse(savedVisibility) : {};
    }), columnVisibility = _f[0], setColumnVisibility = _f[1];
    var _g = React.useState(function () {
        var savedSelection = localStorage.getItem('rowSelection');
        return savedSelection ? JSON.parse(savedSelection) : {};
    }), rowSelection = _g[0], setRowSelection = _g[1];
    React.useEffect(function () {
        localStorage.setItem('sorting', JSON.stringify(sorting));
    }, [sorting]);
    React.useEffect(function () {
        localStorage.setItem('columnFilters', JSON.stringify(columnFilters));
    }, [columnFilters]);
    React.useEffect(function () {
        localStorage.setItem('columnVisibility', JSON.stringify(columnVisibility));
    }, [columnVisibility]);
    React.useEffect(function () {
        localStorage.setItem('rowSelection', JSON.stringify(rowSelection));
    }, [rowSelection]);
    var table = (0, react_table_1.useReactTable)({
        data: data.sort(function (a, b) { return a.group < b.group ? 1 : -1; }),
        columns: exports.columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: (0, react_table_1.getCoreRowModel)(),
        getPaginationRowModel: (0, react_table_1.getPaginationRowModel)(),
        getSortedRowModel: (0, react_table_1.getSortedRowModel)(),
        getFilteredRowModel: (0, react_table_1.getFilteredRowModel)(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting: sorting,
            columnFilters: columnFilters,
            columnVisibility: columnVisibility,
            rowSelection: rowSelection,
        },
    });
    return (React.createElement("div", { className: "grid auto-rows-min overflow-hidden gap-4 grid-cols-1" },
        React.createElement("div", { className: "flex items-center py-4" },
            React.createElement(input_1.Input, { placeholder: "Filter name...", value: (_b = (_a = table.getColumn("name")) === null || _a === void 0 ? void 0 : _a.getFilterValue()) !== null && _b !== void 0 ? _b : "", onChange: function (event) { var _a; return (_a = table.getColumn("name")) === null || _a === void 0 ? void 0 : _a.setFilterValue(event.target.value); }, className: "max-w-sm" }),
            React.createElement(dropdown_menu_1.DropdownMenu, null,
                React.createElement(dropdown_menu_1.DropdownMenuTrigger, { asChild: true },
                    React.createElement(button_1.Button, { variant: "outline", className: "ml-auto" },
                        "Columns ",
                        React.createElement(lucide_react_1.ChevronDown, null))),
                React.createElement(dropdown_menu_1.DropdownMenuContent, { align: "end" }, table
                    .getAllColumns()
                    .filter(function (column) { return column.getCanHide(); })
                    .map(function (column) {
                    return (React.createElement(dropdown_menu_1.DropdownMenuCheckboxItem, { key: column.id, className: "capitalize text-center", checked: column.getIsVisible(), onCheckedChange: function (value) {
                            return column.toggleVisibility(!!value);
                        } }, column.id));
                })))),
        React.createElement(scroll_area_1.ScrollArea, null,
            React.createElement("div", { className: "rounded-md border" },
                React.createElement(table_1.Table, null,
                    React.createElement(table_1.TableHeader, null, table.getHeaderGroups().map(function (headerGroup) { return (React.createElement(table_1.TableRow, { key: headerGroup.id }, headerGroup.headers.map(function (header) {
                        return (React.createElement(table_1.TableHead, { key: header.id }, header.isPlaceholder
                            ? null
                            : (0, react_table_1.flexRender)(header.column.columnDef.header, header.getContext())));
                    }))); })),
                    React.createElement(table_1.TableBody, null, ((_c = table.getRowModel().rows) === null || _c === void 0 ? void 0 : _c.length) ? (table.getRowModel().rows.map(function (row) { return (React.createElement(table_1.TableRow, { key: row.id, "data-state": row.getIsSelected() && "selected", style: { backgroundColor: JSON.parse(localStorage.getItem('rowColors') || '{}')[row.original._id] || '' } }, row.getVisibleCells().map(function (cell) { return (React.createElement(table_1.TableCell, { key: cell.id }, (0, react_table_1.flexRender)(cell.column.columnDef.cell, cell.getContext()))); }))); })) : (React.createElement(table_1.TableRow, null,
                        React.createElement(table_1.TableCell, { colSpan: exports.columns.length, className: "h-24 text-center" }, "No results.")))))),
            React.createElement(scroll_area_1.ScrollBar, { orientation: "horizontal" })),
        React.createElement("div", { className: "flex items-center justify-end space-x-2 py-4" },
            React.createElement("div", { className: "flex-1 text-sm text-muted-foreground" },
                table.getFilteredSelectedRowModel().rows.length,
                " of",
                " ",
                table.getFilteredRowModel().rows.length,
                " row(s) selected."),
            React.createElement("div", { className: "space-x-2" },
                React.createElement(button_1.Button, { variant: "outline", size: "sm", onClick: function () { return table.previousPage(); }, disabled: !table.getCanPreviousPage() }, "Previous"),
                React.createElement(button_1.Button, { variant: "outline", size: "sm", onClick: function () { return table.nextPage(); }, disabled: !table.getCanNextPage() }, "Next")))));
}
