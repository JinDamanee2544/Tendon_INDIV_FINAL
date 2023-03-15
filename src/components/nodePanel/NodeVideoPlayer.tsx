import LoadingSpinner from "@components/baseComponents/LoadingSpinner"
import ReactModal from "@components/baseComponents/Modal"
import { useEffect, useRef, useState } from "react"
import ReactPlayer from "react-player"
import NodeBaseView from "./NodeBaseView"
import { nodeStyle, updateProgress } from "./ViewModel"

type NodeVideoPlayerProps = {
    name: string
    data: string
    icon: React.ReactNode
    progress?: number
}

const mockMPD = "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd"

const NodeVideoPlayer = ({ name, data, icon, progress }: NodeVideoPlayerProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [videoProgress, setVideoProgress] = useState<number>(progress || 0)
    const style = nodeStyle(progress || 0)

    // useEffect(() => {
    //     if (!isModalOpen) {
    //         updateProgress(videoProgress)
    //     }
    // }, [isModalOpen, videoProgress])

    // useEffect(() => {
    //     playerRef.current.seekTo(progress / 100)
    // })

    return (
        <>
            <button
                className={`node ${style}`}
                onClick={() => setIsModalOpen(true)}>
                <NodeBaseView
                    name={name}
                    icon={icon}
                    progress={progress}
                />
            </button>
            {
                isModalOpen ?
                    <PlayerModal
                        name={name}
                        data={data}
                        videoProgress={videoProgress}
                        setIsModalOpen={setIsModalOpen}
                        setVideoProgress={setVideoProgress}
                    /> :
                    <></>
            }
        </>
    )
}
export default NodeVideoPlayer

interface IPlayerModalProps {
    name: string
    data: string
    videoProgress: number
    setIsModalOpen: (isOpen: boolean) => void
    setVideoProgress: (progress: number) => void
}


const PlayerModal = (props: IPlayerModalProps) => {
    const { setIsModalOpen, name, data, setVideoProgress, videoProgress } = props
    const playerRef = useRef<ReactPlayer>(null)

    useEffect(() => {
        return () => {
            updateProgress(videoProgress)
        }
    }, [videoProgress])

    const loadPreviousVideoProgress = () => {
        if (playerRef.current) {
            playerRef.current.seekTo(parseFloat((videoProgress / 100).toFixed(2)))
        }
    }

    return (
        <ReactModal setIsOpen={setIsModalOpen}>
            {/* {data} */}
            <article>
                <h1 className="p-2 text-center text-2xl font-bold">{name}</h1>
                <ReactPlayer
                    ref={playerRef}
                    url={mockMPD}
                    volume={0.5}
                    controls
                    stopOnUnmount
                    fallback={<LoadingSpinner />}
                    onEnded={() => updateProgress(100)}
                    progressInterval={10 * 1000}
                    onProgress={({ played }) => {
                        setVideoProgress(played * 100)
                    }}
                    onReady={loadPreviousVideoProgress}
                />
            </article>
        </ReactModal>
    )
}