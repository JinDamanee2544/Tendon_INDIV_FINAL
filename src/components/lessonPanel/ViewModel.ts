import TYPES, { Lesson, Node } from "linkWithBackend/interfaces/TendonType"
import container from "linkWithBackend/services/inversify.config"
import LessonService from "linkWithBackend/services/lesson_services"
import MemoryService from "linkWithBackend/services/memory_services"
import NodeService from "linkWithBackend/services/node_services"
import { useEffect, useState } from "react"

const memService = container.get<MemoryService>(TYPES.MemoryService)

const fetchAllNode = async(lesson:Lesson) => {
    const nodeIDs =  lesson.nodes
    const nodeService = container.get<NodeService>(TYPES.NodeService)
    const nodes = await Promise.all(nodeIDs.map(async (nodeID) => {
        const node = await nodeService.getNodeById(nodeID, memService.getToken())
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
            const lesson = await lessonService.getLessonById(lesson_id, memService.getToken())
            const nodes = await fetchAllNode(lesson)
            setNodes(nodes)
            setLessonName(lesson.name)
        }
        fetchLesson()
    }, [lesson_id])

    return {
        nodes,
        lessonName
    }
}