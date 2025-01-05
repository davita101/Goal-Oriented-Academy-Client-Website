import * as React from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, } from "../../components/ui/sheet";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, } from "lucide-react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger, } from "../../components/ui/dropdown-menu";
import { Input } from "../../components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "../../components/ui/table";
import { Link, useParams } from "react-router-dom";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import { Separator } from "../../components/ui/separator";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../../schema/user";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { useAuthStore } from "../../store/authStore";
import Loading from "../../components/loading";
import { toast } from "sonner";
import { useLeaderStore } from "../../store/leaderStore";
import { Button } from "../../components/ui/button";
import { useMentorStore } from "../../store/mentorStore";
export const columns = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (React.createElement(Button, { variant: "ghost", onClick: () => column.toggleSorting(column.getIsSorted() === "asc") },
                "Name",
                React.createElement(ArrowUpDown, null)));
        },
        cell: ({ row }) => (React.createElement("div", { className: "capitalize font-bold" }, row.getValue("name"))),
    },
    {
        accessorKey: "aura",
        header: ({ column }) => {
            return (React.createElement(Button, { variant: "ghost", className: "m-0 p-0", onClick: () => column.toggleSorting(column.getIsSorted() === "asc") },
                "Points",
                React.createElement(ArrowUpDown, null)));
        },
        cell: ({ row, column }) => {
            var _a;
            return (React.createElement("div", { className: "capitalize font-bold" }, (_a = row.getValue("aura")) === null || _a === void 0 ? void 0 : _a.points));
        },
    },
    {
        header: "Classname",
        cell: ({ row }) => (React.createElement("div", { key: row.getValue("aura").classwork, className: "capitalize font-bold" }, row.getValue("aura").classwork)),
    },
    {
        header: "Answers",
        cell: ({ row }) => (React.createElement("div", { key: row.getValue("aura").answers, className: "capitalize font-bold" }, row.getValue("aura").answers)),
    },
    {
        header: "Attendance",
        cell: ({ row }) => (React.createElement("div", { key: row.getValue("aura").attendance, className: "capitalize font-bold" }, row.getValue("aura").attendance)),
    },
    {
        header: "Camera",
        cell: ({ row }) => (React.createElement("div", { key: row.getValue("aura").camera, className: "capitalize font-bold" }, row.getValue("aura").camera)),
    },
    {
        header: "Help",
        cell: ({ row }) => (React.createElement("div", { key: row.getValue("aura").help, className: "capitalize font-bold" }, row.getValue("aura").help)),
    },
    {
        accessorKey: "speed",
        header: ({ column }) => {
            return (React.createElement(Button, { variant: "ghost", onClick: () => column.toggleSorting(column.getIsSorted() === "asc") },
                "Speed",
                React.createElement(ArrowUpDown, null)));
        },
        cell: ({ row }) => (React.createElement("div", { className: "capitalize font-bold" }, row.getValue("speed"))),
    },
    {
        accessorKey: "group",
        header: ({ column }) => {
            return (React.createElement(Button, { variant: "ghost", onClick: () => column.toggleSorting(column.getIsSorted() === "asc") },
                "group",
                React.createElement(ArrowUpDown, null)));
        },
        cell: ({ row }) => (React.createElement("div", { className: "capitalize font-bold" }, row.getValue("group"))),
    },
];
export function MentorGroup() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const [sorting, setSorting] = React.useState(() => {
        const savedSorting = localStorage.getItem('sortingMentor');
        return savedSorting ? JSON.parse(savedSorting) : [];
    });
    const [columnFilters, setColumnFilters] = React.useState(() => {
        const savedFilters = localStorage.getItem('columnFiltersMentor');
        return savedFilters ? JSON.parse(savedFilters) : [];
    });
    const [columnVisibility, setColumnVisibility] = React.useState(() => {
        const savedVisibility = localStorage.getItem('columnVisibilityMentor');
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
    const [studentInfo, setStudentInfo] = React.useState(true);
    React.useEffect(() => {
        localStorage.setItem('sorting', JSON.stringify(sorting));
    }, [sorting]);
    React.useEffect(() => {
        localStorage.setItem('columnFilters', JSON.stringify(columnFilters));
    }, [columnFilters]);
    React.useEffect(() => {
        localStorage.setItem('columnVisibility', JSON.stringify(columnVisibility));
    }, [columnVisibility]);
    const { user, isLoading, } = useAuthStore();
    const { student, getStudent, updateStudent, getLeaderStudents, leaderStudents } = useLeaderStore();
    const { getGroup, group } = useMentorStore();
    const { groupId } = useParams();
    React.useEffect(() => {
        getGroup(groupId);
        if (oneRowSelection) {
            getStudent(oneRowSelection.leaderId, oneRowSelection._id);
        }
    }, [oneRowSelection, (_a = user === null || user === void 0 ? void 0 : user.user) === null || _a === void 0 ? void 0 : _a._id, getStudent, getGroup]);
    console.log(student);
    const table = useReactTable({
        data: group.sort((a, b) => { var _a, _b; return ((_a = a === null || a === void 0 ? void 0 : a.aura) === null || _a === void 0 ? void 0 : _a.points) < ((_b = b === null || b === void 0 ? void 0 : b.aura) === null || _b === void 0 ? void 0 : _b.points) ? 1 : -1; }),
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
            aura: {
                points: (((_b = student === null || student === void 0 ? void 0 : student.aura) === null || _b === void 0 ? void 0 : _b.answers) || 0) + (((_c = student === null || student === void 0 ? void 0 : student.aura) === null || _c === void 0 ? void 0 : _c.attendance) || 0) + (((_d = student === null || student === void 0 ? void 0 : student.aura) === null || _d === void 0 ? void 0 : _d.camera) || 0) + (((_e = student === null || student === void 0 ? void 0 : student.aura) === null || _e === void 0 ? void 0 : _e.classwork) || 0) + (((_f = student === null || student === void 0 ? void 0 : student.aura) === null || _f === void 0 ? void 0 : _f.help) || 0),
                classwork: 0,
                attendance: 0,
                help: 0,
                camera: 0,
                answers: 0
            },
            payedInfo: false,
            comment: { leaderComment: '', leaderProof: '', controller: { miniLeaderController: '', githubController: '' } },
        },
    });
    React.useEffect(() => {
        if (student) {
            form.reset({
                _id: student._id || '',
                group: student.group || 0,
                leaderId: student.leaderId || '',
                name: student.name || '',
                studentFbLink: student.studentFbLink || '',
                age: student.age || 0,
                email: student.email || '',
                githubLink: student.githubLink || '',
                speed: student.speed || 0,
                role: student.role || '',
                parentFbLink: student.parentFbLink || '',
                githubToken: student.githubToken || '',
                githubLastUpdate: student.githubLastUpdate || '',
                fines: student.fines || { githubFine: 0, miniLeaderFine: 0, miniStudentFine: 0 },
                aura: student.aura || { points: 0, classwork: 0, attendance: 0, help: 0, camera: 0, answers: 0 },
                payedInfo: student.payedInfo || false,
                comment: student.comment || { leaderComment: '', leaderProof: '', controller: { miniLeaderController: '', githubController: '' } },
            });
        }
    }, [form, student]);
    const formRender = (typeMain, minNum, maxNum, id, label, roles, row) => {
        React.createElement(Separator, null);
        if (typeMain === 'number') {
            return (React.createElement(FormField, { control: form.control, name: id, render: ({ field, fieldState: { error } }) => (React.createElement(FormItem, { className: "grid grid-cols-4 items-center w-full justify-start gap-2" },
                    React.createElement(FormLabel, { className: "grid-cols-2 capitalize" }, label),
                    React.createElement(FormControl, null,
                        React.createElement(Input, Object.assign({ type: typeMain, className: "col-span-3", placeholder: `Enter ${label}`, min: minNum, max: maxNum }, field, { value: typeof field.value === 'boolean' || typeof field.value === 'object' ? '' : field.value, onChange: (e) => {
                                const value = e.target.value === '' ? '' : Number(e.target.value);
                                const numericValue = Number(value);
                                if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= maxNum) {
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
            return (React.createElement(FormField, { control: form.control, name: id, render: ({ fieldState: { error } }) => (React.createElement(FormItem, { className: "grid grid-cols-4 items-center w-full justify-start gap-2" },
                    React.createElement(FormLabel, { className: "grid-cols-2" }, "Role"),
                    React.createElement(FormField, { control: form.control, name: id, render: ({ field, fieldState: { error } }) => (React.createElement(FormItem, { className: "col-span-3" },
                            React.createElement(Select, { onValueChange: field.onChange, defaultValue: typeof field.value === 'string' ? field.value : undefined },
                                React.createElement(SelectTrigger, null,
                                    React.createElement(SelectValue, { placeholder: "Select a fruit" })),
                                React.createElement(SelectContent, null,
                                    React.createElement(SelectGroup, null, roles.map((role, index) => (React.createElement(SelectItem, { key: index, value: role }, role)))))),
                            React.createElement(FormMessage, { className: "col-span-3" }, error === null || error === void 0 ? void 0 : error.message))) }))) }));
        }
    };
    const handleInputChange = (row, field, value) => {
        if (row && row.original) {
            row.original[field] = value;
            setRowSelection(Object.assign({}, rowSelection));
        }
    };
    const onSubmit = (data) => {
        data.aura.points = (data.aura.answers || 0) + (data.aura.attendance || 0) + (data.aura.camera || 0) + (data.aura.classwork || 0) + (data.aura.help || 0);
        setOneRowSelection((prev) => (Object.assign(Object.assign({}, prev), { leaderId: data.leaderId })));
        updateStudent(student.leaderId, student._id, data);
        if (!isLoading) {
            setStudentInfo(false);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: ` bg-[var(--background)] grid auto-rows-min overflow-hidden gap-4 grid-cols-1 px-2` },
            React.createElement("div", { className: "flex items-center py-4" },
                React.createElement(Input, { placeholder: "Student name...", value: (_h = (_g = table.getColumn("name")) === null || _g === void 0 ? void 0 : _g.getFilterValue()) !== null && _h !== void 0 ? _h : "", onChange: (event) => { var _a; return (_a = table.getColumn("name")) === null || _a === void 0 ? void 0 : _a.setFilterValue(event.target.value); }, className: "max-w-sm" }),
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
            React.createElement("span", { className: "font-bold text-xl" },
                "Group ",
                groupId),
            React.createElement(ScrollArea, null,
                React.createElement("div", { className: "rounded-md border" },
                    React.createElement(Table, null,
                        React.createElement(TableHeader, null, table.getHeaderGroups().map((headerGroup) => (React.createElement(TableRow, { key: headerGroup.id }, headerGroup.headers.map((header) => {
                            return (React.createElement(TableHead, { key: header.id }, header.isPlaceholder
                                ? null
                                : flexRender(header.column.columnDef.header, header.getContext())));
                        }))))),
                        React.createElement(TableBody, null, ((_j = table.getRowModel().rows) === null || _j === void 0 ? void 0 : _j.length) ? ((_k = table.getRowModel().rows) === null || _k === void 0 ? void 0 : _k.map((row) => {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
                            return (React.createElement(Sheet, { key: row.id },
                                React.createElement(SheetTrigger, { asChild: true, onClick: () => { setOneRowSelection(row.original), setStudentInfo(true); } },
                                    React.createElement(TableRow, { "data-state": row.getIsSelected() && "selected" }, row.getVisibleCells().map((cell) => (React.createElement(TableCell, { key: cell.id }, flexRender(cell.column.columnDef.cell, cell.getContext())))))),
                                React.createElement(SheetContent, null,
                                    React.createElement(SheetHeader, { className: "shadow-sm pb-2" },
                                        React.createElement(SheetTitle, null,
                                            React.createElement("span", null, studentInfo ? "Edit Student" : "Info Student"),
                                            " ",
                                            React.createElement("span", { className: "text-black/50" }, student.name)),
                                        React.createElement(SheetDescription, { className: "flex items-center justify-between" },
                                            React.createElement("span", null, studentInfo ? "Make changes to your profile here. Click save when you're done." : "Get Student information here."),
                                            React.createElement(Button, { onClick: () => { setStudentInfo(!studentInfo); }, className: "bg-green-500 text-sm px-6 py-4 hover:bg-green-400" }, !studentInfo ? "Edit" : "Info"))),
                                    isLoading ? React.createElement(Loading, null) : (React.createElement(ScrollArea, { className: "h-full p-4 pb-16" }, (studentInfo && !isLoading) ?
                                        (React.createElement(Form, Object.assign({}, form),
                                            React.createElement("form", { onSubmit: form.handleSubmit(onSubmit) },
                                                React.createElement("div", { className: "grid gap-4 py-4" },
                                                    (((_a = user === null || user === void 0 ? void 0 : user.user) === null || _a === void 0 ? void 0 : _a.role.includes("leaderController")) ||
                                                        ((_b = user === null || user === void 0 ? void 0 : user.user) === null || _b === void 0 ? void 0 : _b.role.includes("mentor")) ||
                                                        ((_c = user === null || user === void 0 ? void 0 : user.user) === null || _c === void 0 ? void 0 : _c.role.includes("mentorAssistant")) ||
                                                        ((_d = user === null || user === void 0 ? void 0 : user.user) === null || _d === void 0 ? void 0 : _d.role.includes("admin"))) && (React.createElement(React.Fragment, null)),
                                                    (((_e = user === null || user === void 0 ? void 0 : user.user) === null || _e === void 0 ? void 0 : _e.role.includes("leaderController")) ||
                                                        ((_f = user === null || user === void 0 ? void 0 : user.user) === null || _f === void 0 ? void 0 : _f.role.includes("mentor")) ||
                                                        ((_g = user === null || user === void 0 ? void 0 : user.user) === null || _g === void 0 ? void 0 : _g.role.includes("admin"))) && (React.createElement(React.Fragment, null,
                                                        formRender('number', 0, 99, 'group', 'Group', [], ''),
                                                        React.createElement(Separator, null))),
                                                    React.createElement("p", { className: "capitalize font-bold leading-[5px] text-slate-400" }, "Mentor Section"),
                                                    (((_h = user === null || user === void 0 ? void 0 : user.user) === null || _h === void 0 ? void 0 : _h.role.includes("admin")) ||
                                                        ((_j = user === null || user === void 0 ? void 0 : user.user) === null || _j === void 0 ? void 0 : _j.role.includes("mentorAssistant")) ||
                                                        ((_k = user === null || user === void 0 ? void 0 : user.user) === null || _k === void 0 ? void 0 : _k.role.includes("mentor"))) && (React.createElement(React.Fragment, null,
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
                                                    React.createElement(Button, { type: "submit", variant: "green", onClick: () => toast("Student has been updated", {
                                                            description: `${student.updatedAt}`,
                                                            action: {
                                                                label: "Undo",
                                                                onClick: () => console.log("Undo"),
                                                            }
                                                        }) }, " Save changes ")))))
                                        :
                                            React.createElement(React.Fragment, null,
                                                React.createElement("div", null,
                                                    React.createElement("div", { className: "grid gap-4 py-4" },
                                                        React.createElement("p", { className: "font-bold leading-[5px] text-slate-400 capitalize" },
                                                            React.createElement("b", null, "Student info")),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold capitalize" }, "Leader ID"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, student.leaderId)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "Name"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, student.name)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "Age"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, student.age)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "Email"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, student.email)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "Role"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, student.role)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "Github"),
                                                            React.createElement(Link, { className: "col-start-3 font-bold ", to: student.githubLink, target: "_blank" },
                                                                React.createElement(Button, { variant: "link", className: "m-0 p-0 text-blue-500 pl-0" }, "Github"))),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "Parent Facebook"),
                                                            React.createElement(Link, { className: "col-start-3 font-bold", to: student.parentFbLink, target: "_blank" },
                                                                React.createElement(Button, { variant: "link", className: "m-0 p-0 text-blue-500 pl-0" }, "Parent"))),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "Student Facebook"),
                                                            React.createElement(Link, { className: "col-start-3 font-bold", to: student.studentFbLink, target: "_blank" },
                                                                React.createElement(Button, { variant: "link", className: "m-0 p-0 text-blue-500 pl-0" }, "Student"))),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "Group"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, student.group)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "Speed"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, student === null || student === void 0 ? void 0 : student.speed)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "Github Token"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, "****")),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "Github Last Update"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, student === null || student === void 0 ? void 0 : student.githubLastUpdate)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("p", { className: "font-bold leading-[5px] text-slate-400 capitalize" },
                                                            React.createElement("b", null, "Controller info")),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold " }, "Finally"),
                                                            React.createElement("span", { className: "col-start-3 font-bold text-blue-400" }, (_l = student === null || student === void 0 ? void 0 : student.aura) === null || _l === void 0 ? void 0 : _l.points)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "Github Fine"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, (_m = student === null || student === void 0 ? void 0 : student.fines) === null || _m === void 0 ? void 0 : _m.githubFine)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "MiniLeader Fine"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, (_o = student === null || student === void 0 ? void 0 : student.fines) === null || _o === void 0 ? void 0 : _o.miniLeaderFine)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "Mini Student Fine"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, (_p = student === null || student === void 0 ? void 0 : student.fines) === null || _p === void 0 ? void 0 : _p.miniStudentFine)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("p", { className: "font-bold leading-[5px] text-slate-400 capitalize" },
                                                            React.createElement("b", null, "Aura info")),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "Finally"),
                                                            React.createElement("span", { className: "col-start-3 font-bold text-blue-400" }, ((_q = student === null || student === void 0 ? void 0 : student.aura) === null || _q === void 0 ? void 0 : _q.answers) + ((_r = student === null || student === void 0 ? void 0 : student.aura) === null || _r === void 0 ? void 0 : _r.classwork) + ((_s = student === null || student === void 0 ? void 0 : student.aura) === null || _s === void 0 ? void 0 : _s.attendance) + ((_t = student === null || student === void 0 ? void 0 : student.aura) === null || _t === void 0 ? void 0 : _t.camera) + ((_u = student === null || student === void 0 ? void 0 : student.aura) === null || _u === void 0 ? void 0 : _u.help))),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "Classwork"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, (_v = student === null || student === void 0 ? void 0 : student.aura) === null || _v === void 0 ? void 0 : _v.classwork)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "Attendance"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, (_w = student === null || student === void 0 ? void 0 : student.aura) === null || _w === void 0 ? void 0 : _w.attendance)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "Help"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, (_x = student === null || student === void 0 ? void 0 : student.aura) === null || _x === void 0 ? void 0 : _x.help)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "Camera"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, (_y = student === null || student === void 0 ? void 0 : student.aura) === null || _y === void 0 ? void 0 : _y.camera)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "Answers"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, (_z = student === null || student === void 0 ? void 0 : student.aura) === null || _z === void 0 ? void 0 : _z.answers)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("p", { className: "font-bold leading-[5px] text-slate-400 capitalize" },
                                                            React.createElement("b", null, "Comments")),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "Leader Comment"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, (_0 = student === null || student === void 0 ? void 0 : student.comment) === null || _0 === void 0 ? void 0 : _0.leaderComment)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "Leader Poof"),
                                                            React.createElement(Link, { className: "col-start-3 font-bold", to: (_1 = student === null || student === void 0 ? void 0 : student.comment) === null || _1 === void 0 ? void 0 : _1.leaderProof, target: "_blank" },
                                                                React.createElement(Button, { variant: "link", className: "m-0 p-0 text-blue-500 pl-0" }, "Proof"))),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "Mini Leader Controller"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, (_2 = student === null || student === void 0 ? void 0 : student.comment) === null || _2 === void 0 ? void 0 : _2.controller.miniLeaderController)),
                                                        React.createElement(Separator, null),
                                                        React.createElement("div", { className: "grid grid-cols-4  items-center w-full justify-start gap-2" },
                                                            React.createElement("span", { className: "col-span-2 font-bold" }, "Github Controller"),
                                                            React.createElement("span", { className: "col-start-3 font-bold" }, (_3 = student === null || student === void 0 ? void 0 : student.comment) === null || _3 === void 0 ? void 0 : _3.controller.githubController)),
                                                        React.createElement(Separator, null)))))))));
                        })) :
                            React.createElement(TableRow, { className: "flex items-center justify-center" },
                                React.createElement(TableCell, null,
                                    React.createElement(Loading, null)))))),
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
