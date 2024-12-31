import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

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
import { ArrowUpDown, ChevronDown, Circle, MoreHorizontal } from "lucide-react"

import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Link } from "react-router-dom"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"
import { Badge } from "./ui/badge"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import { Separator } from "./ui/separator"
import { AlertDialog } from "@radix-ui/react-alert-dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { set, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userSchema } from "@/schema/user"

const data: Student[] = [
  {
    _id: "49c6589f-aba8-4d02-b3ce2-548de0b51d40",
    name: "Alice Johnson",
    age: 21,
    studentFbLink: "https://facebook.com/alicejohnson",
    email: "alicejohnson@example.com",
    githubLink: "https://github.com/alicejohnson",
    speed: 4,
    group: "44",
    role: "miniLeader",
    leaderId: "675dee40a1bb4008aab7ce43",
    parentFbLink: "https://facebook.com/alicejohnsonparent",
    githubToken: "123124145666424564564345345",
    githubLastUpdate: "2021-09-02",
    fines: {
      githubFine: 1,
      miniLeaderFine: 2,
      miniStudentFine: 3
    },
    aura: {
      points: 9999,
      classwork: 9999,
      attendance: 9999,
      help: 9999,
      camera: 9999,
      answers: 99993
    },
    payedInfo: false,
    comment: {
      leaderComment: "123",
      leaderProof: "123",
      controller: {
        miniLeaderController: "miniLeaderController",
        leaderController: "leaderController"
      }
    }
  },
  {
    _id: "49c6589f-aba8-4d02-b4ce2-548de0b51d41",
    name: "sophia🌸",
    age: 16,
    studentFbLink: "https://facebook.com/sofia",
    email: "sofia@example.com",
    githubLink: "https://github.com/SopiaGorgadze",
    speed: 99,
    group: "50",
    role: "miniLeader",
    leaderId: "67657c35cc61cbd1844fb7d3",
    parentFbLink: "https://facebook.com/alicejohnsonparent",
    githubToken: "%",
    githubLastUpdate: "2024-12-25",
    fines: {
      githubFine: 0,
      miniLeaderFine: 0,
      miniStudentFine: 0
    },
    aura: {
      points: 0,
      classwork: 1,
      attendance: 1,
      help: 1,
      camera: 1,
      answers: 1,
    },
    payedInfo: undefined,
    comment: {
      leaderComment: "ეშხიანი გოგნა ვარ!🌸",
      leaderProof: "ფრუფი რად უნდა!😊💔",
      controller: {
        miniLeaderController: "მინი ლიდერების დედოფალი🌸",
        leaderController: "ლიდერების დედოფალი🌸"
      }
    }
  },
  {
    _id: "49c6589f-a1ba8-4d02-bce2-548de03b51d40",
    name: "gio lomi",
    age: 21,
    studentFbLink: "https://facebook.com/alicejohnson",
    email: "alicejohnson@example.com",
    githubLink: "https://github.com/alicejohnson",
    speed: 6,
    role: "student",
    group: "45",
    leaderId: "675dee40a1bb4008aab7ce43",
    parentFbLink: "https://facebook.com/alicejohnsonparent",
    githubToken: "45347565343454736464564564345345",
    githubLastUpdate: "2021-09-04",
    fines: {
      githubFine: 1,
      miniLeaderFine: 2,
      miniStudentFine: 3
    },
    aura: {
      points: 88,
      classwork: 88,
      attendance: 88,
      help: 88,
      camera: 88,
      answers: 883
    },
    payedInfo: false,
    comment: {
      leaderComment: "123",
      leaderProof: "123",
      controller: {
        miniLeaderController: "miniLeaderController",
        leaderController: "leaderController"
      }
    }
  },
  {
    _id: "49c6589f-aba81-4d02-bce2-54568de0b51d40",
    name: "davit lomim",
    age: 21,
    studentFbLink: "https://facebook.com/alicejohnson",
    email: "alicejohnson@example.com",
    githubLink: "https://github.com/alicejohnson",
    speed: 99,
    role: "student",
    group: "46",
    leaderId: "675dee40a1bb4008aab7ce43",
    parentFbLink: "https://facebook.com/alicejohnsonparent",
    githubToken: "4534534345436464564564345345",
    githubLastUpdate: "2021-09-05",
    fines: {
      githubFine: 1,
      miniLeaderFine: 1,
      miniStudentFine: 1
    },
    aura: {
      points: 9999999,
      classwork: 999999,
      attendance: 999999,
      help: 999999,
      camera: 999999,
      answers: 9993999
    },
    payedInfo: true,
    comment: {
      leaderComment: "123",
      leaderProof: "123",
      controller: {
        miniLeaderController: "123",
        leaderController: "123"
      }
    }
  },
  {
    "_id": "49c6589f-aba8-4d0212-bce2-548de0b51d40",
    "name": "nameless",
    "age": 21,
    "studentFbLink": "https://facebook.com/alicejohnson",
    "email": "alicejohnson@example.com",
    "speed": 5,
    "role": "student",
    "group": "46",
    "leaderId": "675dee40a1bb4008aab7ce43",
    "parentFbLink": "https://facebook.com/alicejohnsonparent",
    "githubLink": "https://github.com/alicejohnson",
    "githubToken": "12345624412423423242342342414",
    "githubLastUpdate": "2021-09-06",
    "fines": {
      "githubFine": 1,
      "miniLeaderFine": 1,
      "miniStudentFine": 1
    },
    "aura": {
      "points": 1,
      "classwork": 1,
      "attendance": 1,
      "help": 1,
      "camera": 1,
      "answers": 1
    },
    "payedInfo": true,
    "comment": {
      "leaderComment": "123",
      "leaderProof": "123",
      "controller": {
        "miniLeaderController": "123",
        "leaderController": "123"
      }
    }
  },
]

