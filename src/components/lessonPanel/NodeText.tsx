import ReactModal from "@components/baseComponents/Modal"
import Image from "next/image"
import { useState } from "react"

const mockText = `default text file (in this case, it's not a pdf file)`
const mockFilename = 'Activity 1 # Quantum Entanglement'
const mockImage = '/raiden.jpg'

type NodeTextProps = {
    name: string
    data: string
    icon: React.ReactNode
}

const NodeText = ({ name, data, icon }: NodeTextProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)

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