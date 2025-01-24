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
import { ChevronDown, ChevronRight, } from "lucide-react"

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

import { Button } from "../components/ui/button"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../components/ui/resizable"
import { t } from "i18next"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { stepArr } from "../utils"
import { Student } from "../interface/(student)/student-Inteface"


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
    const [stepNumber, setStep] = React.useState(1)
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
                            <FormLabel className="sm:col-span-1 col-span-4 row-span-1 capitalize">{label}</FormLabel>
                            <FormControl>
                                {label == "Classwork" || label == "Attendance" || label == "Help" || label == "Camera" || label == "Answers" ? (
                                    <Input
                                        type={typeMain}
                                        className="sm:col-span-3 sm:row-span-1 row-span-2 w-full col-span-4"
                                        placeholder={`Enter ${label}`}
                                        min={minNum}
                                        max={maxNum}
                                        step={stepNumber}
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
                                ) : (
                                    <Input
                                        type={typeMain}
                                        className="sm:col-start-3 sm:col-span-3 sm:row-span-1 row-span-2 col-span-4 "
                                        placeholder={`Enter ${label}`}
                                        min={minNum}
                                        max={maxNum}
                                        // !step={stepNumber}
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
                                )}
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
                            <FormLabel className="sm:col-span-2 col-span-4">{label}</FormLabel>
                            <FormControl>
                                <Input
                                    className="sm:col-span-2 col-span-4 sm:row-span-1 row-start-2"
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
                <>
                    <Separator />
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
                                        <FormItem className="max-sm:col-span-4 max-sm:row-span-2 sm:col-start-3 sm:col-end-5 ">
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
                </>

            )
        }
    }
    const accordionData = [
        {
            value: "item-0",
            title: "Student Info",
            triggerText: "Student ID",
            contents: [
                { label: "Parent Name", value: student?.parentName },
                { label: "ID", value: student?.studentPersonalInfo?.studentId },
                { label: "City", value: student?.studentPersonalInfo?.studentCity },
                { label: "Region", value: student?.studentPersonalInfo?.studentRegion },
                { label: "Street", value: student?.studentPersonalInfo?.studentStreet },
            ],
        },
        {
            value: "item-1",
            title: "Student Info",
            triggerText: "Student info",
            contents: [
                { label: "Leader ID", value: student?.leaderId },
                { label: "Name", value: student?.name },
                { label: "Age", value: student?.age },
                { label: "Email", value: student?.email },
                { label: "Role", value: student?.role },
                { label: "Github", value: <Link to={student?.githubLink} target="_blank"><Button variant={"link"} className="m-0 p-0 text-blue-500 pl-0">Github</Button></Link> },
                { label: "Parent Facebook", value: <Link to={student?.parentFbLink} target="_blank"><Button variant={"link"} className="m-0 p-0 text-blue-500 pl-0">Parent</Button></Link> },
                { label: "Student Facebook", value: <Link to={student?.studentFbLink} target="_blank"><Button variant={"link"} className="m-0 p-0 text-blue-500 pl-0">Student</Button></Link> },
                { label: "Group", value: student?.group },
                { label: "Speed", value: student?.speed },
                { label: "Github Token", value: "****" },
                { label: "Github Last Update", value: student?.githubLastUpdate },
            ],
        },
        {
            value: "controller-info",
            title: "Controller Info",
            triggerText: "Controller info",
            contents: [
                { label: "Finally", value: student?.fines?.githubFine + student?.fines?.miniLeaderFine + student?.fines?.miniStudentFine },
                { label: "Github Fine", value: student?.fines?.githubFine },
                { label: "MiniLeader Fine", value: student?.fines?.miniLeaderFine },
                { label: "Mini Student Fine", value: student?.fines?.miniStudentFine },
            ],
        },
        {
            value: "aura-info",
            title: "Aura Info",
            triggerText: "Aura info",
            contents: [
                { label: "Finally", value: student?.aura?.answers + student?.aura?.classwork + student?.aura?.attendance + student?.aura?.camera + student?.aura?.help },
                { label: "Classwork", value: student?.aura?.classwork },
                { label: "Attendance", value: student?.aura?.attendance },
                { label: "Help", value: student?.aura?.help },
                { label: "Camera", value: student?.aura?.camera },
                { label: "Answers", value: student?.aura?.answers },
            ],
        },
        {
            value: "comments-info",
            title: "Comments Info",
            triggerText: "Comments",
            contents: [
                { label: "Mini Leader Comment", value: student?.comment?.miniLeaderComment },
                { label: "Leader Comment", value: student?.comment?.leaderComment },
                { label: "Leader Poof", value: <Link to={student?.comment?.leaderProof} target="_blank"><Button variant={"link"} className="m-0 p-0 text-blue-500 pl-0">Proof</Button></Link> },
                { label: "Mini Leader Controller", value: student?.comment?.controller.miniLeaderController },
                { label: "Github Controller", value: student?.comment?.controller.githubController },
            ],
        },
    ];

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
                        <div className="font-bold  sm:text-xl text-sm  capitalize flex items-center">
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
                                                            <SheetTitle className="text-start">
                                                                <span >{studentInfo ? "Edit Student" : "Info Student"}</span> <br className="sm:hidden" /><span className="dark:text-green-500 text-green-400">{student.name}</span></SheetTitle>
                                                            <SheetDescription className="flex items-center justify-between">
                                                                <span className="max-sm:hidden">{studentInfo ? "Make changes to your profile here. Click save when you're done." : "Get Student information here."}</span>
                                                                <Button
                                                                    onClick={() => { setStudentInfo(!studentInfo) }}
                                                                    className="bg-green-500 text-sm px-6 py-4 max-sm:ml-auto hover:bg-green-400">{!studentInfo ? "Edit" : "Info"}</Button>
                                                            </SheetDescription>
                                                        </SheetHeader>
                                                        {isLoading ? <Loading /> : (
                                                            <ScrollArea className="h-full p-4 pb-16">
                                                                {(studentInfo && !isLoading) ? (<Form {...form}>
                                                                    <form onSubmit={form.handleSubmit(onSubmit)}>
                                                                        <Accordion type="multiple" className="grid gap-4 py-4">
                                                                            {/* // ? leader id */}
                                                                            {
                                                                                (
                                                                                    user?.user?.role.includes("leaderController") ||
                                                                                    user?.user?.role.includes("leader") ||
                                                                                    (user?.user?.role.includes("admin"))) && (
                                                                                    <>
                                                                                        <AccordionItem value="edit-student-1">

                                                                                            <AccordionTrigger className="font-bold leading-[5px] text-slate-400">ID</AccordionTrigger>
                                                                                            <AccordionContent>
                                                                                                {formRender('string', 0, 0, 'leaderId', 'Leader ID', [], '')}
                                                                                            </AccordionContent>
                                                                                        </AccordionItem>
                                                                                    </>
                                                                                )
                                                                            }
                                                                            {/* // ? student information */}
                                                                            {
                                                                                (user?.user?.role.includes("leaderController") ||
                                                                                    user?.user?.role.includes("mentor") ||
                                                                                    user?.user?.role.includes("mentorAssistant") ||
                                                                                    user?.user?.role.includes("leader") ||
                                                                                    user?.user?.role.includes("admin")) && (
                                                                                    <>
                                                                                        <AccordionItem value="edit-student-9">
                                                                                            <AccordionTrigger className="font-bold  leading-[5px] text-slate-400">Student ID</AccordionTrigger>
                                                                                            <AccordionContent className="flex flex-col gap-2">                                                                                            {/* // ? speed */}
                                                                                                {formRender('string', 0, 0, 'parentName', 'parent Name', [], '')}
                                                                                                <Separator />
                                                                                                {formRender('string', 0, 0, 'studentPersonalInfo.studentId', 'ID', [], '')}
                                                                                                <Separator />
                                                                                                {formRender('string', 0, 0, 'studentPersonalInfo.studentRegion', 'Region', [], '')}
                                                                                                <Separator />
                                                                                                {formRender('string', 0, 0, 'studentPersonalInfo.studentCity', 'City', [], '')}
                                                                                                <Separator />
                                                                                                {formRender('string', 0, 0, 'studentPersonalInfo.studentStreet', 'Street', [], '')}
                                                                                            </AccordionContent>
                                                                                        </AccordionItem>
                                                                                    </>
                                                                                )
                                                                            }
                                                                            {

                                                                                (user?.user?.role.includes("leaderController") ||
                                                                                    ((user?.user?._id == student?.leaderId)) ||
                                                                                    user?.user?.role.includes("admin")) &&
                                                                                (<>
                                                                                    <AccordionItem value="edit-student-2">

                                                                                        <AccordionTrigger className="font-bold leading-[5px] text-slate-400">Student Info</AccordionTrigger>
                                                                                        <AccordionContent className="flex flex-col gap-3">
                                                                                            {/* // ? name */}
                                                                                            {formRender('string', 0, 0, 'name', 'Name', [], '')}
                                                                                            <Separator />
                                                                                            {/* // ? age */}
                                                                                            {formRender("number", 0, 99, "age", "Age", [], '')}
                                                                                            <Separator />

                                                                                            {/* // ? email */}
                                                                                            {formRender('string', 0, 0, 'email', 'Email', [], '')}
                                                                                            <Separator />
                                                                                            {/* // ? github */}
                                                                                            {formRender('string', 0, 0, 'githubLink', 'Github', [], '')}
                                                                                            <Separator />
                                                                                            {/* // ? Student Facebook Link */}
                                                                                            {formRender('string', 0, 0, 'studentFbLink', 'Student Facebook', [], '')}
                                                                                            <Separator />
                                                                                            {/* // ? parent facebook link */}
                                                                                            {formRender('string', 0, 0, 'parentFbLink', 'Parent Facebook', [], '')}
                                                                                            <Separator />
                                                                                            {/* // ? github token */}
                                                                                            {formRender('string', 0, 0, 'githubToken', 'Github Token', [], '')}
                                                                                            <Separator />
                                                                                            {/* // ? github last update */}
                                                                                            {formRender('string', 0, 0, 'githubLastUpdate', 'Github Last Update', [], '')}

                                                                                            {/* // ? role */}
                                                                                            <>
                                                                                                {formRender('role', 0, 0, 'role', 'Role', ['student', 'miniLeader'], "")}
                                                                                            </>

                                                                                        </AccordionContent>
                                                                                    </AccordionItem>
                                                                                </>)}

                                                                            {/* // ? group */}
                                                                            {
                                                                                (user?.user?.role.includes("leaderController") ||
                                                                                    user?.user?.role.includes("mentor") ||
                                                                                    user?.user?.role.includes("mentorAssistant") ||
                                                                                    user?.user?.role.includes("leader") ||
                                                                                    user?.user?.role.includes("admin")) && (
                                                                                    <>
                                                                                        <AccordionItem value="edit-student-3">
                                                                                            <AccordionTrigger className="font-bold  leading-[5px] text-slate-400">Group</AccordionTrigger>
                                                                                            <AccordionContent className="flex flex-col gap-2">                                                                                            {/* // ? speed */}
                                                                                                {formRender('number', 0, 4, 'speed', 'Speed', [], '')}
                                                                                                <Separator />
                                                                                                {formRender('number', 0, 99, 'group', 'Group', [], '')}
                                                                                            </AccordionContent>
                                                                                        </AccordionItem>
                                                                                    </>
                                                                                )
                                                                            }

                                                                            {/* // ? github fine */}
                                                                            {(user?.user?.role.includes("githubController") ||
                                                                                (user?.user?.role.includes("miniLeaderController")) ||
                                                                                (user?.user?.role.includes("admin"))) && (
                                                                                    <>
                                                                                        <AccordionItem value="edit-student-4">

                                                                                            <AccordionTrigger className="capitalize font-bold leading-[1px] text-md text-slate-400">Fines</AccordionTrigger>
                                                                                            <AccordionContent className="flex flex-col gap-2">
                                                                                                {formRender('number', 0, 99, 'fines.githubFine', 'Github Fine', [], '')}
                                                                                                <Separator />
                                                                                                {/* // ? mini leader fine */}
                                                                                                {formRender('number', 0, 99, 'fines.miniLeaderFine', 'Mini Leader Fine', [], '')}
                                                                                                <Separator />
                                                                                                {/* // ? mini student fine */}
                                                                                                {formRender('number', 0, 99, 'fines.miniStudentFine', 'Mini Student Fine', [], '')}
                                                                                            </AccordionContent>
                                                                                        </AccordionItem>
                                                                                    </>
                                                                                )}
                                                                            {/* //* mentor */}
                                                                            {(
                                                                                user?.user?.role.includes("admin") ||
                                                                                user?.user?.role.includes("mentorAssistant") ||
                                                                                user?.user?.role.includes("mentor")) && (
                                                                                    <>
                                                                                        <AccordionItem value="edit-student-5">

                                                                                            <AccordionTrigger className="capitalize font-bold leading-[5px] text-slate-400">Mentor Section</AccordionTrigger>
                                                                                            <AccordionContent className="flex flex-col gap-2">
                                                                                                <div className="flex gap-3 p-2 items-center">
                                                                                                    <FormLabel className="grid-cols-2">Step</FormLabel>
                                                                                                    <FormField
                                                                                                        control={form.control}
                                                                                                        name={""}
                                                                                                        render={({ field, fieldState: { error } }) => (
                                                                                                            <FormItem className="">
                                                                                                                <Select onValueChange={(value) => { field.onChange(value); setStep(Number(value)) }} defaultValue={typeof field.value === 'string' ? field.value : undefined}>
                                                                                                                    <SelectTrigger>
                                                                                                                        <SelectValue placeholder="Pick a number" />
                                                                                                                    </SelectTrigger>
                                                                                                                    <SelectContent>
                                                                                                                        <SelectGroup >
                                                                                                                            {stepArr.map(i => (
                                                                                                                                <SelectItem key={i} value={i.toString()}>
                                                                                                                                    {i}
                                                                                                                                </SelectItem>
                                                                                                                            ))}
                                                                                                                        </SelectGroup>
                                                                                                                    </SelectContent>
                                                                                                                </Select>
                                                                                                                <FormMessage className="col-span-3">{error?.message}</FormMessage>
                                                                                                            </FormItem>
                                                                                                        )}
                                                                                                    />
                                                                                                </div>
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
                                                                                            </AccordionContent>
                                                                                        </AccordionItem>
                                                                                    </>)}
                                                                            {(
                                                                                user?.user?.role.includes("admin") ||
                                                                                (user?.user?.role.includes("leader") && (student.leaderId == user?.user?._id)) ||
                                                                                user?.user?.role.includes("admin")
                                                                            ) && (
                                                                                    <>
                                                                                        <AccordionItem value="edit-student-7">

                                                                                            {/* // ? leader comment */}
                                                                                            <AccordionTrigger className="capitalize font-bold leading-[5px] text-slate-400">Leader Comment</AccordionTrigger>
                                                                                            <AccordionContent className="flex flex-col gap-2">
                                                                                                {formRender('string', 0, 0, 'comment.leaderComment', 'Leader Comment', [], '')}
                                                                                                <Separator />

                                                                                                {/* // ? leader proof */}
                                                                                                {formRender('string', 0, 0, 'comment.leaderProof', 'Leader Proof', [], '')}
                                                                                                {/* // ? mini leader controller */}
                                                                                            </AccordionContent>
                                                                                        </AccordionItem>
                                                                                    </>
                                                                                )}

                                                                            {(
                                                                                user?.user?.role.includes("admin") ||
                                                                                (user?.user?.role.includes("leader") && (student.leaderId == user?.user?._id)) ||
                                                                                (user?.user?.role.includes("miniLeader") && (student.leaderId == user?.user?.miniLeaderId)) ||
                                                                                user?.user?.role.includes("admin")
                                                                            ) && (
                                                                                    <>
                                                                                        <AccordionItem value="edit-student-6">

                                                                                            {/* // ? mini leader comment */}
                                                                                            <AccordionTrigger className="capitalize font-bold  text-slate-400">Mini Leader Comment</AccordionTrigger>
                                                                                            <AccordionContent className="flex flex-col gap-2">
                                                                                                <Separator />
                                                                                                {formRender('string', 0, 0, 'comment.miniLeaderComment', 'Mini Leader Comment', [], '')}
                                                                                            </AccordionContent>
                                                                                        </AccordionItem>
                                                                                    </>
                                                                                )}

                                                                            {(
                                                                                user?.user?.role.includes("miniLeaderController") ||
                                                                                user?.user?.role.includes("githubController") ||
                                                                                user?.user?.role.includes("admin")
                                                                            ) &&
                                                                                (
                                                                                    <>
                                                                                        <AccordionItem value="edit-student-7">

                                                                                            <AccordionTrigger className="capitalize font-bold leading-[5px] text-slate-400">Control comment</AccordionTrigger>
                                                                                            <AccordionContent className="flex flex-col gap-2">
                                                                                                {formRender('string', 0, 0, 'comment.controller.miniLeaderController', 'Mini Leader Controller', [], '')}
                                                                                                <Separator />
                                                                                                {/* // ? leader controller */}
                                                                                                {formRender('string', 0, 0, 'comment.controller.githubController', 'Github Controller', [], '')}
                                                                                            </AccordionContent>
                                                                                        </AccordionItem>
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
                                                                        </Accordion>
                                                                    </form>
                                                                </Form>)

                                                                    :
                                                                    <>
                                                                        <div>
                                                                            <Accordion type="single" collapsible className="grid gap-4 py-4">
                                                                                {accordionData.map((item) => (
                                                                                    <AccordionItem key={item.value} value={item.value} title={item.title}>
                                                                                        <AccordionTrigger className="font-bold leading-[5px] text-slate-400 capitalize">
                                                                                            <b>{item.triggerText}</b>
                                                                                        </AccordionTrigger>
                                                                                        {
                                                                                            ["Student Personal Information", "Comments"].includes(item.triggerText) &&
                                                                                            item.contents.map((content, index) => (
                                                                                                <AccordionContent key={index} className="grid grid-cols-4 items-center w-full justify-start gap-2">
                                                                                                    <span className="col-span-2 font-bold capitalize">{content.label}</span>
                                                                                                    <span className="col-start-1 text-slate-500/50 dark:text-green-400 font-bold">{content.value}</span>
                                                                                                    <Separator className="row-start-2 col-span-4" />
                                                                                                </AccordionContent>
                                                                                            ))
                                                                                        }
                                                                                        {
                                                                                            !["Student Personal Information", "Comments"].includes(item.triggerText) &&
                                                                                            item.contents.map((content, index) => (
                                                                                                <AccordionContent key={index} className="grid grid-cols-4 items-center w-full justify-start gap-2">
                                                                                                    <span className="col-span-2 font-bold capitalize">{content.label}</span>
                                                                                                    <span className="col-start-3 font-bold">{content.value}</span>
                                                                                                    {<Separator className="row-start-2 col-span-4" />}
                                                                                                </AccordionContent>
                                                                                            ))
                                                                                        }

                                                                                    </AccordionItem>
                                                                                ))}
                                                                                <div className="flex gap-2 items-center">
                                                                                    <h2 className="text-green-500  ">last update</h2>
                                                                                    <p className="font-bold">{student?.githubLastUpdate}</p>
                                                                                </div>
                                                                            </Accordion>
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
                                                    <h1 className="text-red-600">No Data</h1>
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
