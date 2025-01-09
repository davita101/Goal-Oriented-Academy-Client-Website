import * as React from "react"
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

import { Input } from "../../components/ui/input"

import { Link } from "react-router-dom"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../../components/ui/hover-card"
import { Badge } from "../../components/ui/badge"
import { Separator } from "../../components/ui/separator"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userSchema } from "../../utils/(student)/form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { useAuthStore } from "../../store/authStore"
import { Checkbox } from "../../components/ui/checkbox"
import { useLeaderStore } from "../../store/leaderStore"
import { Student } from "../../utils/(student)/student"
import { Button } from "../../components/ui/button"
import { useAllStudents } from "../../store/allStudentStore"
import { defaultStudentValues } from "../../utils/(student)/form-values"
import DataTable from "../../hooks/use-data-table"
import { t } from "i18next"


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
          {t("role")}
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
          {t("name")}
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
    header: () => { t("age") },
    cell: ({ row }) => (
      <div className="capitalize font-bold"><Badge variant="outline" className="font-b">{row.getValue("age")}</Badge></div>
    ),
  },
  {
    accessorKey: "email",
    header: () => { t("email") },
    cell: ({ row }) => <div className="font-bold">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "studentFbLink",
    header: () => (t("studenFB")),
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
          {t("Last Update")}
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
    header: () => { t("github") },
    cell: ({ row }) => (
      <div className="capitalize font-bold"><Link target="_blank" to={row.getValue("githubLink")}><Button className="text-blue-400 pl-0" variant="link">github Link</Button></Link></div>
    ),
  },
  {
    accessorKey: "comment",
    header: () => { t("comment") },
    cell: ({ row }) => (
      <div className="capitalize font-bold">
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" onTouchStart={(event) => event.preventDefault()}>@COMMENT</Button>
          </HoverCardTrigger>
          <HoverCardContent className=" duration-100 mx-0">
            <div className="flex justify-between">
              <span>leader</span><span>{(row.getValue("comment") as Student["comment"])?.leaderComment}</span>
            </div>
            <div className="flex justify-between">
              <span>mini-leader</span><span>{(row.getValue("comment") as Student["comment"])?.miniLeaderComment}</span>
            </div>
            <div className="flex justify-between">
              <span>github</span><span>{(row.getValue("comment") as Student["comment"])?.controller?.githubController}</span>
            </div>
          </HoverCardContent>
        </HoverCard >
      </div>
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
          {t("speed")}
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
          {t("group")}
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
    header: () => { t("leaderID") },
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
      getLeaderStudents(user?.user?.miniLeaderId)
      getStudent(oneRowSelection.leaderId, oneRowSelection._id)
    }
  }, [oneRowSelection, getStudent, getAllStudents, getLeaderStudents, leaderStudents])

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