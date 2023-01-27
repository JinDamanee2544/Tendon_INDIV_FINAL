import TYPES, { Lesson } from "linkWithBackend/interfaces/TendonType";
import LessonGraphService from "linkWithBackend/services/data_service";
import container from "linkWithBackend/services/inversify.config";
import MemoryService from "linkWithBackend/services/memory_services";
import React from "react";

export var dictLesson: { [key: string]: Lesson } = {}

const memService = container.get<MemoryService>(TYPES.MemoryService)
var token = memService.getToken()

export async function getLessonInformation(lesson_id: string) {
    if (lesson_id in dictLesson) {
        return dictLesson[lesson_id]!
    } else {
        var result: Lesson = {} as Lesson
        var lessonGraph = new LessonGraphService()
        var lessonInformation: Lesson = await lessonGraph.getLessonById(lesson_id, token)

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