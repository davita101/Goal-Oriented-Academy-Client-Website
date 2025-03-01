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

import { Navigate, useParams } from "react-router-dom"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAuthStore } from "../../store/authStore"
import { useLeaderStore } from "../../store/studentStore"
import { Button } from "../../components/ui/button"
import { useMentorStore } from "../../store/mentorStore"
import { Student } from "../../interface/(student)/student-Inteface"
import { userSchema } from "../../schema/(student)/form"
import DataTable from "../../hooks/use-data-table"
import { t } from "i18next"
import { useLessonEventStore } from "../../store/lessonEventStore"


export const columns: ColumnDef<Student>[] = [

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
        accessorKey: "aura",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="m-0 p-0"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {t("aura")}
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
        accessorKey: "classwork",
        header: () => t("classwork"),
        cell: ({ row }) => (
            <div key={(row.getValue("aura") as Student["aura"]).classwork} className="capitalize font-bold">
                {(row.getValue("aura") as { classwork: number }).classwork}
            </div>
        ),
    },
    {
        accessorKey: "answers",
        header: () => t("answers"),
        cell: ({ row }) => (
            <div key={(row.getValue("aura") as Student["aura"]).answers} className="capitalize font-bold">
                {(row.getValue("aura") as Student["aura"]).answers}
            </div>
        ),
    },
    {
        accessorKey: "attendance",
        header: () => t("attendance"),
        cell: ({ row }) => (
            <div key={(row.getValue("aura") as Student["aura"]).attendance} className="capitalize font-bold">
                {(row.getValue("aura") as Student["aura"]).attendance}
            </div>
        ),
    },
    {
        accessorKey: "camera",
        header: () => t("camera"),
        cell: ({ row }) => (
            <div key={(row.getValue("aura") as Student["aura"]).camera} className="capitalize font-bold">
                {(row.getValue("aura") as Student["aura"]).camera}
            </div>
        ),
    },
    {
        accessorKey: "help",
        header: () => t("help"),
        cell: ({ row }) => (
            <div key={(row.getValue("aura") as Student["aura"]).help} className="capitalize font-bold">
                {(row.getValue("aura") as Student["aura"]).help}
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
    const [studentInfo, setStudentInfo] = React.useState(false)
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

    const { user } = useAuthStore()
    const { student, getStudent, updateStudent, isLoading, } = useLeaderStore()
    const { getGroup, group } = useMentorStore()
    const { groupId, lessonEventId } = useParams()
    const { getLessonEvent, lessonsEvent, updateLessonEvent } = useLessonEventStore()

    React.useEffect(() => {
        getGroup(groupId as string)
        getLessonEvent(lessonEventId as string)
        if (oneRowSelection) {
            getStudent(oneRowSelection.leaderId, oneRowSelection._id)
        }
    }, [oneRowSelection, user?.user?._id, getStudent, getGroup, getLessonEvent, lessonsEvent])
    const table = useReactTable({
        data: lessonsEvent?.students?.sort((a, b) => a?.aura?.points < b?.aura?.points ? 1 : -1) || [],
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
            parentName: '',
            studentPersonalInfo: { studentId: '', studentRegion: '', studentCity: '', studentStreet: '' },
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
                parentName: student.parentName || '',
                studentPersonalInfo: student.studentPersonalInfo || { studentId: '', studentRegion: '', studentCity: '', studentStreet: '' },
                fines: student.fines || { githubFine: 0, miniLeaderFine: 0, miniStudentFine: 0 },
                aura: student.aura || { points: 0, classwork: 0, attendance: 0, help: 0, camera: 0, answers: 0 },
                payedInfo: student.payedInfo || false,
                comment: student.comment || { leaderComment: '', leaderProof: '', controller: { miniLeaderController: '', githubController: '' } },
            });
        }
    }, [form, student]);

    const onSubmit: SubmitHandler<Student> = (data) => {
        console.log(lessonsEvent)
        data.aura.points = (data.aura.answers || 0) + (data.aura.attendance || 0) + (data.aura.camera || 0) + (data.aura.classwork || 0) + (data.aura.help || 0);
        setOneRowSelection((prev: Student) => ({ ...prev, leaderId: data.leaderId }));
        if (lessonEventId) {
            updateLessonEvent(lessonEventId, data);
        }
        // updateStudent(student.leaderId, student._id, data);
        // if (!isLoading) {
        //     setStudentInfo(false);
        // }
    };
    // console.log("ddd    ")
    return (
        <>
            <DataTable
                title={`${t("groups")} ${t("mentor")} ${t("group")} ${groupId}`}
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
                paginationAllStudents={group} />
        </>
    );
}
