import * as React from "react"
import { Button } from "./ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"

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
import { ArrowUpDown, ChevronDown, Circle, MoreHorizontal, X } from "lucide-react"
import { Row } from "@tanstack/react-table"

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
} from "./ui/dropdown-menu"
import { Input } from "./ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { Link } from "react-router-dom"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"
import { Label } from "./ui/label"
import { Badge } from "./ui/badge"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import { Separator } from "./ui/separator"
import { AlertDialog } from "@radix-ui/react-alert-dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { userSchema } from "../schema/user"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { useAuthStore } from "../store/authStore"
import Loading from "./loading"
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog"
import { toast } from "sonner"

export type Student = {
  _id: string
  name: string
  age: number
  studentFbLink: string
  email: string
  githubLink: string
  speed: number
  group: number
  leaderId: string
  role: string
  parentFbLink: string
  githubToken: string
  githubLastUpdate: string
  updatedAt: string
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
      githubController: string
    }
  }
}
export const columns: ColumnDef<Student>[] = [

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
          variant="destructive"
        >
          aura
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
            <span>points</span><span>{(row.getValue("aura") as Student["aura"]).points}</span>
          </div>
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

      const handleColorChange = (color: String) => {
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
              Copy Student ID
            </DropdownMenuItem>
            <DropdownMenuItem>
              Edt Student
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
  const [oneRowSelection, setOneRowSelection] = React.useState(() => {
    const savedSelection = localStorage.getItem('oneRowSelection');
    return savedSelection ? JSON.parse(savedSelection) : null;
  });
  const [studentInfo, setStudentInfo] = React.useState(false)
  const [sheetOpen, setSheetOpen] = React.useState(false)

  React.useEffect(() => {
    localStorage.setItem('sorting', JSON.stringify(sorting));
  }, [sorting]);

  React.useEffect(() => {
    localStorage.setItem('columnFilters', JSON.stringify(columnFilters));
  }, [columnFilters]);

  React.useEffect(() => {
    localStorage.setItem('columnVisibility', JSON.stringify(columnVisibility));
  }, [columnVisibility]);

  const { user, oneLeaderStudent, oneLeaderStudentArr, oneStudentDefine, oneStudent, isLoading, studentUpdate } = useAuthStore()

  React.useEffect(() => {
    oneLeaderStudent(user.user._id)
  }, [user.user._id, oneLeaderStudent])


  React.useEffect(() => {
    if (oneRowSelection) {
      oneStudentDefine(oneRowSelection.leaderId, oneRowSelection._id)
    }
  }, [oneRowSelection])
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
      aura: { points: 0, classwork: 0, attendance: 0, help: 0, camera: 0, answers: 0 },
      payedInfo: false,
      comment: { leaderComment: '', leaderProof: '', controller: { miniLeaderController: '', githubController: '' } },
    },
  });

  React.useEffect(() => {
    form.reset({
      _id: oneStudent?._id || '',
      group: oneStudent?.group || 0,
      leaderId: oneStudent?.leaderId || '',
      name: oneStudent?.name || '',
      studentFbLink: oneStudent?.studentFbLink || '',
      age: oneStudent?.age || 0,
      email: oneStudent?.email || '',
      githubLink: oneStudent?.githubLink || '',
      speed: oneStudent?.speed || 0,
      role: oneStudent?.role || '',
      parentFbLink: oneStudent?.parentFbLink || '',
      githubToken: oneStudent?.githubToken || '',
      githubLastUpdate: oneStudent?.githubLastUpdate || '',
      fines: oneStudent?.fines || { githubFine: 0, miniLeaderFine: 0, miniStudentFine: 0 },
      aura: oneStudent?.aura || { points: 0, classwork: 0, attendance: 0, help: 0, camera: 0, answers: 0 },
      payedInfo: oneStudent?.payedInfo || false,
      comment: oneStudent?.comment || { leaderComment: '', leaderProof: '', controller: { miniLeaderController: '', githubController: '' } },
    });
  }, [oneStudent, form]);
  const formRender = (typeMain: string, minNum: number, maxNum: number, id: string, label: string, roles: string[], row: string) => {
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
        // ! not working!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        <FormField
          control={form.control}
          name={id as keyof Student}
          render={({ fieldState: { error } }) => (
            <FormItem className="grid grid-cols-4 items-center w-full justify-start gap-2">
              <FormLabel className="grid-cols-2">Role</FormLabel>
              <FormField
                control={form.control}
                name={id as keyof Student}
                render={({ fieldState: { error } }) => (
                  <FormItem className="grid grid-cols-4 items-center w-full justify-start gap-2">
                    <Select onValueChange={(value) => handleInputChange(oneRowSelection, 'role', value)}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder={`${label}`} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel className="capitalize">{label}</SelectLabel>
                          {roles.map((role, index) => (
                            <SelectItem key={index} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
    studentUpdate(oneStudent.leaderId, oneStudent._id, data);
    if (!isLoading) setStudentInfo(false)
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

                    <Sheet key={row.id} open={sheetOpen}  >
                      <SheetTrigger asChild onClick={() => { setOneRowSelection(row.original), (setSheetOpen(true)) }}>
                        {(<TableRow
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
                        </TableRow>)}
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader className="shadow-sm pb-2">
                          <div className="flex justify-between">
                            <SheetTitle>{studentInfo ? "Edit Student" : "Info Student"}</SheetTitle>
                            <AlertDialog>
                              <AlertDialogTrigger asChild onClick={() => !studentInfo && setSheetOpen(false)}>
                                <X className="cursor-pointer" />
                              </AlertDialogTrigger>
                              {studentInfo && (<AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete your
                                    account and remove your data from our servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel onClick={() => setSheetOpen(false)}>Continue</AlertDialogCancel>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                </AlertDialogFooter>
                              </AlertDialogContent>)}
                            </AlertDialog>
                          </div>
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
                                    (user.user.role.includes("leaderController") ||
                                      (user.user.role.includes("admin"))) && (
                                      <>
                                        {formRender('string', 0, 0, 'leaderId', 'Leader ID', [], '')}
                                      </>
                                    )
                                  }
                                  {/* // ? name */}
                                  {formRender('string', 0, 0, 'name', 'Name', [], '')}
                                  {/* // ? age */}
                                  {formRender("number", 0, 99, "age", "Age", [], '')}
                                  {/* // ? Student Facebook Link */}
                                  {formRender('string', 0, 0, 'studentFbLink', 'Student Facebook Link', [], '')}
                                  {/* // ? email */}
                                  {formRender('string', 0, 0, 'email', 'Email', [], '')}
                                  {/* // ? github link */}
                                  {formRender('string', 0, 0, 'githubLink', 'Github Link', [], '')}
                                  {/* // ? speed */}
                                  {formRender('number', 0, 4, 'speed', 'Speed', [], '')}
                                  {/* // ? role */}

                                  {!user.user.role.includes("miniLeader") && (
                                    <>
                                      {formRender('role', 0, 0, 'role', 'Role', ['student', 'miniLeader'], "")}
                                    </>
                                  )}
                                  {/* // ? parent facebook link */}
                                  {formRender('string', 0, 0, 'parentFbLink', 'Parent Facebook Link', [], '')}
                                  {/* // ? group */}
                                  {
                                    (user.user.role.includes("leaderController") ||
                                      (user.user.role.includes("admin"))) && (
                                      <>
                                        {formRender('number', 0, 99, 'group', 'Group', [], '')}
                                      </>
                                    )
                                  }
                                  {/* // ? github token */}
                                  {formRender('string', 0, 0, 'githubToken', 'Github Token', [], '')}
                                  {/* // ? github last update */}
                                  {formRender('string', 0, 0, 'githubLastUpdate', 'Github Last Update', [], '')}
                                  <Separator />
                                  <Label className="capitalize font-bold leading-[5px] text-slate-400">Fines</Label>
                                  {/* // ? github fine */}
                                  {(user.user.role.includes("githubController") ||
                                    (user.user.role.includes("miniLeaderController")) ||
                                    (user.user.role.includes("miniMentorController")) ||
                                    (user.user.role.includes("admin"))) && (
                                      <>
                                        {formRender('number', 0, 99, 'fines.githubFine', 'Github Fine', [], '')}
                                        {/* // ? mini leader fine */}
                                        {formRender('number', 0, 99, 'fines.miniLeaderFine', 'Mini Leader Fine', [], '')}
                                        {/* // ? mini student fine */}
                                        {formRender('number', 0, 99, 'fines.miniStudentFine', 'Mini Student Fine', [], '')}
                                      </>
                                    )}
                                  <Separator />
                                  <Label className="capitalize font-bold leading-[5px] text-slate-400">Mentor Section</Label>
                                  {(
                                    user.user.role.includes("admin") ||
                                    user.user.role.includes("mentor")) && (
                                      <>
                                        {/* // ? aura points */}
                                        {formRender('number', 0, 999999, 'aura.points', 'Points', [], '')}
                                        {/* // ? aura classwork */}
                                        {formRender('number', 0, 999999, 'aura.classwork', 'Classwork', [], '')}
                                        {/* // ? aura attendance */}
                                        {formRender('number', 0, 999999, 'aura.attendance', 'Attendance', [], '')}
                                        {/* // ? aura help */}
                                        {formRender('number', 0, 999999, 'aura.help', 'Help', [], '')}
                                        {/* // ? aura camera */}
                                        {formRender('number', 0, 999999, 'aura.camera', 'Camera', [], '')}
                                        {/* // ? aura answers */}
                                        {formRender('number', 0, 999999, 'aura.answers', 'Answers', [], '')}
                                        {/* // ? payed info */}
                                        {formRender('boolean', 0, 0, 'payedInfo', 'Payed Info', [], '')}
                                        {/* // ? leader comment */}
                                      </>)}
                                  <Separator />
                                  <Label className="capitalize font-bold leading-[5px] text-slate-400">Leader Comment</Label>
                                  {(user.user.role.includes("admin") ||
                                    (user.user.role.includes("leader") && (oneStudent.leaderId == user.user._id)) ||
                                    user.user.role.includes("admin")
                                  ) && (
                                      <>
                                        {formRender('string', 0, 0, 'comment.leaderComment', 'Leader Comment', [], '')}
                                        {/* // ? leader proof */}
                                        {formRender('string', 0, 0, 'comment.leaderProof', 'Leader Proof', [], '')}
                                        {/* // ? mini leader controller */}
                                      </>
                                    )}
                                  <Separator />
                                  <Label className="capitalize font-bold leading-[5px] text-slate-400">Control comment</Label>
                                  {(
                                    user.user.role.includes("miniLeaderController") ||
                                    user.user.role.includes("githubController") ||
                                    user.user.role.includes("admin")
                                  ) &&
                                    (
                                      <>
                                        {formRender('string', 0, 0, 'comment.controller.miniLeaderController', 'Mini Leader Controller', [], '')}
                                        {/* // ? leader controller */}
                                        {formRender('string', 0, 0, 'comment.controller.githubController', 'Github Controller', [], '')}
                                      </>
                                    )
                                  }
                                  <div className="ml-auto space-x-2">
                                    <Button type="submit" variant={"green"}
                                      onClick={() =>
                                        toast("Student has been updated", {
                                          description: `${oneStudent.updatedAt}`,
                                          action: {
                                            label: "Undo",
                                            onClick: () => console.log("Undo"),
                                          }
                                        })}

                                    > Save changes</Button>
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                        <Button variant={"destructive"}>Cancel</Button>
                                      </AlertDialogTrigger>
                                      {sheetOpen && (<AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your
                                            account and remove your data from our servers.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction onClick={() => setSheetOpen(false)}>Continue</AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>)}
                                    </AlertDialog>
                                  </div>
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
                                      <span className="grid-cols-2 capitalize">Leader ID</span>
                                      <span className="col-span-3  font-bold">{oneStudent.leaderId}</span>
                                    </div>
                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">Name</span>
                                      <span className="col-span-3 font-bold">{oneStudent.name}</span>
                                    </div>
                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">Age</span>
                                      <span className="col-span-3 font-bold">{oneStudent.age}</span>
                                    </div>

                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">Email</span>
                                      <span className="col-span-3 font-bold">{oneStudent.email}</span>
                                    </div>

                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">Role</span>
                                      <span className="col-span-3 font-bold">{oneStudent.role}</span>
                                    </div>

                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">Github Link</span>
                                      <Link className="col-span-3 font-bold " to={oneStudent.githubLink} target="_blank"><Button variant={"link"} className="m-0 p-0 text-blue-500">Github</Button></Link>
                                    </div>
                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">Parent Facebook Link</span>
                                      <Link className="col-span-3 font-bold" to={oneStudent.parentFbLink} target="_blank"><Button variant={"link"} className="m-0 p-0 text-blue-500">Parent</Button></Link>
                                    </div>
                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">Student Facebook Link</span>
                                      <Link className="col-span-3 font-bold" to={oneStudent.studentFbLink} target="_blank"><Button variant={"link"} className="m-0 p-0 text-blue-500">Student</Button></Link>
                                    </div>
                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">Group</span>
                                      <span className="col-span-3 font-bold">{oneStudent.group}</span>
                                    </div>
                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">Speed</span>
                                      <span className="col-span-3 font-bold">{oneStudent.speed}</span>
                                    </div>

                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">Github Token</span>
                                      <span className="col-span-3 font-bold">****</span>
                                    </div>
                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">Github Last Update</span>
                                      <span className="col-span-3 font-bold">{oneStudent?.githubLastUpdate}</span>
                                    </div>
                                    {/* //* controller info */}

                                    <Separator />
                                    <p className="font-bold leading-[5px] text-slate-400 capitalize"><b>Controller info</b></p>
                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">Github Fine</span>
                                      <span className="col-span-3 font-bold">{oneStudent?.fines?.githubFine}</span>
                                    </div>
                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">MiniLeader Fine</span>
                                      <span className="col-span-3 font-bold">{oneStudent?.fines?.miniLeaderFine}</span>
                                    </div>
                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">MiniLeader Fine</span>
                                      <span className="col-span-3 font-bold">{oneStudent?.fines?.miniLeaderFine}</span>
                                    </div>
                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">Mini Student Fine</span>
                                      <span className="col-span-3 font-bold">{oneStudent?.fines?.miniStudentFine}</span>
                                    </div>
                                    {/* //* aura info */}

                                    <Separator />
                                    <p className="font-bold leading-[5px] text-slate-400 capitalize"><b>Aura info</b></p>
                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">Points</span>
                                      <span className="col-span-3 font-bold">{oneStudent?.aura?.answers + oneStudent?.aura?.attendance + oneStudent?.aura?.camera + oneStudent?.aura?.classwork + oneStudent?.aura?.help + oneStudent?.aura?.points}</span>
                                    </div>
                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">Classwork</span>
                                      <span className="col-span-3 font-bold">{oneStudent?.aura?.classwork}</span>
                                    </div>
                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">Attendance</span>
                                      <span className="col-span-3 font-bold">{oneStudent?.aura?.attendance}</span>
                                    </div>
                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">Help</span>
                                      <span className="col-span-3 font-bold">{oneStudent?.aura?.help}</span>
                                    </div>
                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">Camera</span>
                                      <span className="col-span-3 font-bold">{oneStudent?.aura?.camera}</span>
                                    </div>
                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">Answers</span>
                                      <span className="col-span-3 font-bold">{oneStudent?.aura?.answers}</span>
                                    </div>
                                    {/* //* comments info */}

                                    <Separator />
                                    <p className="font-bold leading-[5px] text-slate-400 capitalize"><b>Comments</b></p>
                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">Leader Comment</span>
                                      <span className="col-span-3 font-bold">{oneStudent?.comment?.leaderComment}</span>
                                    </div>
                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">Leader Poof</span>
                                      <Link className="col-span-3 font-bold" to={oneStudent?.comment?.leaderProof} target="_blank"><Button variant={"link"} className="m-0 p-0 text-blue-500">Proof</Button></Link>
                                    </div>
                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">Mini Leader Controller</span>
                                      <span className="col-span-3 font-bold" >{oneStudent?.comment?.controller.miniLeaderController}</span>
                                    </div>
                                    <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                      <span className="grid-cols-2">Github Controller</span>
                                      <span className="col-span-3 font-bold" >{oneStudent?.comment?.controller.githubController}</span>
                                    </div>
                                  </div>
                                </div>
                              </>
                            }
                          </ScrollArea>
                        )}
                      </SheetContent>
                    </Sheet>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      <Loading />
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
