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
                className='flex gap-6 items-center p-4 bg-slate-200 dark:bg-gray-light rounded-2xl hover:scale-105 duration-200 active:translate-y-1'
                onClick={() => setIsModalOpen(true)}>
                <div className='bg-white dark:bg-slate-500 p-1.5 rounded-full scale-150'>
                    {icon}
                </div>
                <p className='text-lg'>{name}</p>
            </button>
            {
                isModalOpen ?
                    <ReactModal setIsOpen={setIsModalOpen}>
                        {/* {data} */}
                        <article>
                            <h1 className="text-2xl p-2 font-bold text-center">{name}</h1>
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