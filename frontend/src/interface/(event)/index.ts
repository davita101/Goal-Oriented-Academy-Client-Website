
export interface LessonEventState {
    isLoading: Boolean;
    status: Number;
    students: Object;
    lessonsEvent: Object;
    createLessonEvent: (groupId: string, lessonEventId: string, lessonEventData: object) => any;
    getLessonEvent: (lessonEventId: string) => any;
}