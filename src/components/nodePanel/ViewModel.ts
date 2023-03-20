import { ProgressServiceInterface } from "linkWithBackend/interfaces/ServiceInterface"
import TYPES, { Lesson, MemType, Node } from "linkWithBackend/interfaces/TendonType"
import container from "linkWithBackend/services/inversify.config"
import LessonService from "linkWithBackend/services/lesson_service"
import MemoryService from "linkWithBackend/services/memory_service"
import NodeService from "linkWithBackend/services/node_service"
import Router, { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { NodeWithProgress } from "types"

const nodeService = container.get<NodeService>(TYPES.NodeService)
const progressService = container.get<ProgressServiceInterface>(TYPES.ProgressService)
const lessonService = container.get<LessonService>(TYPES.LessonService)
const memoryService = container.get<MemoryService>(TYPES.MemoryService)

var lessonID = ""
var courseID = ""

export const nodeStyle = (progress:number):string => {
    if (progress === 100) {
        return 'border-2 border-purple-light dark:shadow-purple-neon'
    } else {
        return ''
    }
}

export const finishProgress = (nodeID: string) => {
    progressService.postProgress(nodeID, lessonID, courseID)
}

const fetchAllNode = async(lesson:Lesson, courseID: string) => {
    const nodeIDs =  lesson.Nodes

    let nodes: Node[] = []
    const nodePromise = new Promise<Node[]>(async (resolve, reject) => {
        const tmp =async () => {
            nodes = await nodeService.getManyNodeByID(courseID, lesson.ID, nodeIDs.toString())
            resolve(nodes)
        }
        tmp()
    })
    await nodePromise
    return nodes
}

const fetchAndAddProgressToAllNode = async (nodes:Node[], course_id:string, lesson_id:string) => {

    const progress = await Promise.all(nodes.map(async (node) => {
        try{
            const resp = await progressService.getNodesProgress(node.ID,lesson_id ,course_id)
            return resp.progress
        } catch (e) {
            return 0
        }
    }))

    const nodesWithProgress = nodes.map((node, index) => {
        return {
            ...node,
            progress: progress[index]
        }
    })

    return nodesWithProgress as NodeWithProgress[]
}

interface IViewModel {
    lesson_id: string,
    course_id: string
}

export default function ViewModel({lesson_id, course_id}:IViewModel) {
    const [nodesWithProgress, setNodesWithProgress] = useState<NodeWithProgress[]>([])
    const [lessonProgress, setLessonProgress] = useState<number>(0)
    const [lessonName, setLessonName] = useState<string>('Loading...')
    
    useEffect(() => {
        lessonID = lesson_id
        courseID = course_id
        const fetchLesson = async () => {
            const courseID = memoryService.getLocalStorage(MemType.courseID)
            if (!courseID) {
                console.log('courseID is empty')
                Router.reload()
                return
            }

            const lesson = await lessonService.getLessonById(courseID, lesson_id)
            // return in blank of lesson
            if (Object.keys(lesson).length===0) {
                console.log('lesson is empty')
                Router.reload()
                return
            }

            const nodes = await fetchAllNode(lesson, courseID)
            if (!nodes) {
                Router.reload()
                return
            }

            const nodeWithProgress = await fetchAndAddProgressToAllNode(nodes, course_id, lesson_id);       
            setNodesWithProgress(nodeWithProgress)
            setLessonName(lesson.Title)

            const resp = await progressService.getLessonsProgress(lesson_id, courseID)
            setLessonProgress(resp.progress)
        }
        fetchLesson()
    }, [lesson_id,course_id])

    return {
        nodesWithProgress,
        lessonName,
        lessonProgress
    }
}
