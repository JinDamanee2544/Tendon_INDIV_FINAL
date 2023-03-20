import { Node } from 'linkWithBackend/interfaces/TendonType';
import { AiFillFile, AiFillFilePdf, AiFillSound } from 'react-icons/ai';
import { FaVideo, FaImage } from 'react-icons/fa'
import { ImParagraphJustify } from 'react-icons/im'
import NodeOpenFile from './NodeOpenFile';
import NodeText from './NodeText';
import NodeVideoPlayer from './NodeVideoPlayer';

export enum NodeType {
    pdfNode = 'pdf',
    videoNode = 'video',
    textNode = 'text',
    soundNode = 'mp3',
    imageNode = 'image'
}

export const getIcon = (type: string) => {
    switch (type) {
        case 'pdf':
            return <AiFillFilePdf />        // OK
        case 'video':
            return <FaVideo />
        case 'text':
            return <ImParagraphJustify />   // OK
        case 'mp3':
            return <AiFillSound />
        case 'image':
            return <FaImage />              // OK

        // For testing
        case 'PDF':
            return <AiFillFilePdf />

        default:
            // console.log('No icon found for type: ' + type)
            console.log('No icon found for type: ' + type)
            return <AiFillFile />
        // throw new Error('No match type')
    }
}

interface NodeExtended extends Omit<Node, 'id'> {
    name: string
    progress?: number
}

const NodeMUX = (props: NodeExtended) => {
    const icon = getIcon(props.FileType)

    const eachNodeProps = {
        id: props.ID,
        data: props.Data,
        name: props.name,
        icon,
        progress: props.progress,
    }

    switch (props.FileType) {
        case NodeType.textNode:
            return <NodeText {...eachNodeProps} />
        case NodeType.imageNode:
            return <NodeText {...eachNodeProps} />
        case NodeType.pdfNode:
            return <NodeOpenFile {...eachNodeProps} />
        case NodeType.soundNode:
            return <NodeOpenFile {...eachNodeProps} />
        case NodeType.videoNode:
            return <NodeVideoPlayer {...eachNodeProps} />
        default:
            return <></>
    }
}
export default NodeMUX


