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
import { ArrowUpDown,  } from "lucide-react"


import { Badge } from "../../components/ui/badge"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userSchema } from "../../interface/(student)/form"
import { useAuthStore } from "../../store/authStore"
import { Checkbox } from "../../components/ui/checkbox"
import { useLeaderStore } from "../../store/studentStore"
import { Student } from "../../interface/(student)/student-Inteface"
import { Button } from "../../components/ui/button"
import { useAllStudents } from "../../store/allStudentStore"
import { defaultStudentValues } from "../../interface/(student)/form-values"
import DataTable from "../../hooks/use-data-table"


export const columns: ColumnDef<Student>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ? true :
            table.getIsSomePageRowsSelected() ? "indeterminate" : false
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
]

export function Default() {
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
  const { student, getStudent, updateStudent, getLeaderStudents, leaderStudents } = useLeaderStore()
  const [pageSizeSet, setPageSizeSet] = React.useState(10)
  const [pagination, setPagination] = React.useState(0)

  React.useEffect(() => {
    if (oneRowSelection) {
      if (user?.user?.role.includes("miniLeader") && user?.user?.role.length === 1) {
        getLeaderStudents(user?.user?.miniLeaderId)
        getStudent(oneRowSelection.leaderId, oneRowSelection._id)
      } else {
        getLeaderStudents(user?.user?._id)
        getStudent(oneRowSelection.leaderId, oneRowSelection._id)
      }
    }
  }, [oneRowSelection, getStudent, getAllStudents, getLeaderStudents])

  const table = useReactTable({
    data: leaderStudents.sort((a, b) => a.group < b.group ? 1 : -1),
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
    if (!isLoading) {
      setStudentInfo(false);
    }
  };
  return (
    <>
      <DataTable
        table={table}
        title={`squad students`}
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
        paginationAllStudents={leaderStudents} />
    </>
  );
}