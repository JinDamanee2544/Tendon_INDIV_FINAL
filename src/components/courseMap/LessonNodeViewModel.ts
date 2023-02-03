import { LearningLessonNodeProps, RenderLearningLessonNodeProps, StatusType } from "../../customTypes";


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