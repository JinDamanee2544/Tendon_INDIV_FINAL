import TopologicalSort from "./Graph_TopoHandle";
import { dataHandle } from "./Graph_DataHandle";
import { Lesson } from "linkWithBackend/interfaces/TendonType";

export interface coordinateXY {
    levelX: number,
    levelY: number,
    direction: boolean,       // true = up, false = down
}

var maxLevelX = 0
var level: {[key: string]: coordinateXY} = {}

function calculateX(result: string[], dataDict: {[key: string]: Lesson}) {
    for (let i = 0; i < result.length; i++) {
        var thisVertex = result[i]
        for (let j = 0; j < dataDict[thisVertex!]!.nextLesson.length; j++) {
            var adjVertex = dataDict[thisVertex!]!.nextLesson[j]
            level[adjVertex!]!.levelX = level[thisVertex!]!.levelX + 1

            if (level[adjVertex!]!.levelX > maxLevelX) {
                maxLevelX = level[adjVertex!]!.levelX
            }
        }
        // console.log("==> ", thisVertex)
    }
}
// --------------------------------------------------------------------------------------------
function findPattern(num: number){
    var pos: number[] = []
    var ans = 0;
    if (num%2 !== 0) {
        pos.push(0)
    }
    while (pos.length !== num) {
        ans += 1
        pos.push(-ans)
        pos.push(ans)
    }
    return pos.reverse()
}

function testFindPosition() {
    // console.log("0: ", findPattern(0))
    // console.log("1: ", findPattern(1))
    // console.log("2: ", findPattern(2))
    // console.log("3: ", findPattern(3))
    // console.log("4: ", findPattern(4))
    // console.log("5: ", findPattern(5))
    // console.log("6: ", findPattern(6))
    // console.log("7: ", findPattern(7))
}

function calculateY(result: string[], dataDict: {[key: string]: Lesson}, lessonArray: Lesson[]) { 
    var table:string[][] = new Array(maxLevelX+1).fill("0").map(() => new Array(lessonArray.length).fill("-") );
    var lenData: number[] = new Array(maxLevelX+1).fill(0)
    for(var i: number = 0; i < result.length; i++) {                // เก็บข้อมูลว่า Column นี้มีใครบ้าง
        var positionX = level[result[i]!]!.levelX
        for (var j: number = 0; j < lessonArray.length; j++) {
            if (table[positionX]![j] === "-") {
                table[positionX]![j] = result[i]!
                lenData[positionX] += 1
                break
            }
        }
    }
    
    // table[1][0] = "G"
    // table[1][1] = "A"
    // console.log(table)

    for(var row: number = 0; row < maxLevelX+1; row++) {
        calculateCoordiateY(0, Number((lenData[row]!/2).toFixed(0)), table, lenData, row, dataDict)
        calculateCoordiateY(Number((lenData[row]!/2).toFixed(0)), lenData[row]!+1, table, lenData, row, dataDict)
    }
    // test
    testFindPosition()
}

const checkDuplicate = new Map<string, string[]>();       // "พิกัด XY ของ this node" map with ["parent's id", "id of this node"]
function calculateCoordiateY(start: number, end: number, table: string[][], lenData: number[], row: number, dataDict: {[key: string]: Lesson}) {
    for (var column: number = start; column < end; column++) {
        if (table[row]![column] !== "-") {
            var parent = table[row]![column]
            var pattern = findPattern(dataDict[parent!]!.nextLesson.length)
            // checkDuplicate.set(level[parent].levelX.toString() + level[parent].levelY.toString(), parent) 

            var collectionHandleDuplicate: string[] = ["", "", "", "", ""]    
            // [ลูกตัวแรกสุดของกลุ่ม, ลูกตัวสุดท้ายของกลุ่ม, คนมาก่อน (ตัว original ที่โดนทับ), แม่ของตัว original นี้, แม่ของตัวที่มาทับ]
            for (var index: number = 0; index < pattern.length; index++) {           //  จัดการตำแหน่งลูกๆ
                var childrenid: string = dataDict[parent!]!.nextLesson[index]!
                var codeMap = checkDuplicate.get(level[childrenid]!.levelX.toString() + (level[parent!]!.levelY + pattern[index!]!).toString())

                collectionHandleDuplicate[0] = dataDict[parent!]!.nextLesson[0]!                   // ลูกตัวแรกสุดของกลุ่ม
                collectionHandleDuplicate[1] = dataDict[parent!]!.nextLesson[pattern.length - 1]!  // ลูกตัวสุดท้ายของกลุ่ม

                if (codeMap !== undefined && codeMap[1] !== childrenid) {     // duplicate 
                    collectionHandleDuplicate[2] = codeMap[1]!                                   // คนมาก่อน
                    collectionHandleDuplicate[3] = codeMap[0]!                                   // แม่ของคนมาก่อน
                    collectionHandleDuplicate[4] = parent!                                       // แม่ของกลุ่มนี้
                    level[childrenid]!.levelY = level[parent!]!.levelY + pattern[index]!
                    // console.log("Duplicated Zone!  คนมาทีหลัง: ", childrenid, "  คนมาก่อน: ", codeMap[1], " แม่ของคนที่มาก่อน: ", codeMap[0])
                } else {
                    level[childrenid]!.levelY = level[parent!]!.levelY + pattern[index]!
                    checkDuplicate.set(level[childrenid]!.levelX.toString() + (level[parent!]!.levelY + pattern[index!]!).toString(), [parent!, childrenid])
                }
            }
            handleDuplicate(collectionHandleDuplicate, pattern, dataDict)
        }
    }
}

