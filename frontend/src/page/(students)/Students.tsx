import * as React from "react"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../../components/ui/sheet"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, } from "lucide-react"
import { Row } from "@tanstack/react-table"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { Input } from "../../components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table"
import { Link } from "react-router-dom"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../components/ui/hover-card"
import { Badge } from "../../components/ui/badge"
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area"
import { Separator } from "../../components/ui/separator"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../components/ui/select"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userSchema } from "../../utils/user"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { useAuthStore } from "../../store/authStore"
import Loading from "../../components/loading"
import { toast } from "sonner"
import { Checkbox } from "../../components/ui/checkbox"
import { useLeaderStore } from "../../store/leaderStore"
import { Student } from "../../utils/interface"
import { Button } from "../../components/ui/button"
import { useAllStudents } from "../../store/allStudentStore"
import { defaultStudentValues } from "../../utils/form/default-values"


export const columns: ColumnDef<Student>[] = [
    {
        accessorKey: "role",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Role
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="capitalize font-bold">
                {<Badge>{row.getValue("role")}</Badge>}
            </div>
        ),
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="capitalize font-bold">
                {row.getValue("name")}
            </div>
        ),
    },
    {
        accessorKey: "age",
        header: "Age",
        cell: ({ row }) => (
            <div className="capitalize font-bold"><Badge variant="outline" className="font-b">{row.getValue("age")}</Badge></div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <div className="font-bold">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "studentFbLink",
        header: "Student FB",
        cell: ({ row }) => (
            <div className="capitalize font-bold"><Link target="_blank" to={row.getValue("studentFbLink")}><Button className="text-blue-400 pl-0" variant="link">Facebook</Button></Link></div>
        ),
    },
    {
        accessorKey: "githubLastUpdate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="pl-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Last Update
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="capitalize font-bold">{row.getValue("githubLastUpdate")}</div>
        ),
    },
    {
        accessorKey: "githubLink",
        header: "Github",
        cell: ({ row }) => (
            <div className="capitalize font-bold"><Link target="_blank" to={row.getValue("githubLink")}><Button className="text-blue-400 pl-0" variant="link">github Link</Button></Link></div>
        ),
    },
    {
        accessorKey: "speed",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="pl-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Speed
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="capitalize "><Badge variant="outline" className="font-bold">{row.getValue("speed")}</Badge></div>
        ),
    },
    {
        accessorKey: "group",
        header: ({ column }) => {
            return (
                <Button
                    className="pl-0"

                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Group
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="capitalize font-bold"><Badge className="font-bold" variant="outline">{row.getValue("group")}</Badge></div>
        ),
    },
    {
        accessorKey: "leaderId",
        header: "LeaderId",
        cell: ({ row }) => (
            <div className="capitalize font-bold"><Link target="_blank" to={row.getValue("leaderId")}><Button className="text-blue-400 pl-0" variant="link">leaderID</Button></Link></div>
        ),
    },
    {
        accessorKey: "parentFbLink",
        header: "Parent FB",
        cell: ({ row }) => (
            <div className="capitalize font-bold"><Link target="_blank" to={row.getValue("parentFbLink")}><Button className="text-blue-400 pl-0" variant="link">parenLink</Button></Link></div>
        ),
    },
    {
        accessorKey: "fines",
        header: () => {
            return (
                <Button
                    variant="ghost"
                >
                    Fines
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }: { row: Row<Student> }) => (
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Button variant="link" >@fines</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-40 duration-100">
                    <div className="flex justify-between">
                        <span>githubFine</span><span>{(row.getValue("fines") as Student["fines"]).githubFine}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>miniLeaderFine</span><span>{(row.getValue("fines") as Student["fines"]).miniLeaderFine}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>miniStudentFine</span><span>{(row.getValue("fines") as Student["fines"]).miniStudentFine}</span>
                    </div>
                </HoverCardContent>
            </HoverCard>
        ),
    },
    {
        accessorKey: "aura",
        header: () => {
            return (
                <Button
                    variant="ghost"
                >
                    Aura
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }: { row: Row<Student> }) => (
            <HoverCard>
                <HoverCardTrigger asChild>
                    <Button variant="link" onTouchStart={(event) => event.preventDefault()}>@Aura</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-40 duration-100">
                    <div className="flex justify-between">
                        <span>classwork</span><span>{(row.getValue("aura") as Student["aura"]).classwork}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>attendance</span><span>{(row.getValue("aura") as Student["aura"]).attendance}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>help</span><span>{(row.getValue("aura") as Student["aura"]).help}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>camera</span><span>{(row.getValue("aura") as Student["aura"]).camera}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>answers</span><span>{(row.getValue("aura") as Student["aura"]).answers}</span>
                    </div>
                </HoverCardContent>
            </HoverCard >
        ),
    },

    {
        accessorKey: "payedInfo",
        header: "PayedInfo",
        cell: ({ row }) => (
            <div className="capitalize font-bold">{row.getValue("payedInfo") ? "True" : "False"}</div>
        ),
    },
]

