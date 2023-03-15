import { ProgressServiceInterface } from "linkWithBackend/interfaces/ServiceInterface"
import TYPES, { Lesson, Node } from "linkWithBackend/interfaces/TendonType"
import container from "linkWithBackend/services/inversify.config"
import LessonService from "linkWithBackend/services/lesson_service"
import MemoryService from "linkWithBackend/services/memory_service"
import NodeService from "linkWithBackend/services/node_service"
import { useEffect, useState } from "react"
import { NodeWithProgress } from "types"

const nodeService = container.get<NodeService>(TYPES.NodeService)
const progressService = container.get<ProgressServiceInterface>(TYPES.ProgressService)

export const nodeStyle = (progress:number):string => {
    if (progress === 100) {
        return 'border-2 border-purple-light dark:shadow-purple-neon'
    } else {
        return ''
    }
}

export const updateProgress = (newProgress:number) => {
    progressService.setProgress(newProgress)
    console.log('update progress to ', newProgress)
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

const fetchAndAddProgressToAllNode = async (nodes:Node[]) => {

    const progress = await Promise.all(nodes.map(async (node) => {
        try{
            const resp = await progressService.getNodesProgress(node.ID,"" ,"") // need explanation
            return resp.progress
        } catch (e) {
            console.log('add progress failed ',e)
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

export default function ViewModel(lesson_id:string) {
    // const [nodes, setNodes] = useState<Node[]>([])
    const [nodesWithProgress, setNodesWithProgress] = useState<NodeWithProgress[]>([])
    const [lessonProgress, setLessonProgress] = useState<number>(0)
    const [lessonName, setLessonName] = useState<string>('Loading...')
    
    useEffect(() => {
        const fetchLesson = async () => {
            const lessonService = container.get<LessonService>(TYPES.LessonService)
            const memoryService = container.get<MemoryService>(TYPES.MemoryService)
            const courseID = memoryService.getLocalStorage('courseID')
            const lesson = await lessonService.getLessonById(courseID, lesson_id)
            const nodes = await fetchAllNode(lesson, courseID)

            const nodeWithProgress = await fetchAndAddProgressToAllNode(nodes);
            setNodesWithProgress(nodeWithProgress)
            // setNodes(nodes)
            setLessonName(lesson.Title)

            // const progress = await progressService.getLessonsProgress(lesson_id,"") // can't do any shit
            setLessonProgress(70) // mock
        }
        fetchLesson()
    }, [lesson_id])

    return {
        nodesWithProgress,
        lessonName,
        lessonProgress
    }
}