function handleDuplicate(collectionHandleDuplicate: string[], pattern: number[], dataDict: {[key: string]: Lesson}) {
    if (collectionHandleDuplicate[2]!.length === 0) {        // แสดงว่าไม่มีคนทับ
        return
    } 
    // console.log(collectionHandleDuplicate)
    var positionFirstOfGroup: number = level[collectionHandleDuplicate[0]!]!.levelY
    var positionLastOfGroup: number = level[collectionHandleDuplicate[1]!]!.levelY
    var positionBefore: number = level[collectionHandleDuplicate[2]!]!.levelY
    var positionParentBefore: number = level[collectionHandleDuplicate[3]!]!.levelY
    var positionParentAfter: number = level[collectionHandleDuplicate[4]!]!.levelY
    // console.log(level[collectionHandleDuplicate[0]].levelY, level[collectionHandleDuplicate[1]].levelY, 
    //     level[collectionHandleDuplicate[2]].levelY, level[collectionHandleDuplicate[3]].levelY, level[collectionHandleDuplicate[4]].levelY)
    var parent = collectionHandleDuplicate[4]
    if (positionParentBefore > positionParentAfter) {
        var diff = Math.abs(positionFirstOfGroup - positionBefore) + 1          // ระยะที่ที่ตัวแม่ของ After ต้องเลื่อน
        level[collectionHandleDuplicate[4]!]!.levelY -= diff

        
        for (var index: number = 0; index < pattern.length; index++) {           //  จัดการตำแหน่งลูกๆ ใหม่!!!!
            var childrenid: string = dataDict[parent!]!.nextLesson[index]!
            level[childrenid]!.levelY = level[parent!]!.levelY + pattern[index]!
            checkDuplicate.set(level[childrenid!]!.levelX.toString() + (level[parent!]!.levelY + pattern[index!]!).toString(), [parent!, childrenid])
        }
        // console.log("เลื่อนลง!")
    } else {
        var diff2 = Math.abs(positionLastOfGroup - positionBefore) + 1
        level[collectionHandleDuplicate[4]!]!.levelY += diff2

        for (var index1: number = 0; index1 < pattern.length; index1++) {           //  จัดการตำแหน่งลูกๆ ใหม่!!!!
            var childrenid1: string = dataDict[parent!]!.nextLesson[index1]!
            level[childrenid1]!.levelY = level[parent!]!.levelY + pattern[index1]!
            checkDuplicate.set(level[childrenid1]!.levelX.toString() + (level[parent!]!.levelY + pattern[index1!]!).toString(), [parent!, childrenid1])
        }
        // console.log("เลื่อนขึ้น!")
    }
}

export function generateLevel(props: Lesson[]) {
    for (let i = 0; i < props.length; i++) {
        level[props[i]!.id] = {
            levelX: 0,
            levelY: 0,
            direction: false
        }
    }
    var result: string[] = TopologicalSort(props)
    var dataDict = dataHandle(props)
    calculateX(result, dataDict)
    calculateY(result, dataDict, props)
    return level
}