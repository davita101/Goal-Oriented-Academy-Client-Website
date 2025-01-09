import * as React from "react"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../components/ui/sheet"

import {
    flexRender,
} from "@tanstack/react-table"
import { ArrowRight, ChevronDown, ChevronRight, } from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { Input } from "../components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../components/ui/table"
import { Link } from "react-router-dom"
import { ScrollArea, ScrollBar } from "../components/ui/scroll-area"
import { Separator } from "../components/ui/separator"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../components/ui/select"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "../components/ui/form"
import Loading from "../components/loading"
import { toast } from "sonner"

import { Student } from "../utils/(student)/student"
import { Button } from "../components/ui/button"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../components/ui/resizable"
import { t } from "i18next"


export default function DataTable({
    title,
    table,
    oneRowSelection,
    setRowSelection,
    rowSelection,
    setOneRowSelection,
    studentInfo,
    setStudentInfo,
    isLoading,
    form,
    onSubmit,
    user,
    student,
    pageSizeSet,
    pagination,
    setPagination,
    paginationAllStudents,
    setPageSizeSet,
}: {
    title: string,
    table: any,
    oneRowSelection: any,
    setRowSelection: any,
    rowSelection: any,
    setOneRowSelection: any,
    studentInfo: any,
    setStudentInfo: any,
    isLoading: any,
    form: any,
    onSubmit: any,
    user: any,
    student: Student,
    pageSizeSet: any,
    pagination: any,
    setPagination: any,
    setPageSizeSet: any,
    paginationAllStudents: any,
}) {

    const handleInputChange = (row: any, field: string, value: string | number) => {
        if (row && row.original) {
            row.original[field] = value;
            setRowSelection({ ...rowSelection });
        }
    }
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

    return (
        <div className={`bg-[var(--background)] grid auto-rows-min overflow-hidden gap-4 grid-cols-1 px-2`}>
            <ResizablePanelGroup direction="horizontal" >
                <ResizablePanel defaultSize={100}>
                    <div className="">
                        <div className="flex items-center py-4">
                            <Input
                                placeholder={`${t("student")} name...`}
                                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                                onChange={(event) =>
                                    table.getColumn("name")?.setFilterValue(event.target.value)
                                }
                                className="max-w-sm mx-1"
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
                                        .filter((column: { getCanHide: () => any }) => column.getCanHide())
                                        .map((column: { id: boolean | React.Key | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; getIsVisible: () => string | boolean | undefined; toggleVisibility: (arg0: boolean) => void }) => {
                                            return (
                                                <DropdownMenuCheckboxItem
                                                    key={String(column.id)}
                                                    className=" text-center"
                                                    checked={!!column.getIsVisible()}
                                                    onCheckedChange={(value) =>
                                                        column.toggleVisibility(!!value)
                                                    }
                                                >
                                                    {t(String(column.id))}
                                                </DropdownMenuCheckboxItem>
                                            );
                                        })}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="font-bold text-xl capitalize flex items-center">
                            {title?.split(" ").map((word, index) => (
                                <React.Fragment key={index}>
                                    {t(word)} <ChevronRight size={20} className="mt-1.5" color="hsl(var(--primary))" />
                                </React.Fragment>
                            ))}
                            {user?.user?.name}
                        </div>


                        <ScrollArea className="mt-2">
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        {table.getHeaderGroups().map((headerGroup: { id: React.Key | null | undefined; headers: any[] }) => (
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
                                            table.getRowModel().rows.map((row: { id: React.Key | null | undefined; original: any; getIsSelected: () => any; getVisibleCells: () => any[] }) => (

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
                                                            <SheetTitle><span >{studentInfo ? "Edit Student" : "Info Student"}</span> <span className="dark:text-green-500 text-green-400">{student.name}</span></SheetTitle>
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
                                                                            {/* // ? leader id */}

                                                                            {
                                                                                (
                                                                                    user?.user?.role.includes("leaderController") ||
                                                                                    user?.user?.role.includes("leader") ||
                                                                                    (user?.user?.role.includes("admin"))) && (
                                                                                    <>
                                                                                        <p className="font-bold leading-[5px] text-slate-400">leader edit</p>
                                                                                        {formRender('string', 0, 0, 'leaderId', 'Leader ID', [], '')}
                                                                                        <Separator />
                                                                                    </>
                                                                                )
                                                                            }
                                                                            {

                                                                                (user?.user?.role.includes("leaderController") ||
                                                                                    ((user?.user?._id == student?.leaderId)) ||
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
                                                                                    {formRender('string', 0, 0, 'githubLink', 'Github', [], '')}
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
                                                                                    user?.user?.role.includes("mentor") ||
                                                                                    user?.user?.role.includes("admin")) && (
                                                                                    <>
                                                                                        {formRender('number', 0, 4, 'speed', 'Speed', [], '')}
                                                                                        <Separator />
                                                                                    </>
                                                                                )
                                                                            }

                                                                            {/* // ? role */}

                                                                            {user?.user?._id == student?.leaderId && (
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
                                                                                    </>
                                                                                )
                                                                            }

                                                                            {/* // ? github fine */}
                                                                            {(user?.user?.role.includes("githubController") ||
                                                                                (user?.user?.role.includes("miniLeaderController")) ||
                                                                                (user?.user?.role.includes("miniMentorController")) ||
                                                                                (user?.user?.role.includes("admin"))) && (
                                                                                    <>
                                                                                        <p className="capitalize font-bold leading-[1px] text-md text-slate-400">Fines</p>

                                                                                        {formRender('number', 0, 99, 'fines.githubFine', 'Github Fine', [], '')}
                                                                                        <Separator />
                                                                                        {/* // ? mini leader fine */}
                                                                                        {formRender('number', 0, 99, 'fines.miniLeaderFine', 'Mini Leader Fine', [], '')}
                                                                                        <Separator />
                                                                                        {/* // ? mini student fine */}
                                                                                        {formRender('number', 0, 99, 'fines.miniStudentFine', 'Mini Student Fine', [], '')}
                                                                                    </>
                                                                                )}

                                                                            {(
                                                                                user?.user?.role.includes("admin") ||
                                                                                user?.user?.role.includes("mentor")) && (
                                                                                    <>
                                                                                        <Separator />
                                                                                        <p className="capitalize font-bold leading-[5px] text-slate-400">Mentor Section</p>
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
                                                                                    </>)}

                                                                            {formRender('string', 0, 0, 'comment.miniLeaderComment', 'Mini Leader Comment', [], '')}
                                                                            {(
                                                                                user?.user?.role.includes("admin") ||
                                                                                (user?.user?.role.includes("leader") && (student.leaderId == user?.user?._id)) ||
                                                                                user?.user?.role.includes("admin")
                                                                            ) && (
                                                                                    <>
                                                                                        {/* // ? leader comment */}
                                                                                        <Separator />
                                                                                        <p className="capitalize font-bold leading-[5px] text-slate-400">Leader Comment</p>
                                                                                        {formRender('string', 0, 0, 'comment.leaderComment', 'Leader Comment', [], '')}
                                                                                        <Separator />
                                                                                        {/* // ? leader proof */}
                                                                                        {formRender('string', 0, 0, 'comment.leaderProof', 'Leader Proof', [], '')}
                                                                                        {/* // ? mini leader controller */}
                                                                                    </>
                                                                                )}

                                                                            {(
                                                                                user?.user?.role.includes("miniLeaderController") ||
                                                                                user?.user?.role.includes("githubController") ||
                                                                                user?.user?.role.includes("admin")
                                                                            ) &&
                                                                                (
                                                                                    <>
                                                                                        <Separator />
                                                                                        <p className="capitalize font-bold leading-[5px] text-slate-400">Control comment</p>
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
                                                                                            label: "Close",
                                                                                            onClick: () => console.log("Close"),
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
                                                                                    <span className="col-span-2 font-bold ">Mini Leader Comment</span>
                                                                                    <span className="col-span-3 dark:text-slate-300 break-words text-black/60">{student?.comment?.miniLeaderComment}</span>
                                                                                </div>
                                                                                <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                                    <span className="col-span-2 font-bold ">Leader Comment</span>
                                                                                    <span className="col-span-3 dark:text-slate-300 break-words text-black/60">{student?.comment?.leaderComment}</span>
                                                                                </div>
                                                                                <Separator />
                                                                                <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                                    <span className="col-span-2 font-bold ">Leader Poof</span>
                                                                                    <Link className="col-span-3 dark:text-slate-300 break-words text-black/60" to={student?.comment?.leaderProof} target="_blank"><Button variant={"link"} className="m-0 p-0 text-blue-500 pl-0">Proof</Button></Link>
                                                                                </div>
                                                                                <Separator />
                                                                                <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                                    <span className="col-span-2 font-bold ">Mini Leader Controller</span>
                                                                                    <span className="col-span-3 dark:text-slate-300 break-words text-black/60" >{student?.comment?.controller.miniLeaderController}</span>
                                                                                </div>
                                                                                <Separator />
                                                                                <div className="grid grid-cols-4  items-center w-full justify-start gap-2">
                                                                                    <span className="col-span-2 font-bold ">Github Controller</span>
                                                                                    <span className="col-span-3 dark:text-slate-300 break-words text-black/60" >{student?.comment?.controller.githubController}</span>
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
                    </div>
                    <p></p>
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
                                    disabled={pagination === Math.ceil(paginationAllStudents.length / pageSizeSet) - 1}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel>
                </ResizablePanel>
            </ResizablePanelGroup>

        </div>
    )
}
