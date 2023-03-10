import TYPES, { Lesson, Node } from "linkWithBackend/interfaces/TendonType"
import container from "linkWithBackend/services/inversify.config"
import LessonService from "linkWithBackend/services/lesson_service"
import MemoryService from "linkWithBackend/services/memory_service"
import NodeService from "linkWithBackend/services/node_service"
import { useEffect, useState } from "react"

const memService = container.get<MemoryService>(TYPES.MemoryService)

const fetchAllNode = async(lesson:Lesson) => {
    const nodeIDs =  lesson.Nodes
    const nodeService = container.get<NodeService>(TYPES.NodeService)
    const nodes = await Promise.all(nodeIDs.map(async (nodeID) => {
        const node = await nodeService.getNodeById(nodeID, memService.getLocalStorage('token'))
        return node
    }))
    return nodes
}

export default function ViewModel(lesson_id:string) {
    const [nodes, setNodes] = useState<Node[]>([])
    const [lessonName, setLessonName] = useState<string>('Loading...')
    
    useEffect(() => {
        const fetchLesson = async () => {
            const lessonService = container.get<LessonService>(TYPES.LessonService)
            const lesson = await lessonService.getLessonById(lesson_id, memService.getLocalStorage('token'))
            const nodes = await fetchAllNode(lesson)
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