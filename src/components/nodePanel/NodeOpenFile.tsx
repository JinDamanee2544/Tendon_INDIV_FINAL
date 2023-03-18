import NodeBaseView from "./NodeBaseView"
import { nodeStyle, updateProgress } from "./ViewModel"

type NodeOpenFileProps = {
    id: string
    name: string
    data: string
    icon: React.ReactNode
    progress?: number
}

const NodeOpenFile = ({ id, name, data, icon, progress }: NodeOpenFileProps) => {
    const style = nodeStyle(progress || 0)

    return (
        <a className={`node ${style}`}
            href={data} target='_blank' rel='noopener noreferrer'
            onClick={() => updateProgress(id)}
        >
            <NodeBaseView
                name={name}
                icon={icon}
                progress={progress}
            />
        </a>
    )
}

export default NodeOpenFile
