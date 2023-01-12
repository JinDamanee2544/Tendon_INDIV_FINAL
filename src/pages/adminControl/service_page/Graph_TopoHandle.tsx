import { Lesson } from "linkWithBackend/interfaces/TendonType";
import React from "react";

interface graphData {
    id: string
    nextLesson: string[]
    prevLesson: string[] 
    isPass: boolean
}

// Beware! Non-primitive are passed into a function by reference
var graph: graphData[] = []

function clearNodeGraph(indexDelete: number) {
    for (let i = 0; i < graph.length; i++) {
        var prevArray = graph[i]!.prevLesson
        let tmp = []
        for (let j = 0; j < prevArray.length; j++) {
            if (prevArray[j] === graph[indexDelete]!.id) {
            } else {
                tmp.push(prevArray[j])
            }
        }
        graph[i]!.prevLesson = tmp as string[]
    }
}

function findHaveNotIn() {
    for (let i = 0; i < graph.length; i++) {
        if (graph[i]?.prevLesson?.length === 0 && graph[i]?.isPass === false) {
            graph[i]!.isPass = true
            graph[i]!.nextLesson = []
            clearNodeGraph(i)
            return graph[i]!.id
        }
    }
    return "No In"
}

export default function TopologicalSort(lessonData: Lesson[]) {
    var result: string[] = []
    for (let i = 0; i < lessonData.length; i++) {
        graph[i] = {
            id: lessonData[i]!.id,
            prevLesson: lessonData[i]!.prevLesson,
            nextLesson: lessonData[i]!.nextLesson,
            isPass: false
        }
    }
    while (true) {
        var nextVertex = findHaveNotIn()
        if (nextVertex === "No In") {
            break
        }
        result.push(nextVertex)
    }

    return result
}