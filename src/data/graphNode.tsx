import { LearningLessonNodeProps, StatusType } from "../customTypes";



export const MockRelateCourse: LearningLessonNodeProps[] = [
    {
        lessonId: '2',
        lessonName: "First",
        status: StatusType.COMPLETED,
        next: [
            {
                lessonId: '3',
                lessonName: "Framework",
                status: StatusType.INPROGRESS,
                next: [
                    {
                        lessonId: '4',
                        lessonName: "React",
                        status: StatusType.NOTSTARTED,
                    },
                    {
                        lessonId: '5',
                        lessonName: "Vue",
                        status: StatusType.NOTSTARTED,
                    },
                ]
            },
            {
                lessonId: '7',
                lessonName: "Language",
                status: StatusType.NOTSTARTED,
                next: [
                    {
                        lessonId: '8',
                        lessonName: "JavaScript",
                        status: StatusType.NOTSTARTED,
                    },
                    {
                        lessonId: '9',
                        lessonName: "TypeScript",
                        status: StatusType.NOTSTARTED,
                    },
                ]
            }
        ]
    },
    {
        lessonId: '6',
        lessonName: "Second",
        status: StatusType.COMPLETED,
        next: [
            {
                lessonId: '7',
                lessonName: "Language",
                status: StatusType.NOTSTARTED,
            }
        ]
    },
]