import CourseNode from "@components/curriculaMap/LearningNode";
import { Course, Lesson } from "linkWithBackend/interfaces/TendonType";
import React, { useEffect, useState } from "react";
import { StatusType } from "@customTypes/index";
import TopologicalSort from "./GraphTopoHandle";
import LessonDataViewModel from "./LessonViewModel";
import { useTendonContainer } from "linkWithBackend/services/container";
import { token } from "../_demo_setting";
import LessonGraphService from "linkWithBackend/services/data_service";
import { LessonGetHandle } from "./LessonView";

interface graphProps {
    courseView: Course
}

async function getLessonInformation(lesson_id: string) {
    var result: Lesson = {} as Lesson
    var lessonGraph = new LessonGraphService()
    var lessonInformation:Lesson = await lessonGraph.getLessonById(lesson_id, token)
    // console.log("-->", lessonInformation?.name)
    result = {
        ... result,
        id: lessonInformation?.id,
        name: lessonInformation?.name,
        description: lessonInformation?.description,
        access: lessonInformation?.access,
        nodes: lessonInformation?.nodes,
        nextLesson: lessonInformation?.nextLesson,
        prevLesson: lessonInformation?.prevLesson
    }
    return result
}

export default function GraphPathView({ courseView } : graphProps) {
    const lessonArray = courseView.lessons
    var data: Lesson[] = []
    for (let i = 0; i < lessonArray.length; i++) {
        let promise = new Promise<Lesson>((resolve, reject) => {
            const tmpValue = getLessonInformation(lessonArray[i]!)
            resolve(tmpValue)
        })
        promise.then( value => {
            data.push(value)
            // setLessonData(data)
        });
    }
    // console.log(lessonData)
    const lessonTopoArray = TopologicalSort(data)
    console.log("Topo: ", lessonTopoArray)

    return (
        <></>
    )
}