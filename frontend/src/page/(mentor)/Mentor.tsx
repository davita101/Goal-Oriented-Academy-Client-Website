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
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area"
import { Separator } from "../../components/ui/separator"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../../components/ui/select"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { useAuthStore } from "../../store/authStore"
import Loading from "../../components/loading"
import { toast } from "sonner"
import { useLeaderStore } from "../../store/leaderStore"
import { Button } from "../../components/ui/button"
import { useMentorStore } from "../../store/mentorStore"
import { Student } from "../../utils/(student)/student"
import { userSchema } from "../../utils/(student)/form"
import DataTable from "../../hooks/use-data-table"


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
        header: "Classwork",
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
    const [pageSizeSet, setPageSizeSet] = React.useState(10)
    const [pagination, setPagination] = React.useState(0)

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
    const { student, getStudent, updateStudent } = useLeaderStore()
    const { getGroup, group } = useMentorStore()
    const { groupId } = useParams()

    React.useEffect(() => {
        getGroup(groupId as string)
        if (oneRowSelection) {
            getStudent(oneRowSelection.leaderId, oneRowSelection._id)
        }
    }, [oneRowSelection, user?.user?._id, getStudent, getGroup])

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
            pagination: {
                pageIndex: pagination,
                pageSize: pageSizeSet,
            }
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
            <DataTable
                title={`Mentor Group ${groupId}`}
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
                paginationAllStudents={group} />
        </>
    );
}
