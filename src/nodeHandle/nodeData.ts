import React from "react";
import { dictLesson } from "linkWithBackend/lessonHandle/lessonData";

export function nodeHandleData(lesson_id: string) {
    var nodeArray: string[] = dictLesson[lesson_id]?.nodes!

    for (var nodeid in nodeArray) {
        
    }
}