export type Student = {
  _id: string
  name: string
  age: number
  studentFbLink: string
  email: string
  githubLink: string
  speed: number
  group: string
  leaderId: string
  role: string
  parentFbLink: string
  githubToken: string
  githubLastUpdate: string
  fines: {
    githubFine: number
    miniLeaderFine: number
    miniStudentFine: number
  }
  aura: {
    points: number
    classwork: number
    attendance: number
    help: number
    camera: number
    answers: number
  }
  payedInfo: boolean
  comment: {
    leaderComment: string
    leaderProof: string
    controller: {
      miniLeaderController: string
      leaderController: string
    }
  }
}

export type Payment = {
  _id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}


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
          role
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">
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
          name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "age",
    header: "age",
    cell: ({ row }) => (
      <div className="capitalize"><Badge variant="outline">{row.getValue("age")}</Badge></div>
    ),
  },
  {
    accessorKey: "email",
    header: "email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "studentFbLink",
    header: "studentFbLink",
    cell: ({ row }) => (
      <div className="capitalize"><Link target="_blank" to={row.getValue("studentFbLink")}><Button variant="link">Facebook</Button></Link></div>
    ),
  },
  {
    accessorKey: "githubLastUpdate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          LastUpdate
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("githubLastUpdate")}</div>
    ),
  },
  {
    accessorKey: "githubLink",
    header: "githubLink",
    cell: ({ row }) => (
      <div className="capitalize"><Link target="_blank" to={row.getValue("githubLink")}><Button variant="link">githubLink</Button></Link></div>
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
          speed
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize "><Badge variant="outline">{row.getValue("speed")}</Badge></div>
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
      <div className="capitalize"><Badge variant="outline">{row.getValue("group")}</Badge></div>
    ),
  },
  {
    accessorKey: "leaderId",
    header: "leaderId",
    cell: ({ row }) => (
      <div className="capitalize"><Link target="_blank" to={row.getValue("leaderId")}><Button variant="link">leaderID</Button></Link></div>
    ),
  },
  {
    accessorKey: "parentFbLink",
    header: "parentFbLink",
    cell: ({ row }) => (
      <div className="capitalize"><Link target="_blank" to={row.getValue("parentFbLink")}><Button variant="link">parenLink</Button></Link></div>
    ),
  },
  {
    accessorKey: "fines",
    header: () => {
      return (
        <Button
          variant="destructive"
        >
          fines
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link" >@fines</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-40 duration-100">
          <div className="flex justify-between">
            <span>githubFine</span><span>{row.getValue("fines")["githubFine"]}</span>
          </div>
          <div className="flex justify-between">
            <span>miniLeaderFine</span><span>{row.getValue("fines")["miniLeaderFine"]}</span>
          </div>
          <div className="flex justify-between">
            <span>miniStudentFine</span><span>{row.getValue("fines")["miniStudentFine"]}</span>
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
          variant="destructive"
        >
          aura
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link" onTouchStart={(event) => event.preventDefault()}>@Aura</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-40 duration-100">
          <div className="flex justify-between">
            <span>points</span><span>{row.getValue("aura")["points"]}</span>
          </div>
          <div className="flex justify-between">
            <span>classwork</span><span>{row.getValue("aura")["classwork"]}</span>
          </div>
          <div className="flex justify-between">
            <span>attendance</span><span>{row.getValue("aura")["attendance"]}</span>
          </div>
          <div className="flex justify-between">
            <span>help</span><span>{row.getValue("aura")["help"]}</span>
          </div>
          <div className="flex justify-between">
            <span>camera</span><span>{row.getValue("aura")["camera"]}</span>
          </div>
          <div className="flex justify-between">
            <span>answers</span><span>{row.getValue("aura")["answers"]}</span>
          </div>
        </HoverCardContent>
      </HoverCard >
    ),
  },

  {
    accessorKey: "payedInfo",
    header: "payedInfo",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("payedInfo") ? "True" : "False"}</div>
    ),
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

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment._id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>colors</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => handleColorChange('inherit')}>none</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleColorChange('var(action-color-white)')}><Circle color="var(--action-color-white)" />white</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleColorChange('var(--action-color-red)')}><Circle color="var(--action-color-red)" />red</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleColorChange('var(--action-color-green)')}><Circle color="var(--action-color-green)" />green</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleColorChange('var(--action-color-yellow)')}><Circle color="var(--action-color-yellow)" />yellow</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleColorChange('var(--action-color-purple)')}><Circle color="var(--action-color-purple)" />purple</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleColorChange('var(--action-color-orange)')}><Circle color="var(--action-color-orange)" />orange</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleColorChange('var(--action-color-pink)')}><Circle color="var(--action-color-pink)" />pink</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]

