import * as React from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, } from "./ui/sheet";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger, } from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "./ui/table";
import { Link } from "react-router-dom";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Badge } from "./ui/badge";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { Separator } from "./ui/separator";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../schema/user";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useAuthStore } from "../store/authStore";
import Loading from "./loading";
import { toast } from "sonner";
import { Checkbox } from "./ui/checkbox";
export const columns = [
    {
        id: "select",
        header: ({ table }) => (React.createElement(Checkbox, { checked: table.getIsAllPageRowsSelected() ? true :
                table.getIsSomePageRowsSelected() ? "indeterminate" : false, onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value), "aria-label": "Select all" })),
        cell: ({ row }) => (React.createElement(Checkbox, { checked: row.getIsSelected(), onCheckedChange: (value) => row.toggleSelected(!!value), "aria-label": "Select row" })),
        enableSorting: false,
        enableHiding: false,
    },
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
];
export function DataTable() {
    var _a, _b, _c, _d;
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
        var _a;
        oneLeaderStudent((_a = user === null || user === void 0 ? void 0 : user.user) === null || _a === void 0 ? void 0 : _a._id);
    }, [(_a = user === null || user === void 0 ? void 0 : user.user) === null || _a === void 0 ? void 0 : _a._id, oneLeaderStudent]);
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
        var _a;
        if (oneStudent) {
            form.reset({
                _id: oneStudent._id || '',
                group: oneStudent.group || 0,
                leaderId: oneStudent.leaderId || '',
                name: oneStudent.name || '',
                studentFbLink: oneStudent.studentFbLink || '',
                age: oneStudent.age || 0,
                email: oneStudent.email || '',
                githubLink: oneStudent.githubLink || '',
                speed: oneStudent.speed || 0,
                role: oneStudent.role || '',
                parentFbLink: oneStudent.parentFbLink || '',
                githubToken: oneStudent.githubToken || '',
                githubLastUpdate: oneStudent.githubLastUpdate || '',
                fines: oneStudent.fines || { githubFine: 0, miniLeaderFine: 0, miniStudentFine: 0 },
                aura: oneStudent.aura || { points: 0, classwork: 0, attendance: 0, help: 0, camera: 0, answers: 0 },
                payedInfo: oneStudent.payedInfo || false,
                comment: oneStudent.comment || { leaderComment: '', leaderProof: '', controller: { miniLeaderController: '', githubController: '' } },
            });
            oneLeaderStudent((_a = user === null || user === void 0 ? void 0 : user.user) === null || _a === void 0 ? void 0 : _a._id);
        }
    }, [form, oneStudent,]);
    console.log(oneLeaderStudentArr);
    const formRender = (typeMain, minNum, maxNum, id, label, roles, row) => {
        React.createElement(Separator, null);
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
        if (!isLoading) {
            setStudentInfo(false);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: `bg-[var(--background)] grid auto-rows-min overflow-hidden gap-4 grid-cols-1 px-2` },
            React.createElement("div", { className: "flex items-center py-4" },
                React.createElement(Input, { placeholder: "Student name...", value: (_c = (_b = table.getColumn("name")) === null || _b === void 0 ? void 0 : _b.getFilterValue()) !== null && _c !== void 0 ? _c : "", onChange: (event) => { var _a; return (_a = table.getColumn("name")) === null || _a === void 0 ? void 0 : _a.setFilterValue(event.target.value); }, className: "max-w-sm" }),
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
                        React.createElement(TableBody, null, ((_d = table.getRowModel().rows) === null || _d === void 0 ? void 0 : _d.length) ? (table.getRowModel().rows.map((row) => {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12;
                            return (React.createElement(Sheet, { key: row.id },
                                React.createElement(SheetTrigger, { asChild: true, onClick: () => { setOneRowSelection(row.original); } },
                                    React.createElement(TableRow, { "data-state": row.getIsSelected() && "selected" }, row.getVisibleCells().map((cell) => (React.createElement(TableCell, { key: cell.id }, flexRender(cell.column.columnDef.cell, cell.getContext())))))),
                                React.createElement(SheetContent, null,
                                    React.createElement(SheetHeader, { className: "shadow-sm pb-2" },
                                        React.createElement(SheetTitle, null, studentInfo ? "Edit Student" : "Info Student"),
                                        React.createElement(SheetDescription, { className: "flex items-center justify-between" },
                                            React.createElement("span", null, studentInfo ? "Make changes to your profile here. Click save when you're done." : "Get Student information here."),
                                            React.createElement(Button, { onClick: () => { setStudentInfo(!studentInfo); }, className: "bg-green-500 text-sm px-6 py-4 hover:bg-green-400" }, !studentInfo ? "Edit" : "Info"))),
                                    isLoading ? React.createElement(Loading, null) : (React.createElement(ScrollArea, { className: "h-full p-4 pb-16" }, (studentInfo && !isLoading) ? (React.createElement(Form, Object.assign({}, form),
                                        React.createElement("form", { onSubmit: form.handleSubmit(onSubmit) },
                                            React.createElement("div", { className: "grid gap-4 py-4" },
                                                React.createElement("p", { className: "font-bold leading-[5px] text-slate-400" }, "leader edit"),
                                                (((_a = user === null || user === void 0 ? void 0 : user.user) === null || _a === void 0 ? void 0 : _a.role.includes("leaderController")) ||
                                                    ((_b = user === null || user === void 0 ? void 0 : user.user) === null || _b === void 0 ? void 0 : _b.role.includes("admin"))) && (React.createElement(React.Fragment, null,
                                                    formRender('string', 0, 0, 'leaderId', 'Leader ID', [], ''),
                                                    React.createElement(Separator, null))),
                                                formRender('string', 0, 0, 'name', 'Name', [], ''),
                                                React.createElement(Separator, null),
                                                formRender("number", 0, 99, "age", "Age", [], ''),
                                                React.createElement(Separator, null),
                                                formRender('string', 0, 0, 'studentFbLink', 'Student Facebook Link', [], ''),
                                                React.createElement(Separator, null),
                                                formRender('string', 0, 0, 'email', 'Email', [], ''),
                                                React.createElement(Separator, null),
                                                formRender('string', 0, 0, 'githubLink', 'Github Link', [], ''),
                                                React.createElement(Separator, null),
                                                formRender('number', 0, 4, 'speed', 'Speed', [], ''),
                                                React.createElement(Separator, null),
                                                !((_c = user === null || user === void 0 ? void 0 : user.user) === null || _c === void 0 ? void 0 : _c.role.includes("miniLeader")) && (React.createElement(React.Fragment, null,
                                                    formRender('role', 0, 0, 'role', 'Role', ['student', 'miniLeader'], ""),
                                                    React.createElement(Separator, null))),
                                                formRender('string', 0, 0, 'parentFbLink', 'Parent Facebook Link', [], ''),
                                                React.createElement(Separator, null),
                                                (((_d = user === null || user === void 0 ? void 0 : user.user) === null || _d === void 0 ? void 0 : _d.role.includes("leaderController")) ||
                                                    ((_e = user === null || user === void 0 ? void 0 : user.user) === null || _e === void 0 ? void 0 : _e.role.includes("admin"))) && (React.createElement(React.Fragment, null,
                                                    formRender('number', 0, 99, 'group', 'Group', [], ''),
                                                    React.createElement(Separator, null))),
                                                formRender('string', 0, 0, 'githubToken', 'Github Token', [], ''),
                                                React.createElement(Separator, null),
                                                formRender('string', 0, 0, 'githubLastUpdate', 'Github Last Update', [], ''),
                                                React.createElement(Separator, null),
                                                React.createElement("p", { className: "capitalize font-bold leading-[1px] text-md text-slate-400" }, "Fines"),
                                                (((_f = user === null || user === void 0 ? void 0 : user.user) === null || _f === void 0 ? void 0 : _f.role.includes("githubController")) ||
                                                    ((_g = user === null || user === void 0 ? void 0 : user.user) === null || _g === void 0 ? void 0 : _g.role.includes("miniLeaderController")) ||
                                                    ((_h = user === null || user === void 0 ? void 0 : user.user) === null || _h === void 0 ? void 0 : _h.role.includes("miniMentorController")) ||
                                                    ((_j = user === null || user === void 0 ? void 0 : user.user) === null || _j === void 0 ? void 0 : _j.role.includes("admin"))) && (React.createElement(React.Fragment, null,
                                                    formRender('number', 0, 99, 'fines.githubFine', 'Github Fine', [], ''),
                                                    React.createElement(Separator, null),
                                                    formRender('number', 0, 99, 'fines.miniLeaderFine', 'Mini Leader Fine', [], ''),
                                                    React.createElement(Separator, null),
                                                    formRender('number', 0, 99, 'fines.miniStudentFine', 'Mini Student Fine', [], ''))),
                                                React.createElement(Separator, null),
                                                React.createElement("p", { className: "capitalize font-bold leading-[5px] text-slate-400" }, "Mentor Section"),
                                                (((_k = user === null || user === void 0 ? void 0 : user.user) === null || _k === void 0 ? void 0 : _k.role.includes("admin")) ||
                                                    ((_l = user === null || user === void 0 ? void 0 : user.user) === null || _l === void 0 ? void 0 : _l.role.includes("mentor"))) && (React.createElement(React.Fragment, null,
                                                    formRender('number', 0, 999999, 'aura.points', 'Points', [], ''),
                                                    React.createElement(Separator, null),
                                                    formRender('number', 0, 999999, 'aura.classwork', 'Classwork', [], ''),
                                                    React.createElement(Separator, null),
                                                    formRender('number', 0, 999999, 'aura.attendance', 'Attendance', [], ''),
                                                    React.createElement(Separator, null),
                                                    formRender('number', 0, 999999, 'aura.help', 'Help', [], ''),
                                                    React.createElement(Separator, null),
                                                    formRender('number', 0, 999999, 'aura.camera', 'Camera', [], ''),
                                                    React.createElement(Separator, null),
                                                    formRender('number', 0, 999999, 'aura.answers', 'Answers', [], ''),
                                                    formRender('boolean', 0, 0, 'payedInfo', 'Payed Info', [], ''))),
                                                React.createElement(Separator, null),
                                                React.createElement("p", { className: "capitalize font-bold leading-[5px] text-slate-400" }, "Leader Comment"),
                                                (((_m = user === null || user === void 0 ? void 0 : user.user) === null || _m === void 0 ? void 0 : _m.role.includes("admin")) ||
                                                    (((_o = user === null || user === void 0 ? void 0 : user.user) === null || _o === void 0 ? void 0 : _o.role.includes("leader")) && (oneStudent.leaderId == ((_p = user === null || user === void 0 ? void 0 : user.user) === null || _p === void 0 ? void 0 : _p._id))) ||
                                                    ((_q = user === null || user === void 0 ? void 0 : user.user) === null || _q === void 0 ? void 0 : _q.role.includes("admin"))) && (React.createElement(React.Fragment, null,
                                                    formRender('string', 0, 0, 'comment.leaderComment', 'Leader Comment', [], ''),
                                                    React.createElement(Separator, null),
                                                    formRender('string', 0, 0, 'comment.leaderProof', 'Leader Proof', [], ''))),
                                                React.createElement(Separator, null),
                                                React.createElement("p", { className: "capitalize font-bold leading-[5px] text-slate-400" }, "Control comment"),
                                                (((_r = user === null || user === void 0 ? void 0 : user.user) === null || _r === void 0 ? void 0 : _r.role.includes("miniLeaderController")) ||
                                                    ((_s = user === null || user === void 0 ? void 0 : user.user) === null || _s === void 0 ? void 0 : _s.role.includes("githubController")) ||
                                                    ((_t = user === null || user === void 0 ? void 0 : user.user) === null || _t === void 0 ? void 0 : _t.role.includes("admin"))) &&
                                                    (React.createElement(React.Fragment, null,
                                                        formRender('string', 0, 0, 'comment.controller.miniLeaderController', 'Mini Leader Controller', [], ''),
                                                        React.createElement(Separator, null),
                                                        formRender('string', 0, 0, 'comment.controller.githubController', 'Github Controller', [], ''),
                                                        React.createElement(Separator, null))),
                                                React.createElement(Button, { type: "submit", variant: "green", onClick: () => toast("Student has been updated", {
                                                        description: `${oneStudent.updatedAt}`,
                                                        action: {
                                                            label: "Undo",
                                                            onClick: () => console.log("Undo"),
                                                        }
                                                    }) }, " Save changes")))))
                                        :
                                            React.createElement(React.Fragment, null,
                                                React.createElement("div", null,
                                                    React.createElement("div", { className: "grid gap-4 py-4" },
                                                        React.createElement("p", { className: "font-bold leading-[5px] text-slate-400 capitalize" },
                                                            React.createElement("b", null, "Student info")),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 capitalize" }, "Leader ID"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, oneStudent.leaderId)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "Name"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, oneStudent.name)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "Age"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, oneStudent.age)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "Email"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, oneStudent.email)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "Role"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, oneStudent.role)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "Github Link"),
                                                            React.createElement(Link, { className: "col-start-3 font-bold ", to: oneStudent.githubLink, target: "_blank" },
                                                                React.createElement(Button, { variant: "link", className: "m-0 p-0 text-blue-500" }, "Github"))),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "Parent Facebook Link"),
                                                            React.createElement(Link, { className: "col-start-3 font-bold", to: oneStudent.parentFbLink, target: "_blank" },
                                                                React.createElement(Button, { variant: "link", className: "m-0 p-0 text-blue-500" }, "Parent"))),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "Student Facebook Link"),
                                                            React.createElement(Link, { className: "col-start-3 font-bold", to: oneStudent.studentFbLink, target: "_blank" },
                                                                React.createElement(Button, { variant: "link", className: "m-0 p-0 text-blue-500" }, "Student"))),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "Group"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, oneStudent.group)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "Speed"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, oneStudent.speed)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "Github Token"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, "****")),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "Github Last Update"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.githubLastUpdate)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("p", { className: "font-bold leading-[5px] text-slate-400 capitalize" },
                                                            React.createElement("b", null, "Controller info")),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "Github Fine"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, (_u = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.fines) === null || _u === void 0 ? void 0 : _u.githubFine)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "MiniLeader Fine"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, (_v = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.fines) === null || _v === void 0 ? void 0 : _v.miniLeaderFine)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "MiniLeader Fine"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, (_w = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.fines) === null || _w === void 0 ? void 0 : _w.miniLeaderFine)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "Mini Student Fine"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, (_x = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.fines) === null || _x === void 0 ? void 0 : _x.miniStudentFine)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("p", { className: "font-bold leading-[5px] text-slate-400 capitalize" },
                                                            React.createElement("b", null, "Aura info")),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "Points"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, ((_y = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.aura) === null || _y === void 0 ? void 0 : _y.answers) + ((_z = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.aura) === null || _z === void 0 ? void 0 : _z.attendance) + ((_0 = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.aura) === null || _0 === void 0 ? void 0 : _0.camera) + ((_1 = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.aura) === null || _1 === void 0 ? void 0 : _1.classwork) + ((_2 = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.aura) === null || _2 === void 0 ? void 0 : _2.help) + ((_3 = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.aura) === null || _3 === void 0 ? void 0 : _3.points))),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "Classwork"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, (_4 = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.aura) === null || _4 === void 0 ? void 0 : _4.classwork)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "Attendance"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, (_5 = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.aura) === null || _5 === void 0 ? void 0 : _5.attendance)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "Help"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, (_6 = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.aura) === null || _6 === void 0 ? void 0 : _6.help)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "Camera"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, (_7 = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.aura) === null || _7 === void 0 ? void 0 : _7.camera)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "Answers"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, (_8 = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.aura) === null || _8 === void 0 ? void 0 : _8.answers)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("p", { className: "font-bold leading-[5px] text-slate-400 capitalize" },
                                                            React.createElement("b", null, "Comments")),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "Leader Comment"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, (_9 = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.comment) === null || _9 === void 0 ? void 0 : _9.leaderComment)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "Leader Poof"),
                                                            React.createElement(Link, { className: "col-start-3 font-bold", to: (_10 = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.comment) === null || _10 === void 0 ? void 0 : _10.leaderProof, target: "_blank" },
                                                                React.createElement(Button, { variant: "link", className: "m-0 p-0 text-blue-500" }, "Proof"))),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "Mini Leader Controller"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, (_11 = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.comment) === null || _11 === void 0 ? void 0 : _11.controller.miniLeaderController)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2" }, "Github Controller"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, (_12 = oneStudent === null || oneStudent === void 0 ? void 0 : oneStudent.comment) === null || _12 === void 0 ? void 0 : _12.controller.githubController)),
                                                        React.createElement(Separator, null)))))))));
                        })) :
                            React.createElement("div", { className: "flex items-center justify-center" },
                                React.createElement(Loading, null))))),
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
