import { LearningLessonNodeProps, RenderLearningLessonNodeProps, StatusType } from "types"
import TYPES, { localStorageInterface } from "linkWithBackend/interfaces/TendonType"
import CourseService from "linkWithBackend/services/course_service"
import container from "linkWithBackend/services/inversify.config"
import MemoryService from "linkWithBackend/services/memory_service"
import { useEffect, useState } from "react"
import NewBackendConvert from "./BackendConverter"
import Router from "next/router"

const courseService = container.get<CourseService>(TYPES.CourseService)
const memService = container.get<MemoryService>(TYPES.MemoryService)

export const nodeStyle = (status: StatusType): string => {
    switch (status) {
        case StatusType.NOTSTARTED:
            return ''
        case StatusType.INPROGRESS:
            return 'bg-purple-light dark:border-2 dark:border-pale-yellow dark:shadow-pale-yellow'
        case StatusType.COMPLETED:
            return 'bg-purple-neon dark:border-2 dark:border-purple-light dark:shadow-purple-neon'
        default:
            throw new Error('Invalid status')
    }
}
export const nodeSymbol = (status: StatusType): string => {
    switch (status) {
        case StatusType.NOTSTARTED:
            return '•'
        case StatusType.INPROGRESS:
            return '•••'
        case StatusType.COMPLETED:
            return '✓'
        default:
            throw new Error('Invalid status')
    }
}

export const prepNode = (startNode: LearningLessonNodeProps, defaultSetChildReady: (value: boolean) => void): RenderLearningLessonNodeProps[] => {
    const outputNode: RenderLearningLessonNodeProps[] = [];
    const nodeHistory: string[] = [];

    // Recursive function to map the node
    const mapToRenderProps = (node: LearningLessonNodeProps): RenderLearningLessonNodeProps => {
        let isShouldRender;
        if (nodeHistory.includes(node.lessonId)) {
            isShouldRender = false;
        } else {
            isShouldRender = true;
            nodeHistory.push(node.lessonId);
        }
        const next: RenderLearningLessonNodeProps[] | undefined = node.next === undefined ? undefined : node.next.map(childNode => {
            return mapToRenderProps(childNode)
        })
        const mapNode: RenderLearningLessonNodeProps = {
            lessonId: node.lessonId,
            lessonName: node.lessonName,
            status: node.status,
            next: next,
            setChildReady: defaultSetChildReady,
            isRender: isShouldRender
        }
        return mapNode;
    }

    startNode.next?.map(initNode => {
        const node = mapToRenderProps(initNode);
        outputNode.push(node);
    })
    return outputNode;
}

export default function ViewModel(lid: string): RenderLearningLessonNodeProps[] {
    const [renderingGraph, setrenderingGraph] = useState<RenderLearningLessonNodeProps[]>([])

    const fetchCourse = async (lid:string) => {
        if (lid) {
            const result = await courseService.getCourseById(lid) 
            const course = result.course
            if (!course || result.status !== 200) {
                Router.reload()
                return 
            }
    
            let memStore = {} as localStorageInterface
            memService.setLocalStorage({...memStore, courseID: lid, courseName: course.Title})
    
            
            let Converter = new NewBackendConvert(course)
            await Converter.converter()
            const lessonGraph: LearningLessonNodeProps = Converter.getPrepArray
            const res = prepNode(lessonGraph, () => false)
            setrenderingGraph([...res])
        }
    }

    useEffect(() => {
        fetchCourse(lid)
    }, [lid])

    return renderingGraph
}

