import { Lesson } from "linkWithBackend/interfaces/TendonType";
import LessonGraphService from "linkWithBackend/services/data_service";
import { getToken } from "@components/ShareData/user_setting";
import React from "react";

export var dictLesson: { [key: string]: Lesson } = {}
var token = getToken()

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