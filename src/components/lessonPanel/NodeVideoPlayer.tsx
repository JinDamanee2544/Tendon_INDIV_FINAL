import LoadingSpinner from "@components/baseComponents/LoadingSpinner"
import Modal from "@components/baseComponents/Modal"
import { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import ModalOpener from "./ModalOpener"

type NodeVideoPlayerProps = {
    name: string
    data: string
    icon: React.ReactNode
}

const mockMPD = "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd"

const NodeVideoPlayer = ({ name, data, icon }: NodeVideoPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(true)

    useEffect(() => {

    }, [])

    return (
        <>
            <ModalOpener
                icon={icon}
                name={name}
                id={name}
            />
            <Modal id={name}>
                <h1 className="text-2xl p-2 font-bold text-center">{name}</h1>
                <ReactPlayer
                    url={mockMPD}
                    controls
                    playing={isPlaying}
                    fallback={<LoadingSpinner />}
                />
            </Modal>
        </>
    )
}
export default NodeVideoPlayer