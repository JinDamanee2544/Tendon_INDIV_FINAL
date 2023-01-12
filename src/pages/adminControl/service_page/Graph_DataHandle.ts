import { Lesson } from "linkWithBackend/interfaces/TendonType"


export function dataHandle(props: Lesson[]) {
    var dataDict: {[key: string]: Lesson} = {}

    for (let i =0; i < props.length; i++) {
        dataDict[props[i]!.id] = {
            ... dataDict[props[i]!.id]!,
            id: props[i]!.id,
            prevLesson: props[i]!.prevLesson,
            nextLesson: props[i]!.nextLesson
        }
    }

    return dataDict
}

export function dataPairHandle(props: Lesson[]) {
    var dataPair: string[][] = []
    var index: number = 0
    for (let i =0; i < props.length; i++) {
        var v1: string = props[i]!.id
        for (let j = 0; j < props[i]!.nextLesson.length; j++) {
            var v2 = props[i]!.nextLesson[j]!
            dataPair[index] = [v1, v2]
            index += 1
        }
    }

    return dataPair
}