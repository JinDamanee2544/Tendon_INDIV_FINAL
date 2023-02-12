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
                            <h1 className="text-2xl p-2 font-bold text-center">{mockFilename}</h1>
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