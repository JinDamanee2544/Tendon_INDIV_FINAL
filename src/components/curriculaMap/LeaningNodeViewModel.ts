import { Course, Lesson } from "linkWithBackend/interfaces/TendonType";
import prepNodeAlgo from "linkWithBackend/lessonHandle/Graph_PrepNodeData";
import { getLessonInformation } from "linkWithBackend/lessonHandle/lessonData";
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

    // console.log("outputNode : ", outputNode);

    return outputNode;
}

export const backendConvert = (c: Course): LearningLessonNodeProps => {
    const lessonArray = c.lessons
    let data: Lesson[] = []
    let lonely: string[] = []
    let prepArray: LearningLessonNodeProps = {} as LearningLessonNodeProps

    const dataDict = {} as { [key: string]: Lesson }
    const isRender = {} as { [key: string]: boolean }
    let firstCal = false
    let childReady = false
    let initNode: string[] = []
    let prepNodePrepare = {} as LearningLessonNodeProps

    // const [dataDict, setDataDict] = useState<{ [key: string]: Lesson }>({})
    // const [isRender, setIsRender] = useState<{ [key: string]: boolean }>({})
    // const [firstCal, setFirstCal] = useState<boolean>(false)
    // const [childReady, setChildReady] = useState(false)
    // const [initNode, setInitNode] = useState<string[]>([])
    // const [prepNodePrepare, setPrepNodePrepare] = useState<LearningLessonNodeProps>({} as LearningLessonNodeProps)

    for (let i = 0; i < lessonArray?.length; i++) {
        let promise = new Promise<Lesson>((resolve, reject) => {
            const tmpValue = getLessonInformation(lessonArray[i]!)
            resolve(tmpValue)
        })
        promise.then(value => {
            // var tmp = dataDict
            dataDict[value.id] = value
            isRender[value.id] = true
            data.push(value)
            try {
                if (value.prevLesson.length === 0) {
                    lonely.push(value.id)
                }
            } catch (err) {
                // console.log("--> ", value)
            }

        }).then(value => {
            if (data.length === lessonArray.length && !firstCal) {
                initNode = lonely
                firstCal = true
                prepArray = prepNodeAlgo({ courseView: c, dataDict: dataDict, initLesson: lonely })
                prepNodePrepare = prepArray
            }
        })
    }
    return prepNodePrepare
}

//http://24.199.72.217:8080/api/v1/auth/courses/