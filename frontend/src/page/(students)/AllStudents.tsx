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
import { userSchema } from "../../utils/(student)/form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { useAuthStore } from "../../store/authStore"
import Loading from "../../components/loading"
import { toast } from "sonner"
import { Checkbox } from "../../components/ui/checkbox"
import { useLeaderStore } from "../../store/leaderStore"
import { Student } from "../../utils/(student)/student"
import { Button } from "../../components/ui/button"
import { useAllStudents } from "../../store/allStudentStore"
import { defaultStudentValues } from "../../utils/(student)/form-values"
import DataTable from "../../hooks/use-data-table"


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
        const savedSorting = localStorage.getItem('sortingAllStudents');
        return savedSorting ? JSON.parse(savedSorting) : [];
    });
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(() => {
        const savedFilters = localStorage.getItem('columnFilterAllStudents');
        return savedFilters ? JSON.parse(savedFilters) : [];
    });
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(() => {
        const savedVisibility = localStorage.getItem('columnVisibilityAllStudents');
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
            <DataTable
                title={`All Students`}
                table={table}
                setOneRowSelection={setOneRowSelection}
                studentInfo={studentInfo}
                setStudentInfo={setStudentInfo}
                isLoading={isLoading}
                form={form}
                onSubmit={onSubmit}
                user={user}
                formRender={formRender}
                student={student}
                pageSizeSet={pageSizeSet}
                pagination={pagination}
                setPagination={setPagination}
                setPageSizeSet={setPageSizeSet}
                paginationAllStudents={AllStudents} />
        </>
    );
}
