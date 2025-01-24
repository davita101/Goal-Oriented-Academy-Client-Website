import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, } from "lucide-react"
import { Row } from "@tanstack/react-table"


import { Input } from "../../components/ui/input"

import { Link } from "react-router-dom"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../components/ui/hover-card"
import { Badge } from "../../components/ui/badge"
import { Separator } from "../../components/ui/separator"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userSchema } from "../../interface/(student)/form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { useAuthStore } from "../../store/authStore"
import { useLeaderStore } from "../../store/studentStore"
import { Student } from "../../interface/(student)/student-Inteface"
import { Button } from "../../components/ui/button"
import { useAllStudents } from "../../store/allStudentStore"
import { defaultStudentValues } from "../../interface/(student)/form-values"
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
            <div className="capitalize w-full font-bold ">
                {<Badge >{row.getValue("role")}</Badge>}
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
        const savedSelection = localStorage.getItem('rowSelectionAllStudents');
        return savedSelection ? JSON.parse(savedSelection) : {};
    });
    const [oneRowSelection, setOneRowSelection] = React.useState(() => {
        const savedSelection = localStorage.getItem('oneRowSelectionAllStudents');
        return savedSelection ? JSON.parse(savedSelection) : null;
    });
    const [studentInfo, setStudentInfo] = React.useState(false)

    React.useEffect(() => {
        localStorage.setItem('sortingAllStudents', JSON.stringify(sorting));
    }, [sorting]);

    React.useEffect(() => {
        localStorage.setItem('columnFilterAllStudents', JSON.stringify(columnFilters));
    }, [columnFilters]);

    React.useEffect(() => {
        localStorage.setItem('columnVisibilityAllStudents', JSON.stringify(columnVisibility));
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
                title={`all students`}
                table={table}
                oneRowSelection={oneRowSelection}
                setRowSelection={setRowSelection}
                rowSelection={rowSelection}
                setOneRowSelection={setOneRowSelection}
                studentInfo={studentInfo}
                setStudentInfo={setStudentInfo}
                isLoading={isLoading}
                form={form}
                onSubmit={onSubmit}
                user={user}
                student={student}
                pageSizeSet={pageSizeSet}
                pagination={pagination}
                setPagination={setPagination}
                setPageSizeSet={setPageSizeSet}
                paginationAllStudents={AllStudents} />
        </>
    );
}
