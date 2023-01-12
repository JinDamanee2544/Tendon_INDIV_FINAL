import { LearningLessonNodeProps, RenderLearningLessonNodeProps, StatusType } from "../../customTypes";
/*
    View Model
*/

export const nodeStatusColor = (status: StatusType): string => {
    switch (status) {
        case StatusType.NOTSTARTED:
            return ''
        case StatusType.INPROGRESS:
            return 'bg-purple-light dark:border-2 dark:border-pale-yellow dark:shadow-pale-yellow'
        case StatusType.COMPLETED:
            return 'bg-purple-neon dark:border-2 dark:border-purple-light dark:shadow-purple-neon'
        default:
            return "ERROR"
    }
}

export const prepNode = (
    startNode: LearningLessonNodeProps,
    defaultSetChildReady: (value: boolean) => void): RenderLearningLessonNodeProps[] => {

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

    // console.log("outputNode : ", outputNode);

    return outputNode;
}