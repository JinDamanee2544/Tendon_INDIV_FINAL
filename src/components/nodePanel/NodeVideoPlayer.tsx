import LoadingSpinner from "@components/baseComponents/LoadingSpinner"
import ReactModal from "@components/baseComponents/Modal"
import { useRef, useState } from "react"
import ReactPlayer from "react-player"
import NodeBaseView from "./NodeBaseView"
import { nodeStyle, finishProgress } from "./ViewModel"

type NodeVideoPlayerProps = {
    id: string
    name: string
    data: string
    icon: React.ReactNode
    progress?: number
}

const mockMPD = "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd"

const NodeVideoPlayer = ({ id, name, data, icon, progress }: NodeVideoPlayerProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    // const [videoProgress, setVideoProgress] = useState<number>(progress || 0)
    const style = nodeStyle(progress || 0)

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
                        id={id}
                        name={name}
                        data={data}
                        // videoProgress={videoProgress}
                        setIsModalOpen={setIsModalOpen}
                    // setVideoProgress={setVideoProgress}
                    /> :
                    <></>
            }
        </>
    )
}
export default NodeVideoPlayer

interface IPlayerModalProps {
    id: string
    name: string
    data: string
    // videoProgress: number
    setIsModalOpen: (isOpen: boolean) => void
    // setVideoProgress: (progress: number) => void
}

const PlayerModal = (props: IPlayerModalProps) => {
    const { setIsModalOpen, name, data } = props
    const playerRef = useRef<ReactPlayer>(null)

    // No progress in percentage only finished or not

    // useEffect(() => {
    //     return () => {
    //         finishProgress(props.id)
    //     }
    // }, [props.id])

    // const loadPreviousVideoProgress = () => {
    //     if (playerRef.current) {
    //         playerRef.current.seekTo(parseFloat((videoProgress / 100).toFixed(2)))
    //     }
    // }

    return (
        <ReactModal setIsOpen={setIsModalOpen}>
            <article>
                <h1 className="p-2 text-center text-2xl font-bold">{name}</h1>
                <ReactPlayer
                    ref={playerRef}
                    url={data}            // earth: Little error ?
                    volume={0.5}
                    controls
                    stopOnUnmount
                    fallback={<LoadingSpinner />}
                    onEnded={() => finishProgress(props.id)}
                // progressInterval={10 * 1000}
                // onProgress={({ played }) => {
                //     setVideoProgress(played * 100)
                // }}
                // onReady={loadPreviousVideoProgress}
                />
            </article>
        </ReactModal>
    )
}