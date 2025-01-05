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
import { Link, useParams } from "react-router-dom"
import { Badge } from "../../components/ui/badge"
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area"
import { Separator } from "../../components/ui/separator"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userSchema } from "../../schema/user"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { useAuthStore } from "../../store/authStore"
import Loading from "../../components/loading"
import { toast } from "sonner"
import { useLeaderStore } from "../../store/leaderStore"
import { Student } from "../../schema/interface"
import { Button } from "../../components/ui/button"
import { useMentorStore } from "../../store/mentorStore"


export const columns: ColumnDef<Student>[] = [

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
        accessorKey: "aura",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="m-0 p-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Points
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row, column }) => (
            <div
                className="capitalize font-bold"

            >
                {
                    (row.getValue("aura") as Student["aura"])?.points
                }
            </div>
        ),
    },
    {
        header: "Classname",
        cell: ({ row }) => (
            <div key={(row.getValue("aura") as Student["aura"]).classwork} className="capitalize font-bold">
                {(row.getValue("aura") as { classwork: number }).classwork}
            </div>
        ),
    },
    {
        header: "Answers",
        cell: ({ row }) => (
            <div key={(row.getValue("aura") as Student["aura"]).answers} className="capitalize font-bold">
                {(row.getValue("aura") as Student["aura"]).answers}
            </div>
        ),
    },
    {
        header: "Attendance",
        cell: ({ row }) => (
            <div key={(row.getValue("aura") as Student["aura"]).attendance} className="capitalize font-bold">
                {(row.getValue("aura") as Student["aura"]).attendance}
            </div>
        ),
    },
    {
        header: "Camera",
        cell: ({ row }) => (
            <div key={(row.getValue("aura") as Student["aura"]).camera} className="capitalize font-bold">
                {(row.getValue("aura") as Student["aura"]).camera}
            </div>
        ),
    },
    {
        header: "Help",
        cell: ({ row }) => (
            <div key={(row.getValue("aura") as Student["aura"]).help} className="capitalize font-bold">
                {(row.getValue("aura") as Student["aura"]).help}
            </div>
        ),
    },
    {
        accessorKey: "speed",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Speed
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => (

            <div className="capitalize font-bold">
                {row.getValue("speed") as Student["speed"]}
            </div>
        ),
    },
    {
        accessorKey: "group",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    group
                    <ArrowUpDown />
                </Button>
            )
        },
        cell: ({ row }) => (
            <div className="capitalize font-bold">
                {row.getValue("group") as Student["group"]}
            </div>
        ),
    },
]

export function MentorGroup() {
    const [sorting, setSorting] = React.useState<SortingState>(() => {
        const savedSorting = localStorage.getItem('sortingMentor');
        return savedSorting ? JSON.parse(savedSorting) : [];
    });
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(() => {
        const savedFilters = localStorage.getItem('columnFiltersMentor');
        return savedFilters ? JSON.parse(savedFilters) : [];
    });
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(() => {
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
    const [studentInfo, setStudentInfo] = React.useState(true)

    React.useEffect(() => {
        localStorage.setItem('sorting', JSON.stringify(sorting));
    }, [sorting]);

    React.useEffect(() => {
        localStorage.setItem('columnFilters', JSON.stringify(columnFilters));
    }, [columnFilters]);

    React.useEffect(() => {
        localStorage.setItem('columnVisibility', JSON.stringify(columnVisibility));
    }, [columnVisibility]);

    const { user, isLoading, } = useAuthStore()
    const { student, getStudent, updateStudent, getLeaderStudents, leaderStudents } = useLeaderStore()
    const { getGroup, group } = useMentorStore()
    const { groupId } = useParams()
    React.useEffect(() => {
        getGroup(groupId as string)
        if (oneRowSelection) {
            getStudent(oneRowSelection.leaderId, oneRowSelection._id)
        }
    }, [oneRowSelection, user?.user?._id, getStudent, getGroup])
    console.log(student)

    const table = useReactTable({
        data: group.sort((a, b) => a?.aura?.points < b?.aura?.points ? 1 : -1),
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
    const form = useForm<Student>({
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
                points: (student?.aura?.answers || 0) + (student?.aura?.attendance || 0) + (student?.aura?.camera || 0) + (student?.aura?.classwork || 0) + (student?.aura?.help || 0),
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
                                        if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= maxNum) {
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
        data.aura.points = (data.aura.answers || 0) + (data.aura.attendance || 0) + (data.aura.camera || 0) + (data.aura.classwork || 0) + (data.aura.help || 0);
        setOneRowSelection((prev: Student) => ({ ...prev, leaderId: data.leaderId }));
        updateStudent(student.leaderId, student._id, data);
        if (!isLoading) {
            setStudentInfo(false);
        }
    };
    return (
        <>
            <div
                className={` bg-[var(--background)] grid auto-rows-min overflow-hidden gap-4 grid-cols-1 px-2`}>
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
                <span className="font-bold text-xl">Group {groupId}</span>
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
                                    table.getRowModel().rows?.map((row) => (

                                        <Sheet key={row.id}>
                                            <SheetTrigger asChild onClick={() => { setOneRowSelection(row.original), setStudentInfo(true) }}>
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
                                                        {(studentInfo && !isLoading) ?
                                                            (<Form {...form}>
                                                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                                                    <div className="grid gap-4 py-4">
                                                                        {/* // ? speed */}
                                                                        {(user?.user?.role.includes("leaderController") ||
                                                                            user?.user?.role.includes("mentor") ||
                                                                            user?.user?.role.includes("mentorAssistant") ||
                                                                            user?.user?.role.includes("admin")) && (
                                                                                <>
                                                                                    {/* {formRender('number', 0, 4, 'speed', 'Speed', [], '')} */}
                                                                                </>
                                                                            )
                                                                        }
                                                                        {/* // ? group */}
                                                                        {
                                                                            (user?.user?.role.includes("leaderController") ||
                                                                                user?.user?.role.includes("mentor") ||
                                                                                user?.user?.role.includes("admin")) && (
                                                                                <>
                                                                                    {formRender('number', 0, 99, 'group', 'Group', [], '')}
                                                                                    <Separator />
                                                                                </>
                                                                            )
                                                                        }
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
                                                                                    {/* // ? aura help */}
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
                                                                        <Button type="submit" variant={"green"}
                                                                            onClick={() =>
                                                                                toast("Student has been updated", {
                                                                                    description: `${student.updatedAt}`,
                                                                                    action: {
                                                                                        label: "Undo",
                                                                                        onClick: () => console.log("Undo"),
                                                                                    }
                                                                                })}

                                                                        > Save changes </Button>
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
                                                                            <span className="col-start-3 font-bold">{student?.speed}</span>
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
                                                                            <span className="col-start-3 font-bold text-blue-400">{student?.aura?.points}</span>
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
                <div className=" flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div >
        </>
    );
}
