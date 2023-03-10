import { Lesson } from "linkWithBackend/interfaces/TendonType"


export function dataHandle(props: Lesson[]) {
    var dataDict: {[key: string]: Lesson} = {}

    for (let i =0; i < props.length; i++) {
        dataDict[props[i]!.ID] = {
            ... dataDict[props[i]!.ID]!,
            ID: props[i]!.ID,
            PrevLessons: props[i]!.PrevLessons,
            NextLessons: props[i]!.NextLessons
        }
    }

    return dataDict
}

export function dataPairHandle(props: Lesson[]) {
    var dataPair: string[][] = []
    var index: number = 0
    for (let i =0; i < props.length; i++) {
        var v1: string = props[i]!.ID
        for (let j = 0; j < props[i]!.NextLessons.length; j++) {
            var v2 = props[i]!.NextLessons[j]!
            dataPair[index] = [v1, v2]
            index += 1
        }
    }

    return dataPair
}

export function linkDataHandle() {
    
}