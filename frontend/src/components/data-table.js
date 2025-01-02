import * as React from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, } from "./ui/sheet";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Circle, MoreHorizontal, X } from "lucide-react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, } from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "./ui/table";
import { Link } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../schema/user";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useAuthStore } from "../store/authStore";
import Loading from "./loading";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { toast } from "sonner";
export const columns = [
    {
        accessorKey: "role",
        header: ({ column }) => {
            return (React.createElement(Button, { variant: "ghost", onClick: () => column.toggleSorting(column.getIsSorted() === "asc") },
                "role",
                React.createElement(ArrowUpDown, null)));
        },
        cell: ({ row }) => (React.createElement("div", { className: "capitalize" }, React.createElement(Badge, null, row.getValue("role")))),
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (React.createElement(Button, { variant: "ghost", onClick: () => column.toggleSorting(column.getIsSorted() === "asc") },
                "name",
                React.createElement(ArrowUpDown, null)));
        },
        cell: ({ row }) => (React.createElement("div", { className: "capitalize" }, row.getValue("name"))),
    },
    {
        accessorKey: "age",
        header: "age",
        cell: ({ row }) => (React.createElement("div", { className: "capitalize" },
            React.createElement(Badge, { variant: "outline" }, row.getValue("age")))),
    },
    {
        accessorKey: "email",
        header: "email",
        cell: ({ row }) => React.createElement("div", { className: "lowercase" }, row.getValue("email")),
    },
    {
        accessorKey: "studentFbLink",
        header: "studentFbLink",
        cell: ({ row }) => (React.createElement("div", { className: "capitalize" },
            React.createElement(Link, { target: "_blank", to: row.getValue("studentFbLink") },
                React.createElement(Button, { variant: "link" }, "Facebook")))),
    },
    {
        accessorKey: "githubLastUpdate",
        header: ({ column }) => {
            return (React.createElement(Button, { variant: "ghost", onClick: () => column.toggleSorting(column.getIsSorted() === "asc") },
                "LastUpdate",
                React.createElement(ArrowUpDown, null)));
        },
        cell: ({ row }) => (React.createElement("div", { className: "capitalize" }, row.getValue("githubLastUpdate"))),
    },
    {
        accessorKey: "githubLink",
        header: "githubLink",
        cell: ({ row }) => (React.createElement("div", { className: "capitalize" },
            React.createElement(Link, { target: "_blank", to: row.getValue("githubLink") },
                React.createElement(Button, { variant: "link" }, "githubLink")))),
    },
    {
        accessorKey: "speed",
        header: ({ column }) => {
            return (React.createElement(Button, { variant: "ghost", onClick: () => column.toggleSorting(column.getIsSorted() === "asc") },
                "speed",
                React.createElement(ArrowUpDown, null)));
        },
        cell: ({ row }) => (React.createElement("div", { className: "capitalize " },
            React.createElement(Badge, { variant: "outline" }, row.getValue("speed")))),
    },
    {
        accessorKey: "group",
        header: ({ column }) => {
            return (React.createElement(Button, { variant: "ghost", onClick: () => column.toggleSorting(column.getIsSorted() === "asc") },
                "group",
                React.createElement(ArrowUpDown, null)));
        },
        cell: ({ row }) => (React.createElement("div", { className: "capitalize" },
            React.createElement(Badge, { variant: "outline" }, row.getValue("group")))),
    },
    {
        accessorKey: "leaderId",
        header: "leaderId",
        cell: ({ row }) => (React.createElement("div", { className: "capitalize" },
            React.createElement(Link, { target: "_blank", to: row.getValue("leaderId") },
                React.createElement(Button, { variant: "link" }, "leaderID")))),
    },
    {
        accessorKey: "parentFbLink",
        header: "parentFbLink",
        cell: ({ row }) => (React.createElement("div", { className: "capitalize" },
            React.createElement(Link, { target: "_blank", to: row.getValue("parentFbLink") },
                React.createElement(Button, { variant: "link" }, "parenLink")))),
    },
    {
        accessorKey: "fines",
        header: () => {
            return (React.createElement(Button, { variant: "destructive" },
                "fines",
                React.createElement(ArrowUpDown, null)));
        },
        cell: ({ row }) => (React.createElement(HoverCard, null,
            React.createElement(HoverCardTrigger, { asChild: true },
                React.createElement(Button, { variant: "link" }, "@fines")),
            React.createElement(HoverCardContent, { className: "w-40 duration-100" },
                React.createElement("div", { className: "flex justify-between" },
                    React.createElement("span", null, "githubFine"),
                    React.createElement("span", null, row.getValue("fines").githubFine)),
                React.createElement("div", { className: "flex justify-between" },
                    React.createElement("span", null, "miniLeaderFine"),
                    React.createElement("span", null, row.getValue("fines").miniLeaderFine)),
                React.createElement("div", { className: "flex justify-between" },
                    React.createElement("span", null, "miniStudentFine"),
                    React.createElement("span", null, row.getValue("fines").miniStudentFine))))),
    },
    {
        accessorKey: "aura",
        header: () => {
            return (React.createElement(Button, { variant: "destructive" },
                "aura",
                React.createElement(ArrowUpDown, null)));
        },
        cell: ({ row }) => (React.createElement(HoverCard, null,
            React.createElement(HoverCardTrigger, { asChild: true },
                React.createElement(Button, { variant: "link", onTouchStart: (event) => event.preventDefault() }, "@Aura")),
            React.createElement(HoverCardContent, { className: "w-40 duration-100" },
                React.createElement("div", { className: "flex justify-between" },
                    React.createElement("span", null, "points"),
                    React.createElement("span", null, row.getValue("aura").points)),
                React.createElement("div", { className: "flex justify-between" },
                    React.createElement("span", null, "classwork"),
                    React.createElement("span", null, row.getValue("aura").classwork)),
                React.createElement("div", { className: "flex justify-between" },
                    React.createElement("span", null, "attendance"),
                    React.createElement("span", null, row.getValue("aura").attendance)),
                React.createElement("div", { className: "flex justify-between" },
                    React.createElement("span", null, "help"),
                    React.createElement("span", null, row.getValue("aura").help)),
                React.createElement("div", { className: "flex justify-between" },
                    React.createElement("span", null, "camera"),
                    React.createElement("span", null, row.getValue("aura").camera)),
                React.createElement("div", { className: "flex justify-between" },
                    React.createElement("span", null, "answers"),
                    React.createElement("span", null, row.getValue("aura").answers))))),
    },
    {
        accessorKey: "payedInfo",
        header: "payedInfo",
        cell: ({ row }) => (React.createElement("div", { className: "capitalize" }, row.getValue("payedInfo") ? "True" : "False")),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const payment = row.original;
            const [rowColor, setRowColor] = React.useState(() => {
                const savedColors = JSON.parse(localStorage.getItem('rowColors') || '{}');
                return savedColors[payment._id] || '';
            });
            React.useEffect(() => {
                const savedColors = JSON.parse(localStorage.getItem('rowColors') || '{}');
                savedColors[payment._id] = rowColor;
                localStorage.setItem('rowColors', JSON.stringify(savedColors));
            }, [rowColor, payment._id]);
            const handleColorChange = (color) => {
                setRowColor(color);
            };
            return (React.createElement(DropdownMenu, null,
                React.createElement(DropdownMenuTrigger, { asChild: true },
                    React.createElement(Button, { variant: "ghost", className: "h-8 w-8 p-0" },
                        React.createElement("span", { className: "sr-only" }, "Open menu"),
                        React.createElement(MoreHorizontal, null))),
                React.createElement(DropdownMenuContent, { align: "end" },
                    React.createElement(DropdownMenuLabel, null, "Actions"),
                    React.createElement(DropdownMenuItem, { onClick: () => navigator.clipboard.writeText(payment._id) }, "Copy Student ID"),
                    React.createElement(DropdownMenuItem, null, "Edt Student"),
                    React.createElement(DropdownMenuSeparator, null),
                    React.createElement(DropdownMenuGroup, null,
                        React.createElement(DropdownMenuSub, null,
                            React.createElement(DropdownMenuSubTrigger, null, "colors"),
                            React.createElement(DropdownMenuPortal, null,
                                React.createElement(DropdownMenuSubContent, null,
                                    React.createElement(DropdownMenuItem, { onClick: () => handleColorChange('inherit') }, "none"),
                                    React.createElement(DropdownMenuItem, { onClick: () => handleColorChange('var(action-color-white)') },
                                        React.createElement(Circle, { color: "var(--action-color-white)" }),
                                        "white"),
                                    React.createElement(DropdownMenuItem, { onClick: () => handleColorChange('var(--action-color-red)') },
                                        React.createElement(Circle, { color: "var(--action-color-red)" }),
                                        "red"),
                                    React.createElement(DropdownMenuItem, { onClick: () => handleColorChange('var(--action-color-green)') },
                                        React.createElement(Circle, { color: "var(--action-color-green)" }),
                                        "green"),
                                    React.createElement(DropdownMenuItem, { onClick: () => handleColorChange('var(--action-color-yellow)') },
                                        React.createElement(Circle, { color: "var(--action-color-yellow)" }),
                                        "yellow"),
                                    React.createElement(DropdownMenuItem, { onClick: () => handleColorChange('var(--action-color-purple)') },
                                        React.createElement(Circle, { color: "var(--action-color-purple)" }),
                                        "purple"),
                                    React.createElement(DropdownMenuItem, { onClick: () => handleColorChange('var(--action-color-orange)') },
                                        React.createElement(Circle, { color: "var(--action-color-orange)" }),
                                        "orange"),
                                    React.createElement(DropdownMenuItem, { onClick: () => handleColorChange('var(--action-color-pink)') },
                                        React.createElement(Circle, { color: "var(--action-color-pink)" }),
                                        "pink"))))))));
        },
    },
];
export function DataTable() {
    var _a, _b, _c;
    const [sorting, setSorting] = React.useState(() => {
        const savedSorting = localStorage.getItem('sorting');
        return savedSorting ? JSON.parse(savedSorting) : [];
    });
    const [columnFilters, setColumnFilters] = React.useState(() => {
        const savedFilters = localStorage.getItem('columnFilters');
        return savedFilters ? JSON.parse(savedFilters) : [];
    });
    const [columnVisibility, setColumnVisibility] = React.useState(() => {
        const savedVisibility = localStorage.getItem('columnVisibility');
        return savedVisibility ? JSON.parse(savedVisibility) : {};
    });
    const [rowSelection, setRowSelection] = React.useState(() => {
        const savedSelection = localStorage.getItem('rowSelection');
        return savedSelection ? JSON.parse(savedSelection) : {};
    });
    const [oneRowSelection, setOneRowSelection] = React.useState(() => {
        const savedSelection = localStorage.getItem('oneRowSelection');
        return savedSelection ? JSON.parse(savedSelection) : null;
    });
    const [studentInfo, setStudentInfo] = React.useState(false);
    const [sheetOpen, setSheetOpen] = React.useState(false);
    React.useEffect(() => {
        localStorage.setItem('sorting', JSON.stringify(sorting));
    }, [sorting]);
    React.useEffect(() => {
        localStorage.setItem('columnFilters', JSON.stringify(columnFilters));
    }, [columnFilters]);
    React.useEffect(() => {
        localStorage.setItem('columnVisibility', JSON.stringify(columnVisibility));
    }, [columnVisibility]);
    const { user, oneLeaderStudent, oneLeaderStudentArr, oneStudentDefine, oneStudent, isLoading, studentUpdate } = useAuthStore();
    React.useEffect(() => {
        oneLeaderStudent(user.user._id);
    }, [user.user._id, oneLeaderStudent]);
    React.useEffect(() => {
        if (oneRowSelection) {
            oneStudentDefine(oneRowSelection.leaderId, oneRowSelection._id);
        }
    }, [oneRowSelection]);
    const table = useReactTable({
        data: oneLeaderStudentArr.sort((a, b) => a.group < b.group ? 1 : -1),
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });
    const form = useForm({
        resolver: zodResolver(userSchema),
        defaultValues: {
            _id: '',
            group: 0,
            leaderId: '',
            name: '',
            studentFbLink: '',
            age: 0,
            email: '',
            githubLink: '',
            speed: 0,
            role: '',
            parentFbLink: '',
            githubToken: '',
            githubLastUpdate: '',
            fines: { githubFine: 0, miniLeaderFine: 0, miniStudentFine: 0 },
            aura: { points: 0, classwork: 0, attendance: 0, help: 0, camera: 0, answers: 0 },
            payedInfo: false,
            comment: { leaderComment: '', leaderProof: '', controller: { miniLeaderController: '', githubController: '' } },
        },
    });
    React.useEffect(() => {
        form.reset({
            _id: (oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent._id) || '',
            group: (oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.group) || 0,
            leaderId: (oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.leaderId) || '',
            name: (oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.name) || '',
            studentFbLink: (oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.studentFbLink) || '',
            age: (oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.age) || 0,
            email: (oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.email) || '',
            githubLink: (oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.githubLink) || '',
            speed: (oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.speed) || 0,
            role: (oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.role) || '',
            parentFbLink: (oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.parentFbLink) || '',
            githubToken: (oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.githubToken) || '',
            githubLastUpdate: (oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.githubLastUpdate) || '',
            fines: (oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.fines) || { githubFine: 0, miniLeaderFine: 0, miniStudentFine: 0 },
            aura: (oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.aura) || { points: 0, classwork: 0, attendance: 0, help: 0, camera: 0, answers: 0 },
            payedInfo: (oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.payedInfo) || false,
            comment: (oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.comment) || { leaderComment: '', leaderProof: '', controller: { miniLeaderController: '', githubController: '' } },
        });
    }, [oneStudent, form]);
    const formRender = (typeMain, minNum, maxNum, id, label, roles, row) => {
        if (typeMain === 'number') {
            return (React.createElement(FormField, { control: form.control, name: id, render: ({ field, fieldState: { error } }) => (React.createElement(FormItem, { className: "grid grid-cols-4 items-center w-full justify-start gap-2" },
                    React.createElement(FormLabel, { className: "grid-cols-2 capitalize" }, label),
                    React.createElement(FormControl, null,
                        React.createElement(Input, Object.assign({ type: typeMain, className: "col-span-3", placeholder: `Enter ${label}`, min: minNum, max: maxNum }, field, { value: typeof field.value === 'boolean' || typeof field.value === 'object' ? '' : field.value, onChange: (e) => {
                                const value = e.target.value === '' ? '' : Number(e.target.value);
                                const numericValue = Number(value);
                                if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 99) {
                                    field.onChange(value);
                                    handleInputChange(oneRowSelection, id, value);
                                }
                            } }))),
                    React.createElement(FormMessage, { className: "col-span-3" }, error === null || error === void 0 ? void 0 : error.message))) }));
        }
        else if (typeMain === 'string') {
            return (React.createElement(FormField, { control: form.control, name: id, render: ({ field, fieldState: { error } }) => (React.createElement(FormItem, { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                    React.createElement(FormLabel, { className: "grid-cols-2" }, label),
                    React.createElement(FormControl, null,
                        React.createElement(Input, Object.assign({ className: "col-span-3", placeholder: `Enter ${label}` }, field, { value: typeof field.value === 'boolean' || typeof field.value === 'object' ? '' : field.value, onChange: (e) => {
                                field.onChange(e);
                                handleInputChange(oneRowSelection, id, e.target.value);
                            } }))),
                    React.createElement(FormMessage, { className: "col-span-3" }, error === null || error === void 0 ? void 0 : error.message))) }));
        }
        else if (typeMain === 'role') {
            return (
            // ! not working!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            React.createElement(FormField, { control: form.control, name: id, render: ({ fieldState: { error } }) => (React.createElement(FormItem, { className: "grid grid-cols-4 items-center w-full justify-start gap-2" },
                    React.createElement(FormLabel, { className: "grid-cols-2" }, "Role"),
                    React.createElement(FormField, { control: form.control, name: id, render: ({ fieldState: { error } }) => (React.createElement(FormItem, { className: "grid grid-cols-4 items-center w-full justify-start gap-2" },
                            React.createElement(Select, { onValueChange: (value) => handleInputChange(oneRowSelection, 'role', value) },
                                React.createElement(SelectTrigger, { className: "col-span-3" },
                                    React.createElement(SelectValue, { placeholder: `${label}` })),
                                React.createElement(SelectContent, null,
                                    React.createElement(SelectGroup, null,
                                        React.createElement(SelectLabel, { className: "capitalize" }, label),
                                        roles.map((role, index) => (React.createElement(SelectItem, { key: index, value: role }, role)))))))) }))) }));
        }
    };
    const handleInputChange = (row, field, value) => {
        if (row && row.original) {
            row.original[field] = value;
            setRowSelection(Object.assign({}, rowSelection));
        }
    };
    const onSubmit = (data) => {
        setOneRowSelection((prev) => (Object.assign(Object.assign({}, prev), { leaderId: data.leaderId })));
        studentUpdate(oneStudent.leaderId, oneStudent._id, data);
        if (!isLoading)
            setStudentInfo(false);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: `bg-[var(--background)] grid auto-rows-min overflow-hidden gap-4 grid-cols-1 px-2` },
            React.createElement("div", { className: "flex items-center py-4" },
                React.createElement(Input, { placeholder: "Student name...", value: (_b = (_a = table.getColumn("name")) === null || _a === void 0 ? void 0 : _a.getFilterValue()) !== null && _b !== void 0 ? _b : "", onChange: (event) => { var _a; return (_a = table.getColumn("name")) === null || _a === void 0 ? void 0 : _a.setFilterValue(event.target.value); }, className: "max-w-sm" }),
                React.createElement(DropdownMenu, null,
                    React.createElement(DropdownMenuTrigger, { asChild: true },
                        React.createElement(Button, { variant: "outline", className: "ml-auto" },
                            "Columns ",
                            React.createElement(ChevronDown, null))),
                    React.createElement(DropdownMenuContent, { align: "end" }, table
                        .getAllColumns()
                        .filter((column) => column.getCanHide())
                        .map((column) => {
                        return (React.createElement(DropdownMenuCheckboxItem, { key: column.id, className: "capitalize text-center", checked: column.getIsVisible(), onCheckedChange: (value) => column.toggleVisibility(!!value) }, column.id));
                    })))),
            React.createElement(ScrollArea, null,
                React.createElement("div", { className: "rounded-md border" },
                    React.createElement(Table, null,
                        React.createElement(TableHeader, null, table.getHeaderGroups().map((headerGroup) => (React.createElement(TableRow, { key: headerGroup.id }, headerGroup.headers.map((header) => {
                            return (React.createElement(TableHead, { key: header.id }, header.isPlaceholder
                                ? null
                                : flexRender(header.column.columnDef.header, header.getContext())));
                        }))))),
                        React.createElement(TableBody, null, ((_c = table.getRowModel().rows) === null || _c === void 0 ? void 0 : _c.length) ? (table.getRowModel().rows.map((row) => {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
                            return (React.createElement(Sheet, { key: row.id, open: sheetOpen },
                                React.createElement(SheetTrigger, { asChild: true, onClick: () => { setOneRowSelection(row.original), (setSheetOpen(true)); } }, (React.createElement(TableRow, { "data-state": row.getIsSelected() && "selected", style: { backgroundColor: JSON.parse(localStorage.getItem('rowColors') || '{}')[row.original._id] || '' } }, row.getVisibleCells().map((cell) => (React.createElement(TableCell, { key: cell.id }, flexRender(cell.column.columnDef.cell, cell.getContext()))))))),
                                React.createElement(SheetContent, null,
                                    React.createElement(SheetHeader, { className: "shadow-sm pb-2" },
                                        React.createElement("div", { className: "flex justify-between" },
                                            React.createElement(SheetTitle, null, studentInfo ? "Edit Student" : "Info Student"),
                                            React.createElement(AlertDialog, null,
                                                React.createElement(AlertDialogTrigger, { asChild: true, onClick: () => !studentInfo && setSheetOpen(false) },
                                                    React.createElement(X, { className: "cursor-pointer" })),
                                                studentInfo && (React.createElement(AlertDialogContent, null,
                                                    React.createElement(AlertDialogHeader, null,
                                                        React.createElement(AlertDialogTitle, null, "Are you absolutely sure?"),
                                                        React.createElement(AlertDialogDescription, null, "This action cannot be undone. This will permanently delete your account and remove your data from our servers.")),
                                                    React.createElement(AlertDialogFooter, null,
                                                        React.createElement(AlertDialogCancel, { onClick: () => setSheetOpen(false) }, "Continue"),
                                                        React.createElement(AlertDialogCancel, null, "Cancel")))))),
                                        React.createElement(SheetDescription, { className: "flex items-center justify-between" },
                                            React.createElement("span", null, studentInfo ? "Make changes to your profile here. Click save when you're done." : "Get Student information here."),
                                            React.createElement(Button, { onClick: () => { setStudentInfo(!studentInfo); }, className: "bg-green-500 text-sm px-6 py-4 hover:bg-green-400" }, !studentInfo ? "Edit" : "Info"))),
                                    isLoading ? React.createElement(Loading, null) : (React.createElement(ScrollArea, { className: "h-full p-4 pb-16" }, (studentInfo && !isLoading) ? (React.createElement(Form, Object.assign({}, form),
                                        React.createElement("form", { onSubmit: form.handleSubmit(onSubmit) },
                                            React.createElement("div", { className: "grid gap-4 py-4" },
                                                React.createElement("p", { className: "font-bold leading-[5px] text-slate-400" }, "leader edit"),
                                                (user.user.role.includes("leaderController") ||
                                                    (user.user.role.includes("admin"))) && (React.createElement(React.Fragment, null, formRender('string', 0, 0, 'leaderId', 'Leader ID', [], ''))),
                                                formRender('string', 0, 0, 'name', 'Name', [], ''),
                                                formRender("number", 0, 99, "age", "Age", [], ''),
                                                formRender('string', 0, 0, 'studentFbLink', 'Student Facebook Link', [], ''),
                                                formRender('string', 0, 0, 'email', 'Email', [], ''),
                                                formRender('string', 0, 0, 'githubLink', 'Github Link', [], ''),
                                                formRender('number', 0, 4, 'speed', 'Speed', [], ''),
                                                !user.user.role.includes("miniLeader") && (React.createElement(React.Fragment, null, formRender('role', 0, 0, 'role', 'Role', ['student', 'miniLeader'], ""))),
                                                formRender('string', 0, 0, 'parentFbLink', 'Parent Facebook Link', [], ''),
                                                (user.user.role.includes("leaderController") ||
                                                    (user.user.role.includes("admin"))) && (React.createElement(React.Fragment, null, formRender('number', 0, 99, 'group', 'Group', [], ''))),
                                                formRender('string', 0, 0, 'githubToken', 'Github Token', [], ''),
                                                formRender('string', 0, 0, 'githubLastUpdate', 'Github Last Update', [], ''),
                                                React.createElement(Separator, null),
                                                React.createElement(Label, { className: "capitalize font-bold leading-[5px] text-slate-400" }, "Fines"),
                                                (user.user.role.includes("githubController") ||
                                                    (user.user.role.includes("miniLeaderController")) ||
                                                    (user.user.role.includes("miniMentorController")) ||
                                                    (user.user.role.includes("admin"))) && (React.createElement(React.Fragment, null,
                                                    formRender('number', 0, 99, 'fines.githubFine', 'Github Fine', [], ''),
                                                    formRender('number', 0, 99, 'fines.miniLeaderFine', 'Mini Leader Fine', [], ''),
                                                    formRender('number', 0, 99, 'fines.miniStudentFine', 'Mini Student Fine', [], ''))),
                                                React.createElement(Separator, null),
                                                React.createElement(Label, { className: "capitalize font-bold leading-[5px] text-slate-400" }, "Mentor Section"),
                                                (user.user.role.includes("admin") ||
                                                    user.user.role.includes("mentor")) && (React.createElement(React.Fragment, null,
                                                    formRender('number', 0, 999999, 'aura.points', 'Points', [], ''),
                                                    formRender('number', 0, 999999, 'aura.classwork', 'Classwork', [], ''),
                                                    formRender('number', 0, 999999, 'aura.attendance', 'Attendance', [], ''),
                                                    formRender('number', 0, 999999, 'aura.help', 'Help', [], ''),
                                                    formRender('number', 0, 999999, 'aura.camera', 'Camera', [], ''),
                                                    formRender('number', 0, 999999, 'aura.answers', 'Answers', [], ''),
                                                    formRender('boolean', 0, 0, 'payedInfo', 'Payed Info', [], ''))),
                                                React.createElement(Separator, null),
                                                React.createElement(Label, { className: "capitalize font-bold leading-[5px] text-slate-400" }, "Leader Comment"),
                                                (user.user.role.includes("admin") ||
                                                    (user.user.role.includes("leader") && (oneStudent.leaderId == user.user._id)) ||
                                                    user.user.role.includes("admin")) && (React.createElement(React.Fragment, null,
                                                    formRender('string', 0, 0, 'comment.leaderComment', 'Leader Comment', [], ''),
                                                    formRender('string', 0, 0, 'comment.leaderProof', 'Leader Proof', [], ''))),
                                                React.createElement(Separator, null),
                                                React.createElement(Label, { className: "capitalize font-bold leading-[5px] text-slate-400" }, "Control comment"),
                                                (user.user.role.includes("miniLeaderController") ||
                                                    user.user.role.includes("githubController") ||
                                                    user.user.role.includes("admin")) &&
                                                    (React.createElement(React.Fragment, null,
                                                        formRender('string', 0, 0, 'comment.controller.miniLeaderController', 'Mini Leader Controller', [], ''),
                                                        formRender('string', 0, 0, 'comment.controller.githubController', 'Github Controller', [], ''))),
                                                React.createElement("div", { className: "ml-auto space-x-2" },
                                                    React.createElement(Button, { type: "submit", variant: "green", onClick: () => toast("Student has been updated", {
                                                            description: `${oneStudent.updatedAt}`,
                                                            action: {
                                                                label: "Undo",
                                                                onClick: () => console.log("Undo"),
                                                            }
                                                        }) }, " Save changes"),
                                                    React.createElement(AlertDialog, null,
                                                        React.createElement(AlertDialogTrigger, { asChild: true },
                                                            React.createElement(Button, { variant: "destructive" }, "Cancel")),
                                                        sheetOpen && (React.createElement(AlertDialogContent, null,
                                                            React.createElement(AlertDialogHeader, null,
                                                                React.createElement(AlertDialogTitle, null, "Are you absolutely sure?"),
                                                                React.createElement(AlertDialogDescription, null, "This action cannot be undone. This will permanently delete your account and remove your data from our servers.")),
                                                            React.createElement(AlertDialogFooter, null,
                                                                React.createElement(AlertDialogCancel, null, "Cancel"),
                                                                React.createElement(AlertDialogAction, { onClick: () => setSheetOpen(false) }, "Continue"))))))))))
                                        :
                                            React.createElement(React.Fragment, null,
                                                React.createElement("div", null,
                                                    React.createElement("div", { className: "grid gap-4 py-4" },
                                                        React.createElement("p", { className: "font-bold leading-[5px] text-slate-400 capitalize" },
                                                            React.createElement("b", null, "Student info")),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2 capitalize" }, "Leader ID"),
                                                            React.createElement("span", { className: "col-span-3  font-bold" }, oneStudent.leaderId)),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "Name"),
                                                            React.createElement("span", { className: "col-span-3 font-bold" }, oneStudent.name)),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "Age"),
                                                            React.createElement("span", { className: "col-span-3 font-bold" }, oneStudent.age)),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "Email"),
                                                            React.createElement("span", { className: "col-span-3 font-bold" }, oneStudent.email)),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "Role"),
                                                            React.createElement("span", { className: "col-span-3 font-bold" }, oneStudent.role)),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "Github Link"),
                                                            React.createElement(Link, { className: "col-span-3 font-bold ", to: oneStudent.githubLink, target: "_blank" },
                                                                React.createElement(Button, { variant: "link", className: "m-0 p-0 text-blue-500" }, "Github"))),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "Parent Facebook Link"),
                                                            React.createElement(Link, { className: "col-span-3 font-bold", to: oneStudent.parentFbLink, target: "_blank" },
                                                                React.createElement(Button, { variant: "link", className: "m-0 p-0 text-blue-500" }, "Parent"))),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "Student Facebook Link"),
                                                            React.createElement(Link, { className: "col-span-3 font-bold", to: oneStudent.studentFbLink, target: "_blank" },
                                                                React.createElement(Button, { variant: "link", className: "m-0 p-0 text-blue-500" }, "Student"))),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "Group"),
                                                            React.createElement("span", { className: "col-span-3 font-bold" }, oneStudent.group)),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "Speed"),
                                                            React.createElement("span", { className: "col-span-3 font-bold" }, oneStudent.speed)),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "Github Token"),
                                                            React.createElement("span", { className: "col-span-3 font-bold" }, "****")),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "Github Last Update"),
                                                            React.createElement("span", { className: "col-span-3 font-bold" }, oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.githubLastUpdate)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("p", { className: "font-bold leading-[5px] text-slate-400 capitalize" },
                                                            React.createElement("b", null, "Controller info")),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "Github Fine"),
                                                            React.createElement("span", { className: "col-span-3 font-bold" }, (_a = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.fines) === null || _a === void 0 ? void 0 : _a.githubFine)),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "MiniLeader Fine"),
                                                            React.createElement("span", { className: "col-span-3 font-bold" }, (_b = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.fines) === null || _b === void 0 ? void 0 : _b.miniLeaderFine)),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "MiniLeader Fine"),
                                                            React.createElement("span", { className: "col-span-3 font-bold" }, (_c = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.fines) === null || _c === void 0 ? void 0 : _c.miniLeaderFine)),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "Mini Student Fine"),
                                                            React.createElement("span", { className: "col-span-3 font-bold" }, (_d = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.fines) === null || _d === void 0 ? void 0 : _d.miniStudentFine)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("p", { className: "font-bold leading-[5px] text-slate-400 capitalize" },
                                                            React.createElement("b", null, "Aura info")),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "Points"),
                                                            React.createElement("span", { className: "col-span-3 font-bold" }, ((_e = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.aura) === null || _e === void 0 ? void 0 : _e.answers) + ((_f = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.aura) === null || _f === void 0 ? void 0 : _f.attendance) + ((_g = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.aura) === null || _g === void 0 ? void 0 : _g.camera) + ((_h = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.aura) === null || _h === void 0 ? void 0 : _h.classwork) + ((_j = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.aura) === null || _j === void 0 ? void 0 : _j.help) + ((_k = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.aura) === null || _k === void 0 ? void 0 : _k.points))),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "Classwork"),
                                                            React.createElement("span", { className: "col-span-3 font-bold" }, (_l = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.aura) === null || _l === void 0 ? void 0 : _l.classwork)),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "Attendance"),
                                                            React.createElement("span", { className: "col-span-3 font-bold" }, (_m = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.aura) === null || _m === void 0 ? void 0 : _m.attendance)),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "Help"),
                                                            React.createElement("span", { className: "col-span-3 font-bold" }, (_o = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.aura) === null || _o === void 0 ? void 0 : _o.help)),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "Camera"),
                                                            React.createElement("span", { className: "col-span-3 font-bold" }, (_p = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.aura) === null || _p === void 0 ? void 0 : _p.camera)),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "Answers"),
                                                            React.createElement("span", { className: "col-span-3 font-bold" }, (_q = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.aura) === null || _q === void 0 ? void 0 : _q.answers)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("p", { className: "font-bold leading-[5px] text-slate-400 capitalize" },
                                                            React.createElement("b", null, "Comments")),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "Leader Comment"),
                                                            React.createElement("span", { className: "col-span-3 font-bold" }, (_r = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.comment) === null || _r === void 0 ? void 0 : _r.leaderComment)),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "Leader Poof"),
                                                            React.createElement(Link, { className: "col-span-3 font-bold", to: (_s = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.comment) === null || _s === void 0 ? void 0 : _s.leaderProof, target: "_blank" },
                                                                React.createElement(Button, { variant: "link", className: "m-0 p-0 text-blue-500" }, "Proof"))),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "Mini Leader Controller"),
                                                            React.createElement("span", { className: "col-span-3 font-bold" }, (_t = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.comment) === null || _t === void 0 ? void 0 : _t.controller.miniLeaderController)),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "grid-cols-2" }, "Github Controller"),
                                                            React.createElement("span", { className: "col-span-3 font-bold" }, (_u = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.comment) === null || _u === void 0 ? void 0 : _u.controller.githubController))))))))));
                        })) : (React.createElement(TableRow, null,
                            React.createElement(TableCell, { colSpan: columns.length, className: "h-24 text-center" },
                                React.createElement(Loading, null),
                                "No results.")))))),
                React.createElement(ScrollBar, { orientation: "horizontal" })),
            React.createElement("div", { className: " flex items-center justify-end space-x-2 py-4" },
                React.createElement("div", { className: "flex-1 text-sm text-muted-foreground" },
                    table.getFilteredSelectedRowModel().rows.length,
                    " of",
                    " ",
                    table.getFilteredRowModel().rows.length,
                    " row(s) selected."),
                React.createElement("div", { className: "space-x-2" },
                    React.createElement(Button, { variant: "outline", size: "sm", onClick: () => table.previousPage(), disabled: !table.getCanPreviousPage() }, "Previous"),
                    React.createElement(Button, { variant: "outline", size: "sm", onClick: () => table.nextPage(), disabled: !table.getCanNextPage() }, "Next"))))));
}
