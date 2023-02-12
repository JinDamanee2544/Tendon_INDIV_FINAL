import LoadingSpinner from "@components/baseComponents/LoadingSpinner"
import ReactModal from "@components/baseComponents/Modal"
import { useState } from "react"
import ReactPlayer from "react-player"

type NodeVideoPlayerProps = {
    name: string
    data: string
    icon: React.ReactNode
}

const mockMPD = "https://dash.akamaized.net/envivio/EnvivioDash3/manifest.mpd"

const NodeVideoPlayer = ({ name, data, icon }: NodeVideoPlayerProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    return (
        <>
            <button
                className='flex items-center gap-6 rounded-2xl bg-slate-200 p-4 duration-200 hover:scale-105 active:translate-y-1 dark:bg-gray-light'
                onClick={() => setIsModalOpen(true)}>
                <div className='scale-150 rounded-full bg-white p-1.5 dark:bg-slate-500'>
                    {icon}
                </div>
                <p className='text-lg'>{name}</p>
            </button>
            {
                isModalOpen ?
                    <ReactModal setIsOpen={setIsModalOpen}>
                        {/* {data} */}
                        <article>
                            <h1 className="p-2 text-center text-2xl font-bold">{name}</h1>
                            <ReactPlayer
                                url={mockMPD}
                                controls
                                playing={isPlaying}
                                fallback={<LoadingSpinner />}
                            />
                        </article>
                    </ReactModal> :
                    <></>
            }
        </>
    )
}
export default NodeVideoPlayer