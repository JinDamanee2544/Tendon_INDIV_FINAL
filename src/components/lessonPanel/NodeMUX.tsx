import { Node } from 'linkWithBackend/interfaces/TendonType';
import { AiFillFile, AiFillFilePdf, AiFillSound } from 'react-icons/ai';
import { FaVideo, FaImage } from 'react-icons/fa'
import { ImParagraphJustify } from 'react-icons/im'
import NodeOpenFile from './NodeOpenFile';
import NodeText from './NodeText';
import NodeVideoPlayer from './NodeVideoPlayer';

export enum NodeType {
    pdfNode = 'pdfNode',
    videoNode = 'videoNode',
    textNode = 'textNode',
    soundNode = 'soundNode',
    imageNode = 'imageNode'
}

export const getIcon = (type: string) => {
    switch (type) {
        case 'pdfNode':
            return <AiFillFilePdf />        // OK
        case 'videoNode':
            return <FaVideo />
        case 'textNode':
            return <ImParagraphJustify />   // OK
        case 'soundNode':
            return <AiFillSound />
        case 'imageNode':
            return <FaImage />              // OK

        // For testing
        case 'PDF':
            return <AiFillFilePdf />

        default:
            // console.log('No icon found for type: ' + type)
            return <AiFillFile />
        // throw new Error('No match type')
    }
}


interface NodeExtended extends Omit<Node, 'id'> {
    name: string
}

const NodeMUX = ({ name, type, data }: NodeExtended) => {
    const icon = getIcon(type)
    switch (type) {
        case NodeType.textNode:
            return <NodeText name={name} data={data} icon={icon} />
        case NodeType.imageNode:
            return <NodeText name={name} data={data} icon={icon} />
        case NodeType.pdfNode:
            return <NodeOpenFile name={name} data={data} icon={icon} />
        case NodeType.soundNode:
            return <NodeOpenFile name={name} data={data} icon={icon} />
        case NodeType.videoNode:
            return <NodeVideoPlayer name={name} data={data} icon={icon} />
        default:
            return <></>
    }
}
export default NodeMUX


