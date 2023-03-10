import TYPES, { Lesson, Node } from "linkWithBackend/interfaces/TendonType"
import container from "linkWithBackend/services/inversify.config"
import LessonService from "linkWithBackend/services/lesson_service"
import MemoryService from "linkWithBackend/services/memory_service"
import NodeService from "linkWithBackend/services/node_service"
import { useEffect, useState } from "react"

const fetchAllNode = async(lesson:Lesson, courseID: string) => {
    const nodeIDs =  lesson.Nodes
    const nodeService = container.get<NodeService>(TYPES.NodeService)
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

export default function ViewModel(lesson_id:string) {
    const [nodes, setNodes] = useState<Node[]>([])
    const [lessonName, setLessonName] = useState<string>('Loading...')
    
    useEffect(() => {
        const fetchLesson = async () => {
            const lessonService = container.get<LessonService>(TYPES.LessonService)
            const memoryService = container.get<MemoryService>(TYPES.MemoryService)
            const courseID = memoryService.getLocalStorage('courseID')
            const lesson = await lessonService.getLessonById(courseID, lesson_id)
            const nodes = await fetchAllNode(lesson, courseID)
            setNodes(nodes)
            setLessonName(lesson.Title)
        }
        fetchLesson()
    }, [lesson_id])

    return {
        nodes,
        lessonName
    }
}