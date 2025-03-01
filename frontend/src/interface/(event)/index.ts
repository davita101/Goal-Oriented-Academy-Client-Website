
export interface LessonEventState {
    isLoading: Boolean;
    status: Number;
    lessonsEvent: Object;
    createLessonEvent: (groupId: string, lessonEventData: object) => any;
    getLessonEvent: (lessonEventId: string) => any;
    updateLessonEvent: (groupId: string, lessonEventData: object) => any;
    getGroupLessonEvent: (groupId: string) => any;

}