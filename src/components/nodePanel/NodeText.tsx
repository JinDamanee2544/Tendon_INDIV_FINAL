import ReactModal from "@components/baseComponents/Modal"
import Image from "next/image"
import { useState } from "react"
import NodeBaseView from "./NodeBaseView"
import { nodeStyle, finishProgress } from "./ViewModel"

const mockText = `default text file (in this case, it's not a pdf file)`
const mockFilename = 'Activity 1 # Quantum Entanglement'
const mockImage = '/raiden.jpg'

type NodeTextProps = {
    id: string
    name: string
    data: string
    icon: React.ReactNode
    progress?: number
}

const NodeText = ({ id, name, data, icon, progress }: NodeTextProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const style = nodeStyle(progress || 0)

    return (
        <>
            <button
                className={`node ${style}`}
                onClick={() => {
                    setIsModalOpen(true)
                    finishProgress(id)
                }}>
                <NodeBaseView
                    name={name}
                    icon={icon}
                    progress={progress}
                />
            </button>
            {
                isModalOpen ?
                    <ReactModal setIsOpen={setIsModalOpen}>
                        {/* {data} */}
                        <article>
                            <h1 className="p-2 text-center text-2xl font-bold">{mockFilename}</h1>
                            <Image
                                src={mockImage}
                                alt="Picture of the author"
                                width={500}
                                height={500}
                            />
                            <p>{mockText}</p>
                        </article>
                    </ReactModal> :
                    <></>
            }
        </>
    )
}

export default NodeText