export function AllStudents() {
    const [sorting, setSorting] = React.useState<SortingState>(() => {
        const savedSorting = localStorage.getItem('sortingStudents');
        return savedSorting ? JSON.parse(savedSorting) : [];
    });
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(() => {
        const savedFilters = localStorage.getItem('columnFilterStudents');
        return savedFilters ? JSON.parse(savedFilters) : [];
    });
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(() => {
        const savedVisibility = localStorage.getItem('columnVisibilityStudents');
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
    const [studentInfo, setStudentInfo] = React.useState(false)

    React.useEffect(() => {
        localStorage.setItem('sortingStudents', JSON.stringify(sorting));
    }, [sorting]);

    React.useEffect(() => {
        localStorage.setItem('columnFilterStudents', JSON.stringify(columnFilters));
    }, [columnFilters]);

    React.useEffect(() => {
        localStorage.setItem('columnVisibilityStudents', JSON.stringify(columnVisibility));
    }, [columnVisibility]);

    const { user, isLoading } = useAuthStore()
    const { getAllStudents, AllStudents } = useAllStudents()
    const { student, getStudent, updateStudent } = useLeaderStore()
    const [pageSizeSet, setPageSizeSet] = React.useState(10)
    const [pagination, setPagination] = React.useState(0)

    React.useEffect(() => {
        getAllStudents()
        if (oneRowSelection) {
            getStudent(oneRowSelection.leaderId, oneRowSelection._id)
        }
    }, [oneRowSelection, user?.user?._id, getStudent, getAllStudents])
    const table = useReactTable({
        data: AllStudents.sort((a, b) => a.group < b.group ? 1 : -1),
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
            pagination: {
                pageIndex: pagination,
                pageSize: pageSizeSet,
            }
        },
    });
    const form = useForm<Student>({
        resolver: zodResolver(userSchema),
        defaultValues: defaultStudentValues,
    });

    React.useEffect(() => {
        if (student) {
            form.reset(student);
        }
    }, [form, student]);
    // console.log(AllStudents)
    const formRender = (typeMain: string, minNum: number, maxNum: number, id: string, label: string, roles: string[], row: string) => {
        <Separator />
        if (typeMain === 'number') {
            return (
                <FormField
                    control={form.control}
                    name={id as keyof Student}
                    render={({ field, fieldState: { error } }) => (
                        <FormItem className="grid grid-cols-4 items-center w-full justify-start gap-2">
                            <FormLabel className="grid-cols-2 capitalize">{label}</FormLabel>
                            <FormControl>
                                <Input
                                    type={typeMain}
                                    className="col-span-3"
                                    placeholder={`Enter ${label}`}
                                    min={minNum}
                                    max={maxNum}
                                    {...field}
                                    value={typeof field.value === 'boolean' || typeof field.value === 'object' ? '' : field.value}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const value = e.target.value === '' ? '' : Number(e.target.value);
                                        const numericValue = Number(value);
                                        if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 99) {
                                            field.onChange(value);
                                            handleInputChange(oneRowSelection, id, value);
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormMessage className="col-span-3">{error?.message}</FormMessage>
                        </FormItem>
                    )}
                />
            )
        } else if (typeMain === 'string') {
            return (
                <FormField
                    control={form.control}
                    name={id as keyof Student}
                    render={({ field, fieldState: { error } }) => (
                        <FormItem className="grid grid-cols-4  items-center w-full justify-start gap-2">
                            <FormLabel className="grid-cols-2">{label}</FormLabel>
                            <FormControl>
                                <Input
                                    className="col-span-3"
                                    placeholder={`Enter ${label}`}
                                    {...field}
                                    value={typeof field.value === 'boolean' || typeof field.value === 'object' ? '' : field.value}
                                    onChange={(e) => {
                                        field.onChange(e);
                                        handleInputChange(oneRowSelection, id, e.target.value);
                                    }}
                                />
                            </FormControl>
                            <FormMessage className="col-span-3">{error?.message}</FormMessage>
                        </FormItem>
                    )}
                />
            )
        } else if (typeMain === 'role') {
            return (
                <FormField
                    control={form.control}
                    name={id as keyof Student}
                    render={({ fieldState: { error } }) => (
                        <FormItem className="grid grid-cols-4 items-center w-full justify-start gap-2">
                            <FormLabel className="grid-cols-2">Role</FormLabel>
                            <FormField
                                control={form.control}
                                name={id as keyof Student}
                                render={({ field, fieldState: { error } }) => (
                                    <FormItem className="col-span-3">
                                        <Select onValueChange={field.onChange} defaultValue={typeof field.value === 'string' ? field.value : undefined}>
                                            <SelectTrigger >
                                                <SelectValue placeholder="Select a fruit" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    {roles.map((role, index) => (
                                                        <SelectItem key={index} value={role}>
                                                            {role}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="col-span-3">{error?.message}</FormMessage>
                                    </FormItem>
                                )}
                            />
                        </FormItem>
                    )}
                />
            )
        }
    }
    const handleInputChange = (row: any, field: string, value: string | number) => {
        if (row && row.original) {
            row.original[field] = value;
            setRowSelection({ ...rowSelection });
        }
    }
    const onSubmit: SubmitHandler<Student> = (data) => {
        setOneRowSelection((prev: Student) => ({ ...prev, leaderId: data.leaderId }));
        updateStudent(student.leaderId, student._id, data);
        console.log("sss")
        if (!isLoading) {
            setStudentInfo(false);
        }
    };
    return (
        <>
            <div
                className={`bg-[var(--background)] grid auto-rows-min overflow-hidden gap-4 grid-cols-1 px-2`}>
                <div className="flex items-center py-4">
                    <Input
                        placeholder="Student name..."
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize text-center"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <ScrollArea >
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            );
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody >
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (

                                        <Sheet key={row.id}>
                                            <SheetTrigger asChild onClick={() => { setOneRowSelection(row.original) }}>
                                                <TableRow
                                                    data-state={row.getIsSelected() && "selected"}
                                                >
                                                    {row.getVisibleCells().map((cell) => (
                                                        <TableCell key={cell.id} >
                                                            {flexRender(
                                                                cell.column.columnDef.cell,
                                                                cell.getContext()
                                                            )}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </SheetTrigger>
                                            <SheetContent>
                                                <SheetHeader className="shadow-sm pb-2">
                                                    <SheetTitle><span >{studentInfo ? "Edit Student" : "Info Student"}</span> <span className="text-black/50">{student.name}</span></SheetTitle>
                                                    <SheetDescription className="flex items-center justify-between">
                                                        <span>{studentInfo ? "Make changes to your profile here. Click save when you're done." : "Get Student information here."}</span>
                                                        <Button
                                                            onClick={() => { setStudentInfo(!studentInfo) }}
                                                            className="bg-green-500 text-sm px-6 py-4 hover:bg-green-400">{!studentInfo ? "Edit" : "Info"}</Button>
                                                    </SheetDescription>
                                                </SheetHeader>
                                                {isLoading ? <Loading /> : (
                                                    <ScrollArea className="h-full p-4 pb-16">
                                                        {(studentInfo && !isLoading) ? (<Form {...form}>
                                                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                                                <div className="grid gap-4 py-4">
                                                                    <p className="font-bold leading-[5px] text-slate-400">leader edit</p>
                                                                    {/* // ? leader id */}

                                                                    {
                                                                        (user?.user?.role.includes("leaderController") ||
                                                                            (user?.user?.role.includes("admin"))) && (
                                                                            <>
                                                                                {formRender('string', 0, 0, 'leaderId', 'Leader ID', [], '')}
                                                                                <Separator />
                                                                            </>
                                                                        )
                                                                    }
                                                                    {

                                                                        (user?.user?.role.includes("leaderController") ||
                                                                            user?.user?.role.includes("leader") ||
                                                                            user?.user?.role.includes("admin")) &&
                                                                        (<>
                                                                            {/* // ? name */}
                                                                            {formRender('string', 0, 0, 'name', 'Name', [], '')}
                                                                            <Separator />
                                                                            {/* // ? age */}
                                                                            {formRender("number", 0, 99, "age", "Age", [], '')}
                                                                            <Separator />
                                                                            {/* // ? Student Facebook Link */}
                                                                            {formRender('string', 0, 0, 'studentFbLink', 'Student Facebook', [], '')}
                                                                            <Separator />
                                                                            {/* // ? email */}
                                                                            {formRender('string', 0, 0, 'email', 'Email', [], '')}
                                                                            <Separator />
                                                                            {/* // ? github */}
                                                                            {formRender('string', 0, 0, 'github', 'Github', [], '')}
                                                                            <Separator />
                                                                            {/* // ? parent facebook link */}
                                                                            {formRender('string', 0, 0, 'parentFbLink', 'Parent Facebook', [], '')}
                                                                            <Separator />
                                                                            {/* // ? github token */}
                                                                            {formRender('string', 0, 0, 'githubToken', 'Github Token', [], '')}
                                                                            <Separator />
                                                                            {/* // ? github last update */}
                                                                            {formRender('string', 0, 0, 'githubLastUpdate', 'Github Last Update', [], '')}
                                                                            <Separator />
                                                                        </>)}
                                                                    {/* // ? speed */}
                                                                    {
                                                                        (
                                                                            user?.user?.role.includes("leaderController") ||
                                                                            user?.user?.role.includes("mentorAssistant") ||
                                                                            user?.user?.role.includes("admin")) && (
                                                                            <>
                                                                                {formRender('number', 0, 4, 'speed', 'Speed', [], '')}
                                                                                <Separator />
                                                                            </>
                                                                        )
                                                                    }

                                                                    {/* // ? role */}

                                                                    {(!user?.user?.role?.includes("miniLeader") || (user?.user?.role?.includes("leader"))) && (
                                                                        <>
                                                                            {formRender('role', 0, 0, 'role', 'Role', ['student', 'miniLeader'], "")}
                                                                            <Separator />
                                                                        </>
                                                                    )}

                                                                    {/* // ? group */}
                                                                    {
                                                                        (user?.user?.role.includes("leaderController") ||
                                                                            user?.user?.role.includes("mentor") ||
                                                                            user?.user?.role.includes("mentorAssistant") ||
                                                                            user?.user?.role.includes("admin")) && (
                                                                            <>
                                                                                {formRender('number', 0, 99, 'group', 'Group', [], '')}
                                                                                <Separator />
                                                                            </>
                                                                        )
                                                                    }

                                                                    <p className="capitalize font-bold leading-[1px] text-md text-slate-400">Fines</p>
                                                                    {/* // ? github fine */}
                                                                    {(user?.user?.role.includes("githubController") ||
                                                                        (user?.user?.role.includes("miniLeaderController")) ||
                                                                        (user?.user?.role.includes("miniMentorController")) ||
                                                                        (user?.user?.role.includes("admin"))) && (
                                                                            <>
                                                                                {formRender('number', 0, 99, 'fines.githubFine', 'Github Fine', [], '')}
                                                                                <Separator />
                                                                                {/* // ? mini leader fine */}
                                                                                {formRender('number', 0, 99, 'fines.miniLeaderFine', 'Mini Leader Fine', [], '')}
                                                                                <Separator />
                                                                                {/* // ? mini student fine */}
                                                                                "xlsx": "^0.18.5"
                                                                                {formRender('number', 0, 99, 'fines.miniStudentFine', 'Mini Student Fine', [], '')}
                                                                            </>
                                                                        )}
                                                                    <Separator />
                                                                    <p className="capitalize font-bold leading-[5px] text-slate-400">Mentor Section</p>
                                                                    {(
                                                                        user?.user?.role.includes("admin") ||
                                                                        user?.user?.role.includes("mentorAssistant") ||
                                                                        user?.user?.role.includes("mentor")) && (
                                                                            <>
                                                                                {/* // ? aura classwork */}
                                                                                {formRender('number', 0, 999999, 'aura.classwork', 'Classwork', [], '')}
                                                                                <Separator />
                                                                                {/* // ? aura attendance */}
                                                                                {formRender('number', 0, 999999, 'aura.attendance', 'Attendance', [], '')}
                                                                                <Separator />
                                                                                {/*// ? aura help */}
                                                                                {formRender('number', 0, 999999, 'aura.help', 'Help', [], '')}
                                                                                <Separator />
                                                                                {/* // ? aura camera */}
                                                                                {formRender('number', 0, 999999, 'aura.camera', 'Camera', [], '')}
                                                                                <Separator />
                                                                                {/* // ? aura answers */}
                                                                                {formRender('number', 0, 999999, 'aura.answers', 'Answers', [], '')}
                                                                                {/* // ? payed info */}
                                                                                {formRender('boolean', 0, 0, 'payedInfo', 'Payed Info', [], '')}
                                                                                {/* // ? leader comment */}
                                                                            </>)}
                                                                    <Separator />
                                                                    <p className="capitalize font-bold leading-[5px] text-slate-400">Leader Comment</p>
                                                                    {(user?.user?.role.includes("admin") ||
                                                                        (user?.user?.role.includes("leader") && (student.leaderId == user?.user?._id)) ||
                                                                        user?.user?.role.includes("admin")
                                                                    ) && (
                                                                            <>
                                                                                {formRender('string', 0, 0, 'comment.leaderComment', 'Leader Comment', [], '')}
                                                                                <Separator />
                                                                                {/* // ? leader proof */}
                                                                                {formRender('string', 0, 0, 'comment.leaderProof', 'Leader Proof', [], '')}
                                                                                {/* // ? mini leader controller */}
                                                                            </>
                                                                        )}
                                                                    <Separator />
                                                                    <p className="capitalize font-bold leading-[5px] text-slate-400">Control comment</p>
                                                                    {(
                                                                        user?.user?.role.includes("miniLeaderController") ||
                                                                        user?.user?.role.includes("githubController") ||
                                                                        user?.user?.role.includes("admin")
                                                                    ) &&
                                                                        (
                                                                            <>
                                                                                {formRender('string', 0, 0, 'comment.controller.miniLeaderController', 'Mini Leader Controller', [], '')}
                                                                                <Separator />
                                                                                {/* // ? leader controller */}
                                                                                {formRender('string', 0, 0, 'comment.controller.githubController', 'Github Controller', [], '')}
                                                                                <Separator />
                                                                            </>
                                                                        )
                                                                    }
                                                                    <Button type="submit" variant={"green"}
                                                                        onClick={() =>
                                                                            toast("Student has been updated", {
                                                                                description: `${student.updatedAt}`,
                                                                                action: {
                                                                                    label: "Undo",
                                                                                    onClick: () => console.log("Undo"),
                                                                                }
                                                                            })}

                                                                    > Save changes</Button>
                                                                </div>
                                                            </form>
                                                        </Form>)

                                                            :
                                                            <>
                                                                <div>
                                                                    <div className="grid gap-4 py-4">
                                                                        {/* //* student info */}
                                                                        <p className="font-bold leading-[5px] text-slate-400 capitalize"><b>Student info</b></p>
                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold capitalize">Leader ID</span>
                                                                            <span className="col-start-3 font-bold">{student.leaderId}</span>
                                                                        </div>
                                                                        <Separator />
                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Name</span>
                                                                            <span className="col-start-3 font-bold">{student.name}</span>
                                                                        </div>
                                                                        <Separator />
                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Age</span>
                                                                            <span className="col-start-3 font-bold">{student.age}</span>
                                                                        </div>
                                                                        <Separator />

                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Email</span>
                                                                            <span className="col-start-3 font-bold">{student.email}</span>
                                                                        </div>
                                                                        <Separator />

                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Role</span>
                                                                            <span className="col-start-3 font-bold">{student.role}</span>
                                                                        </div>
                                                                        <Separator />

                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Github</span>
                                                                            <Link className="col-start-3 font-bold " to={student.githubLink} target="_blank"><Button variant={"link"} className="m-0 p-0 text-blue-500 pl-0">Github</Button></Link>
                                                                        </div>
                                                                        <Separator />
                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Parent Facebook</span>
                                                                            <Link className="col-start-3 font-bold" to={student.parentFbLink} target="_blank"><Button variant={"link"} className="m-0 p-0 text-blue-500 pl-0">Parent</Button></Link>
                                                                        </div>
                                                                        <Separator />
                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Student Facebook</span>
                                                                            <Link className="col-start-3 font-bold" to={student.studentFbLink} target="_blank"><Button variant={"link"} className="m-0 p-0 text-blue-500 pl-0">Student</Button></Link>
                                                                        </div>
                                                                        <Separator />
                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Group</span>
                                                                            <span className="col-start-3 font-bold">{student.group}</span>
                                                                        </div>
                                                                        <Separator />
                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Speed</span>
                                                                            <span className="col-start-3 font-bold">{student.speed}</span>
                                                                        </div>
                                                                        <Separator />

                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Github Token</span>
                                                                            <span className="col-start-3 font-bold">****</span>
                                                                        </div>
                                                                        <Separator />
                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Github Last Update</span>
                                                                            <span className="col-start-3 font-bold">{student?.githubLastUpdate}</span>
                                                                        </div>
                                                                        <Separator />
                                                                        {/* //* controller info */}

                                                                        <p className="font-bold leading-[5px] text-slate-400 capitalize"><b>Controller info</b></p>
                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold ">Finally</span>
                                                                            <span className="col-start-3 font-bold text-blue-400">{student?.fines?.githubFine + student?.fines?.miniLeaderFine + student?.fines?.miniStudentFine}</span>
                                                                        </div>
                                                                        <Separator />
                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Github Fine</span>
                                                                            <span className="col-start-3 font-bold">{student?.fines?.githubFine}</span>
                                                                        </div>
                                                                        <Separator />
                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">MiniLeader Fine</span>
                                                                            <span className="col-start-3 font-bold">{student?.fines?.miniLeaderFine}</span>
                                                                        </div>
                                                                        <Separator />
                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Mini Student Fine</span>
                                                                            <span className="col-start-3 font-bold">{student?.fines?.miniStudentFine}</span>
                                                                        </div>
                                                                        {/* //* aura info */}

                                                                        <Separator />
                                                                        <p className="font-bold leading-[5px] text-slate-400 capitalize"><b>Aura info</b></p>
                                                                        <Separator />
                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Finally</span>
                                                                            <span className="col-start-3 font-bold text-blue-400">{student?.aura?.answers + student?.aura?.classwork + student?.aura?.attendance + student?.aura?.camera + student?.aura?.help}</span>
                                                                        </div>
                                                                        <Separator />
                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Classwork</span>
                                                                            <span className="col-start-3 font-bold">{student?.aura?.classwork}</span>
                                                                        </div>
                                                                        <Separator />
                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Attendance</span>
                                                                            <span className="col-start-3 font-bold">{student?.aura?.attendance}</span>
                                                                        </div>
                                                                        <Separator />
                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Help</span>
                                                                            <span className="col-start-3 font-bold">{student?.aura?.help}</span>
                                                                        </div>
                                                                        <Separator />
                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Camera</span>
                                                                            <span className="col-start-3 font-bold">{student?.aura?.camera}</span>
                                                                        </div>
                                                                        <Separator />
                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Answers</span>
                                                                            <span className="col-start-3 font-bold">{student?.aura?.answers}</span>
                                                                        </div>
                                                                        <Separator />
                                                                        {/* //* comments info */}

                                                                        <p className="font-bold leading-[5px] text-slate-400 capitalize"><b>Comments</b></p>
                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Leader Comment</span>
                                                                            <span className="col-start-3 font-bold">{student?.comment?.leaderComment}</span>
                                                                        </div>
                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Mini Leader Comment</span>
                                                                            <span className="col-start-3 font-bold">{student?.comment?.miniLeaderComment}</span>
                                                                        </div>
                                                                        <Separator />
                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Leader Poof</span>
                                                                            <Link className="col-start-3 font-bold" to={student?.comment?.leaderProof} target="_blank"><Button variant={"link"} className="m-0 p-0 text-blue-500 pl-0">Proof</Button></Link>
                                                                        </div>
                                                                        <Separator />
                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Mini Leader Controller</span>
                                                                            <span className="col-start-3 font-bold" >{student?.comment?.controller.miniLeaderController}</span>
                                                                        </div>
                                                                        <Separator />
                                                                        <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                            <span className="col-span-2 font-bold">Github Controller</span>
                                                                            <span className="col-start-3 font-bold" >{student?.comment?.controller.githubController}</span>
                                                                        </div>
                                                                        <Separator />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        }
                                                    </ScrollArea>
                                                )}
                                            </SheetContent>
                                        </Sheet>
                                    ))
                                ) :
                                    <TableRow className="flex items-center justify-center">
                                        <TableCell>
                                            <Loading />
                                        </TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        </Table>
                    </div>

                    <ScrollBar orientation="horizontal" />
                </ScrollArea >
                <div className="flex space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="flex gap-2">
                        <div className="space-x-10">
                            <Select value={pageSizeSet.toString()} onValueChange={(value) => setPageSizeSet(Number(value))}>
                                <SelectTrigger>{pageSizeSet}</SelectTrigger>
                                <SelectContent >
                                    <SelectGroup>
                                        <SelectLabel>Rows per page</SelectLabel>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="20">20</SelectItem>
                                        <SelectItem value="30">30</SelectItem>
                                        <SelectItem value="9999">all</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPagination(pagination - 1)}
                                disabled={pagination === 0}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPagination(pagination + 1)}
                                disabled={pagination === Math.ceil(AllStudents.length / pageSizeSet) - 1}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}
