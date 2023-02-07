import TYPES, { Lesson } from "linkWithBackend/interfaces/TendonType";
import container from "linkWithBackend/services/inversify.config";
import LessonService from "linkWithBackend/services/lesson_services";
import MemoryService from "linkWithBackend/services/memory_services";

export var dictLesson: { [key: string]: Lesson } = {}

const memService = container.get<MemoryService>(TYPES.MemoryService)
var token = memService.getLocalStorage('token')

export async function getLessonInformation(lesson_id: string) {
    if (lesson_id in dictLesson) {
        return dictLesson[lesson_id]!
    } else {
        var result: Lesson = {} as Lesson
        var lessonService = container.get<LessonService>(TYPES.LessonService)
        var lessonInformation: Lesson = await lessonService.getLessonById(lesson_id, token)

        result = {
            ...result,
            id: lessonInformation?.id,
            name: lessonInformation?.name,
            description: lessonInformation?.description,
            access: lessonInformation?.access,
            nodes: lessonInformation?.nodes,
            nextLesson: lessonInformation?.nextLesson,
            prevLesson: lessonInformation?.prevLesson
        }
        dictLesson[lesson_id] = result
        return result
    }
}