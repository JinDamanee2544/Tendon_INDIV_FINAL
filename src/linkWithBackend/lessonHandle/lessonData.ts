import TYPES, { Lesson, MemType } from "linkWithBackend/interfaces/TendonType";
import container from "linkWithBackend/services/inversify.config";
import LessonService from "linkWithBackend/services/lesson_service";
import MemoryService from "linkWithBackend/services/memory_service";

export var dictLesson: { [key: string]: Lesson } = {}

const memService = container.get<MemoryService>(TYPES.MemoryService)
var token = memService.getLocalStorage(MemType.token)

export async function getLessonInformation(lesson_id: string) {
    if (lesson_id in dictLesson) {
        return dictLesson[lesson_id]!
    } else {
        var result: Lesson = {} as Lesson
        var lessonService = container.get<LessonService>(TYPES.LessonService)
        var lessonInformation: Lesson = await lessonService.getLessonById(lesson_id, token)

        result = {
            ...result,
            ID: lessonInformation?.ID,
            Title: lessonInformation?.Title,
            Description: lessonInformation?.Description,
            access: lessonInformation?.access,
            Nodes: lessonInformation?.Nodes,
            NextLessons: lessonInformation?.NextLessons,
            PrevLessons: lessonInformation?.PrevLessons
        }
        dictLesson[lesson_id] = result
        return result
    }
}