export function DataTable() {
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
    },
  })

  const [sorting, setSorting] = React.useState<SortingState>(() => {
    const savedSorting = localStorage.getItem('sorting');
    return savedSorting ? JSON.parse(savedSorting) : [];
  });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(() => {
    const savedFilters = localStorage.getItem('columnFilters');
    return savedFilters ? JSON.parse(savedFilters) : [];
  });
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(() => {
    const savedVisibility = localStorage.getItem('columnVisibility');
    return savedVisibility ? JSON.parse(savedVisibility) : {};
  });
  const [rowSelection, setRowSelection] = React.useState(() => {
    const savedSelection = localStorage.getItem('rowSelection');
    return savedSelection ? JSON.parse(savedSelection) : {};
  });

  React.useEffect(() => {
    localStorage.setItem('sorting', JSON.stringify(sorting));
  }, [sorting]);

  React.useEffect(() => {
    localStorage.setItem('columnFilters', JSON.stringify(columnFilters));
  }, [columnFilters]);

  React.useEffect(() => {
    localStorage.setItem('columnVisibility', JSON.stringify(columnVisibility));
  }, [columnVisibility]);

  React.useEffect(() => {
    localStorage.setItem('rowSelection', JSON.stringify(rowSelection));
  }, [rowSelection]);

  const table = useReactTable({
    data: data.sort((a, b) => a.group < b.group ? 1 : -1),
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
  const handleInputChange = (row, field, value) => {
    row.original[field] = value;
    // Trigger a re-render if necessary
    setRowSelection({ ...rowSelection });
  };
  const handleSave = (row) => {
    setRowSelection((prev) => ({ ...prev, [row.id]: row.original }))
    console.log(table.getRowModel().rows)
  };
  React.useEffect(() => {
  }, [rowSelection]);

  return (
    <>
      <div
        className={`bg-[var(--background)] grid auto-rows-min overflow-hidden gap-4 grid-cols-1 px-2`}>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter name..."
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
                      <SheetTrigger asChild>
                        <TableRow
                          data-state={row.getIsSelected() && "selected"}
                          style={{ backgroundColor: JSON.parse(localStorage.getItem('rowColors') || '{}')[row.original._id] || '' }}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      </SheetTrigger>
                      <AlertDialog>
                        <SheetContent>
                          <SheetHeader className="shadow-sm pb-2">
                            <SheetTitle>Edit student</SheetTitle>
                            <SheetDescription>
                              Make changes to your profile here. Click save when you're done.
                            </SheetDescription>
                          </SheetHeader>
                          <ScrollArea className="h-full p-4 pb-16">
                            <div className="grid gap-4 py-4">
                              <p className="font-bold leading-[5px] text-slate-400">leader edit</p>
                              <div className="grid grid-cols-4  items-center justify-start gap-4">
                                <Label htmlFor="leaderId" className="text-left font-th">
                                  Leader ID
                                </Label>
                                <Input id="leaderId" value={row.original.leaderId} className="col-span-3" onChange={(e) => handleInputChange(row, 'leaderId', e.target.value)} />
                              </div>
                              <div className="grid grid-cols-4  items-center w-full justify-start gap-4">
                                <Label htmlFor="name" className="text-left font-th">
                                  Name
                                </Label>
                                <Input id="name" value={row.original.name} className="col-span-3" onChange={(e) => handleInputChange(row, 'name', e.target.value)} />
                              </div>
                              <div className="grid grid-cols-4  items-center justify-start gap-4">
                                <Label htmlFor="age" className="text-left font-th">
                                  Age
                                </Label>
                                <Input
                                  type="number"
                                  id="age"
                                  value={row.original.age} className="col-span-3" onChange={(e) => handleInputChange(row, 'age', e.target.value)} />
                              </div>
                              <div className="grid grid-cols-4  items-center justify-start gap-4">
                                <Label htmlFor="studentFbLink" className="text-left font-th">
                                  Student Facebook Link
                                </Label>
                                <Input id="studentFbLink" value={row.original.studentFbLink} className="col-span-3" onChange={(e) => handleInputChange(row, 'studentFbLink', e.target.value)} />
                              </div>
                              <div className="grid grid-cols-4  items-center justify-start gap-4">
                                <Label htmlFor="email" className="text-left font-th">
                                  Email
                                </Label>
                                <Input id="email" value={row.original.email} className="col-span-3" onChange={(e) => handleInputChange(row, 'email', e.target.value)} />
                              </div>
                              <div className="grid grid-cols-4  items-center justify-start gap-4">
                                <Label htmlFor="githubLink" className="text-left font-th">
                                  GitHub Link
                                </Label>
                                <Input id="githubLink" value={row.original.githubLink} className="col-span-3" onChange={(e) => handleInputChange(row, 'githubLink', e.target.value)} />
                              </div>
                              <div className="grid grid-cols-4  items-center justify-start gap-4">
                                <Label htmlFor="speed" className="text-left font-th">
                                  Speed
                                </Label>
                                <Input
                                  type="number"
                                  id="speed"
                                  value={row.original.speed} className="col-span-3" onChange={(e) => handleInputChange(row, 'speed', e.target.value)} />
                              </div>
                              <div className="grid grid-cols-4  items-center justify-start gap-4">
                                <Label htmlFor="role" className="text-left font-th">
                                  Role
                                </Label>
                                <Select onValueChange={(value) => handleInputChange(row, 'role', value)}>
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder={`${row.original.role}`} />
                                  </SelectTrigger>
                                  <SelectContent >
                                    <SelectGroup>
                                      <SelectLabel>Fruits</SelectLabel>
                                      <SelectItem value="mini-leader">mini leader</SelectItem>
                                      <SelectItem value="student">student</SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-4  items-center justify-start gap-4">
                                <Label htmlFor="parentFbLink" className="text-left font-th">
                                  Parent Facebook Link
                                </Label>
                                <Input id="parentFbLink" value={row.original.parentFbLink} className="col-span-3" onChange={(e) => handleInputChange(row, 'parentFbLink', e.target.value)} />
                              </div>
                              <div className="grid grid-cols-4  items-center justify-start gap-4">
                                <Label htmlFor="githubToken" className="text-left font-th">
                                  GitHub Token
                                </Label>
                                <Input id="githubToken" value={row.original.githubToken} className="col-span-3" onChange={(e) => handleInputChange(row, 'githubToken', e.target.value)} />
                              </div>
                              <div className="grid grid-cols-4  items-center justify-start gap-4">
                                <Label htmlFor="githubLastUpdate" className="text-left font-th">
                                  GitHub Last Update
                                </Label>
                                <Input id="githubLastUpdate" value={row.original.githubLastUpdate} className="col-span-3" onChange={(e) => handleInputChange(row, 'githubLastUpdate', e.target.value)} />
                              </div>
                              <p className="font-bold leading-[5px] text-slate-400">github control</p>
                              <Separator />
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="githubFine">
                                  GitHub Fine
                                </Label>
                                <Input
                                  type="number"
                                  id="githubFine"
                                  value={row.original.fines.githubFine}
                                  className="col-span-3"
                                  onChange={(e) => handleInputChange(row, 'fines', { ...row.original.fines, githubFine: parseInt(e.target.value) })}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="miniLeaderFine">
                                  Mini Leader Fine
                                </Label>
                                <Input
                                  type="number"
                                  id="miniLeaderFine"
                                  value={row.original.fines.miniLeaderFine}
                                  className="col-span-3"
                                  onChange={(e) => handleInputChange(row, 'fines', { ...row.original.fines, miniLeaderFine: parseInt(e.target.value) })}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="miniStudentFine">
                                  Mini Student Fine
                                </Label>
                                <Input
                                  type="number"
                                  id="miniStudentFine"
                                  value={row.original.fines.miniStudentFine}
                                  className="col-span-3"
                                  onChange={(e) => handleInputChange(row, 'fines', { ...row.original.fines, miniStudentFine: parseInt(e.target.value) })}
                                />
                              </div>
                              <p className="font-bold leading-[5px] text-slate-400">mentor</p>
                              <Separator />
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="aura-points" >
                                  Points
                                </Label>
                                <span className="font-bold" >{row.original.aura.classwork + row.original.aura.attendance + row.original.aura.help + row.original.aura.camera + row.original.aura.answers + row.original.aura.camera}</span>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="aura-classwork" >
                                  Classwork
                                </Label>
                                <Input
                                  type="number"
                                  id="aura-classwork"
                                  value={row.original.aura.classwork}
                                  className="col-span-3"

                                  onChange={(e) => handleInputChange(row, 'aura', { ...row.original.aura, classwork: parseInt(e.target.value) })}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="aura-attendance" >
                                  Attendance
                                </Label>
                                <Input
                                  type="number"
                                  id="aura-attendance"
                                  value={row.original.aura.attendance}
                                  className="col-span-3"
                                  onChange={(e) => handleInputChange(row, 'aura', { ...row.original.aura, attendance: parseInt(e.target.value) })}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="aura-help" >
                                  Help
                                </Label>
                                <Input
                                  type="number"
                                  id="aura-help"
                                  value={row.original.aura.help}
                                  className="col-span-3"
                                  onChange={(e) => handleInputChange(row, 'aura', { ...row.original.aura, help: parseInt(e.target.value) })}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="aura-camera" >
                                  Camera
                                </Label>
                                <Input
                                  type="number"
                                  id="aura-camera"
                                  value={row.original.aura.camera}
                                  className="col-span-3"
                                  onChange={(e) => handleInputChange(row, 'aura', { ...row.original.aura, camera: parseInt(e.target.value) })}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="aura-answers" >
                                  Answers
                                </Label>
                                <Input
                                  type="number"
                                  id="aura-answers"
                                  value={row.original.aura.answers}
                                  className="col-span-3"
                                  onChange={(e) => handleInputChange(row, 'aura', { ...row.original.aura, answers: parseInt(e.target.value) })}
                                />
                              </div>

                              <p className="font-bold leading-[5px] text-slate-400">github control</p>
                              <Separator />
                              {/* // ! payed info */}
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="leaderComment" className="text-right">
                                  Leader Comment
                                </Label>
                                <Input
                                  id="leaderComment"
                                  value={row.original.comment.leaderComment}
                                  className="col-span-3"
                                  onChange={(e) => handleInputChange(row, 'comment', { ...row.original.comment, leaderComment: e.target.value })}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="leaderProof" className="text-right">
                                  Leader Proof
                                </Label>
                                <Input
                                  id="leaderProof"
                                  value={row.original.comment.leaderProof}
                                  className="col-span-3"
                                  onChange={(e) => handleInputChange(row, 'comment', { ...row.original.comment, leaderProof: e.target.value })}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="miniLeaderController" className="text-right">
                                  Mini Leader Controller
                                </Label>
                                <Input
                                  id="miniLeaderController"
                                  value={row.original.comment.controller.miniLeaderController}
                                  className="col-span-3"
                                  onChange={(e) => handleInputChange(row, 'comment', { ...row.original.comment, controller: { ...row.original.comment.controller, miniLeaderController: e.target.value } })}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="leaderController" className="text-right">
                                  Leader Controller
                                </Label>
                                <Input
                                  id="leaderController"
                                  value={row.original.comment.controller.leaderController}
                                  className="col-span-3"
                                  onChange={(e) => handleInputChange(row, 'comment', { ...row.original.comment, controller: { ...row.original.comment.controller, leaderController: e.target.value } })}
                                />
                              </div>
                              <Separator />
                            </div>
                            <SheetFooter>
                              <SheetClose asChild>
                                <Button type="submit" onClick={() => handleSave(row)}>Save changes</Button>
                              </SheetClose>
                            </SheetFooter>
                          </ScrollArea>
                        </SheetContent>
                      </AlertDialog>
                    </Sheet>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
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
