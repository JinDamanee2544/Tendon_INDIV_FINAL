import Modal from "@components/baseComponents/Modal"
import ReactPlayer from "react-player"
import ModalOpener from "./ModalOpener"

type NodeVideoPlayerProps = {
    name: string
    data: string
    icon: React.ReactNode
}

const NodeVideoPlayer = ({ name, data, icon }: NodeVideoPlayerProps) => {
    return (
        <>
            <ModalOpener
                icon={icon}
                name={name}
                id={name}
            />
            <Modal id={name}>
                <ReactPlayer
                    url={data}
                />
            </Modal>
        </>
    )
}
export default NodeVideoPlayer